const geocode = require("node-geocoder");

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: "https",
  apiKey: process.env.MAPQUEST_API_KEY,
  formatter: null
};

console.log(options);

const geoc = geocode(options);

module.exports = geoc;
