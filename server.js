const express = require("express");
const db = require("./config/db");
const app = express();

db();
app.use(express.json({ extended: false }));
const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log("listening on port:" + PORT));
