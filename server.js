const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
require("dotenv").config();

app.use('/sample_analytics', require('./Analytics/routes'));
app.use('/sample_restaurants', require('./Restaurants/routes'));

let server = app.listen(5000, () => {
  console.log("server is running on 5000");
});

process.on("SIGTERM", () => {
  console.info("SIGTERM signal received.");
  console.log("Closing http server.");
  server.close(() => {
    console.log("Http server closed.");
    // boolean means [force], see in mongoose doc
    mongoose.connection.close(false, () => {
      console.log("MongoDb connection closed.");
      process.exit(0);
      //process.exit(1);   // used to indicate that some error occured.
    });
  });
});
