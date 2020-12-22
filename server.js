const express = require("express");
const db = require("./config/db");
const app = express();

db();
app.use(express.json({ extended: false }));

app.use("/image", require("./routes/image"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log("listening on port:" + PORT));
