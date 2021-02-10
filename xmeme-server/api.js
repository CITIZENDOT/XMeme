const router = require("express").Router();
const Meme = require("./models.js");

router.get("/", (req, res) =>
  res.json({
    message: "Hello! I am test route.",
  })
);

router.post("/memes", async (req, res) => {
  const { name, url, caption } = req.body;
  try {
    const createdDoc = await Meme.create({
      name: name,
      url: url,
      caption: caption,
    });
    return res.json({
      id: createdDoc.id,
    });
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
});

router.get("/memes", async (req, res) => {
  const memes = await Meme.find().select("-__v").sort({ _id: -1 }).limit(100);

  return res.json(memes);
});

router.get("/memes/:id", async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id).select("-__v");
    return res.json(meme);
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
});

router.patch("/memes/:id", async (req, res) => {
  console.log("Received", req.params.id);
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
        message: "Meme Not Found",
      });
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
});

module.exports = router;
