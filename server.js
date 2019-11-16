const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const fileUpload = require("express-fileupload");
const errorHandler = require("./middleware/error");
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

const app = express();
connectDB();

app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "public")));
app.use(process.env.URL_BOOTCAMPS, bootcamps);
app.use(process.env.URL_COURSES, courses);
app.use(process.env.URL_AUTH, auth);
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
