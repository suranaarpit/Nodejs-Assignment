const { Schema, model } = require("mongoose");
const validator = require("validator");

// Schema for Posts
const postSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
});

// Schema for Comments
const commentSchema = new Schema({
  postId: Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: [true, "Email is already present in Database"],
    validator(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  body: { type: String, required: true },
});

const post = model("post", postSchema);
const comment = model("comment", commentSchema);

module.exports = { post, comment };
