const express = require("express");
const dotenv = require("dotenv");
const bootcamps = require("./routes/bootcamps");
const morgan = require("morgan");
const app = express();
//
dotenv.config({ path: "./config/config.env" });
//
if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'));
}
app.use(process.env.URL, bootcamps);
//
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server is running on ${PORT} using ${process.env.NODE_ENV} enviroment`
  );
});
