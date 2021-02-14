const router = require("express").Router();
const Meme = require("./models.js");

router.get("/", (req, res) => {
  /* To know whether sever is alive :) */
  return res.json({
    message: "Hello! I am test route.",
  });
});

router.post("/memes", async (req, res) => {
  /*
    Creates a new post in Database.
    * name and url are mandatory arguments.
    * caption is optional.
  */
  const { name, url, caption } = req.body;
  if (!name || !url) {
    return res.status(400).json({
      message: "Name and URL are required",
    });
  }
  try {
    const createdDoc = await Meme.create({
      name: name,
      url: url,
      caption: caption,
      postedAt: Date.now(),
    });
    return res.status(200).json({
      id: createdDoc.id,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
});

router.get("/memes", async (req, res) => {
  // Returns latest 100 memes.
  const memes = await Meme.find().sort({ _id: -1 }).limit(100);
  return res.json(memes);
});

router.get("/memes/:id", async (req, res) => {
  /*
    Returns details of a single meme, given it's id.
    * Throws an error, when meme is not found.
  */
  try {
    const meme = await Meme.findById(req.params.id).select("-__v");
    return res.status(200).json(meme);
  } catch (err) {
    return res.status(404).json({
      message: "Requested Meme doesn't exist.",
    });
  }
});

router.patch("/memes/:id", async (req, res) => {
  /*
    Edits existing meme by accepting it's id and url and caption
    * Name cannot be changed
    * Throws an error, when meme is not found.
  */
  const { url, caption } = req.body;
  try {
    const updatedDoc = await Meme.findByIdAndUpdate(
      req.params.id,
      {
        url: url,
        caption: caption,
      },
      { new: true }
    );
    if (updatedDoc) {
      return res.json({
        message: "Success",
        updatedDoc,
      });
    } else {
      return res.status(404).json({
        message: "Requested Meme doesn't exist.",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
