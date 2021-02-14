const mongoose = require("mongoose");

const memeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  url: {
    type: String,
    required: [true, "Meme URL cannot be empty"],
  },
  caption: {
    type: String,
  },
  postedAt: {
    type: Date,
    default: Date.now(),
  },
});

// Duplicate the ID field.
memeSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
memeSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
    delete converted.__v;
  },
});

const Meme = mongoose.model("Meme", memeSchema);

module.exports = Meme;
