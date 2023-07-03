const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");

//Create post
router.post("/", postController.createPost);

//Update post
router.put("/:id", postController.editPost);

//Delete post
router.delete("/:id", postController.detelePost);

//Like or Dislike post
router.put("/:id/like", postController.likePost);

//Get a post
router.get("/:id", postController.getPost);

//Get timeline post
router.get('/timeline/all', postController.TimeLine)

module.exports = router;
