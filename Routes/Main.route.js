const { Router } = require("express");
const { post, comment } = require("../Models/Schema");
const { v4: uuidv4 } = require("uuid");
var ObjectId = require("mongodb").ObjectId;
const MainRouter = Router();

// Post Request
MainRouter.post("/posts", async (req, res) => {
  const data = req.body;
  data.userId = uuidv4();
  const posts = await post(data);
  posts.save((err, posts) => {
    if (err) {
      return res.status(501).json({ msg: "Server Error" });
    } else {
      return res.status(200).send(posts);
    }
  });
});

//  Comment Request
MainRouter.post("/comments/:id", async (req, res) => {
  const { id: postId } = req.params;
  const { name, email, body } = req.body;
  const comments = await comment({
    postId,
    name,
    email,
    body,
  });
  comments.save((err, comments) => {
    if (err) {
      return res.status(501).json({ msg: "Server Error" });
    } else {
      return res.status(200).send(comments);
    }
  });
});

// Get Posts
MainRouter.get("/posts", async (req, res) => {
  const posts = await post.aggregate([
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "postId",
        as: "comments",
      },
    },
  ]);
  res.json(posts);
});

module.exports = MainRouter;
