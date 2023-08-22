const mongoose = require("mongoose");

const connectWithDb = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log(`DB Got Connected`))
    .catch((error) => {
      console.log(`db connected issue`);
      console.log(error);
      process.exit(1);
    });
};

module.exports = connectWithDb;
