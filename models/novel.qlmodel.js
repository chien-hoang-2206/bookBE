const mongoose = require("mongoose");
const { Schema } = mongoose;

const qlNovelSchema = new Schema({
  title: String,
  intro: String,
  genre: String,
  author: String,
  publicationYear: String,
});

module.exports = mongoose.model("QLNovel", qlNovelSchema);
