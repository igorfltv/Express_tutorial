const express = require("express");
const dotenv = require("dotenv");
//
dotenv.config({ path: "./config/config.env" });
const app = express();
const PORT = process.env.PORT || 5000;
//

bootcamps = ["First", "Send", "Third"];


app.get("/api/v1/bootcamps", (req, res) => {
  res.status(200);
  res.send({ success: true, msg: "List Bootcamps" });
});

app.get("/api/v1/bootcamps/:id", (req, res) => {
  res.status(200);
  res.send({ success: true, msg: "Get Bootcamp" });
});

app.post("/api/v1/bootcamps", (req, res) => {
  res.status(201);
  res.send({ success: true, msg: "Create new Bootcamp" });
});

app.put("/api/v1/bootcamps/:id", (req, res) => {
  res.status(200);
  res.send({ success: true, msg: `Update Bootcamp ${req.params.id}` });
});

app.delete("/api/v1/bootcamps/:id", (req, res) => {
  res.status(200);
  res.send({ success: true, msg: `Delete Bootcamp ${req.params.id}` });
});

//
app.listen(PORT, () => {
  console.log(
    `Server is running on ${PORT} using ${process.env.NODE_ENV} enviroment`
  );
});
