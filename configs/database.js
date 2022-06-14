const mongoose = require("mongoose");
const mongoUri = `mongodb://127.0.0.1:27017/best_seller`;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (error) => {
  console.log("err", error);
});

mongoose.connection.on("connected", (error, res) => {
  console.log("mongoose is connected");
});
