const {MongoClient} = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI);
const db=client.db(process.env.DB_NAME);
module.exports=db;