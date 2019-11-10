const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const errorHandler = require("./middleware/error");
const bootcamps = require("./routes/bootcamps");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });
//
connectDB();
const app = express();

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(process.env.URL, bootcamps);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(
    `Server is running on ${PORT} using ${process.env.NODE_ENV} enviroment`
  );
});

// Exception handle
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error ${err.message}`);
  server.close(() => process.exit(1));
});
