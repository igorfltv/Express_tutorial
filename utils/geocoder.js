const geocode = require("node-geocoder");

const options = {
  provider: "mapquest",
  httpAdapter: "https",
  apiKey: "HUufCUlheADEuMG3W4fiK962lk8qlkSu",
  formatter: null
};

console.log(options);

const geoc = geocode(options);

module.exports = geoc;
