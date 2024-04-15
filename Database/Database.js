const mongoose = require("mongoose");
const Connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ADDRESS);
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = Connection;
