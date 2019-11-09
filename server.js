const express = require("express");
const dotenv = require("dotenv");
const bootcamps = require("./routes/bootcamps");
const PORT = process.env.PORT || 5000;
const app = express();
//
dotenv.config({ path: "./config/config.env" });
app.use("/api/v1/bootcamps",bootcamps);
//
app.listen(PORT, () => {
  console.log(
    `Server is running on ${PORT} using ${process.env.NODE_ENV} enviroment`
  );
});
