const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Bootcamp = require("./models/Bootcamp");

dotenv.config({ path: "./config/config.env" });
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}\\_data\\bootcamps.json`, "utf-8")
);

// Import data
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log("Data imported");
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log("Data Destroyed");
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
