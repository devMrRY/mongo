const db = require("../../connection");

module.exports.getAnalyticsData = async (req, res) => {
const accounts = db.collection("accounts");
  // const cursor = accounts.find({ $expr: {$gt: [{$size: "$products"}, 4]}})
  const cursor = accounts.aggregate([
    {
      $match: {
        $and: [
          { $expr: { $gt: [{ $size: "$products" }, 3] } },
          { limit: { $ne: 10000 } },
        ],
      },
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
}