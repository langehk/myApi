const mongoose = require("mongoose");

// Modellere Schema, hvordan vores data skal se ud.
const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

/*
var Post = mongoose.model("mhkdev", PostSchema, "mhk");

Post.create({
  title: "lars",
  description: "lars' description",
});
*/

// Opretter en model, ved navn posts, og giver den et "schema" som den skal bruge.
module.exports = mongoose.model("posts", PostSchema);

