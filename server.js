const express = require("express");
const db = require("./config/db");
const app = express();
const multer = require("multer");
const GridFSBucket = require("multer-gridfs-storage");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const { createConnection } = require("mongoose");
const config = require("config");
const url = config.get("mongoURI");

const conn = createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

const crypto = require("crypto");
const path = require("path");

const storage = new GridFSBucket({
  url: url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

db();
app.use(express.json({ extended: false }));
const PORT = 5000 || process.env.PORT;

app.post("/image", upload.single("image"), async (req, res) => {
  console.log("yes");
  if (
    req.file.contentType === "image/jpeg" ||
    req.file.contentType === "image/png" ||
    req.file.contentType === "image/jpg"
  ) {
    return res.json({ id: req.file.id });
  } else {
    return res.json({ msg: "Invalid image" });
  }
});

app.get("/image/:id", async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  gfs.files.findOne({ _id: id }, (err, file) => {
    if (!file) {
      return res.json({ msg: "Invalid image" });
    } else {
      if (
        file.contentType === "image/jpeg" ||
        file.contentType === "image/png" ||
        file.contentType === "image/jpg"
      ) {
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      }
    }
  });
});

app.listen(PORT, () => console.log("listening on port:" + PORT));
