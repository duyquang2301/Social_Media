const Post = require("../models/Post");
const User = require("../models/User");

class postController {
  async createPost(req, res) {
    const id = req.body.userId;
    const newPost = new Post({
      ...req.body,
      userId: id,
    });
    try {
      const post = await newPost.save();
      res.status(200).send({
        data: post,
        success: true,
      });
    } catch (error) {
      res.status(500).json(err);
    }
  }

  async editPost(req, res) {
    const id = req.body.userId;

    try {
      const post = await Post.findById(req.params.id);
      if (id == post.userId) {
        await post.updateOne({ $set: req.body });
        res.status(200).json("the post has been updated");
      } else {
        res.status(403).json("You not host");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async detelePost(req, res) {
    const id = req.body.userId;
    try {
      const post = await Post.findById(req.params.id);
      if (id == post.userId) {
        await post.deleteOne();
        res.status(200).json("the post has been deleted");
      } else {
        res.status(403).json("You not host");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async likePost(req, res) {
    const id = req.body.userId;
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(id)) {
        await post.updateOne({ $push: { likes: id } });
        res.status(200).json("The post has been liked");
      } else {
        await post.updateOne({ $pull: { likes: id } });
        res.status(200).json("The post has been unliked");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getPost(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  async TimeLine(req, res) {
    const id = req.body.userId;
    try {
      const userCurrnet = await User.findById(id);
      const followingPost = await Promise.all(
        userCurrnet.followings.map(async (userId) => {
          return {
            UserId: userId,
            post: await Post.find({ userId }),
          };
        })
      );
      console.log(followingPost);
      res.status(200).json(followingPost);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new postController();
