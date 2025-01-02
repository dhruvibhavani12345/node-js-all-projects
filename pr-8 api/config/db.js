const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const con = await mongoose.connect(
      `mongodb+srv://bansri:bansri1212@cluster0.xx15n.mongodb.net/apiproject`
    );
    console.log(`mongodb successfully connect`);
  } catch (err) {
    console.error(err);
    return false;
  }
};
module.exports = connectDB;



