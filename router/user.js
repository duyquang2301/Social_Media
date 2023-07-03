const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

//Update
router.put("/:id", userController.updateUser);

//Delete
router.delete("/:id", userController.deleteUser);

//Get a user
router.get("/:id", userController.getUser);
//Follow a user

router.put("/:id/follow", userController.followUser);   

//Unfollow a user
router.put("/:id/unfollow", userController.unFollowUser);   

module.exports = router;
