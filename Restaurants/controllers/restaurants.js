const db = require("../../connection");

module.exports.getData = async (req, res) => {
  const restaurants = db.collection("restaurants");
  let cursor = restaurants.aggregate([
    {
      $match: {
        // $expr: { $eq: [{$divide: ["$grades.score", 7]}, 0]},
        grades: { $elemMatch: { score: {$lt: [{$divide: ["$grades.score", 7]}, 1]}}},
        // "grades.score": { $mod: [7, 0]}
      },
    },
    {
      $limit: 10
    }
  ]);
  let result = [];
  await cursor.forEach((item) => result.push(item));
  res.send(result);
};
