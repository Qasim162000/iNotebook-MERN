const mongoose = require("mongoose");
require('dotenv').config({ path: __dirname + '/.env' })

const mongoURI = `${process.env.SERVER}`
console.log(mongoURI);

const connectToMongo = async () => {
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log(`Connected to MongoDB Server : ${mongoURI} successfully!`)
  }).catch((err) => {
    console.log(err)
  });
};

module.exports = connectToMongo;