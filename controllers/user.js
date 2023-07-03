const User = require("../models/User");
const bcrypt = require("bcrypt");

class userController {
  async updateUser(req, res) {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          return res.status(500).json(err);
        }
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Account has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("you can edit only your account!");
    }
  }

  async deleteUser(req, res) {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("you can delete only your account!");
    }
  }

  async getUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async followUser(req, res) {
    if (req.body.userId !== req.params.id) {
      try {
        const userFollow = await User.findById(req.params.id);
        const userCurrent = await User.findById(req.body.userId);
        if (!userCurrent.followings.includes(req.params.id)) {
          userCurrent.followings.push(req.params.id);
          userCurrent.save();
          userFollow.followers.push(req.body.id);
          userFollow.save();
          res.status(200).json("You has followed");
        } else {
            res.status(403).json("you allready follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant follow yourself");
    }
  }
  async unFollowUser(req, res) {
    if (req.body.userId !== req.params.id) {
      try {
        const userFollow = await User.findById(req.params.id);
        const userCurrent = await User.findById(req.body.userId);
        if (userCurrent.followings.includes(req.params.id)) {
          userCurrent.followings.pull(req.params.id);
          userCurrent.save();
          userFollow.followers.pull(req.body.id);
          userFollow.save();
          res.status(200).json("You has unfollowed");
        } else {
            res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
  }
}

module.exports = new userController();
