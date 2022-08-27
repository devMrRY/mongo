const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
require("dotenv").config();
const db = require("./connection/index.js");

app.get("/getdata", async (req, res) => {
  const accounts = db.collection("accounts");
  // const cursor = accounts.find({ $expr: {$gt: [{$size: "$products"}, 4]}})
  const cursor = accounts.aggregate([
    {
      $match: { $and : [{$expr: {$gt: [{$size: "$products"}, 3]}}, {limit: {$ne: 10000}}]}
      ,
    },
    // {
    //   $project: {
    //     products: 1,
    //     account_id: 1,
    //     count: {$size: "$products"}
    //   }
    // },
    // {
    //   $match: {count: {$gt: 4}}
    // }
  ]);
  let result = [];
  await cursor.forEach((data) => {
    result.push(data);
  });
  res.send(result);
});

let server = app.listen(5000, () => {
  console.log("server is running on 5000");
});

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing http server.');
  server.close(() => {
      console.log('Http server closed.');
      // boolean means [force], see in mongoose doc
      mongoose.connection.close(false, () => {
          console.log('MongoDb connection closed.');
          process.exit(0);
          //process.exit(1);   // used to indicate that some error occured.
      });
  });
});