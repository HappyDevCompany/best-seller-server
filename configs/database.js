const mongoose = require("mongoose");
//const mongoUri = `mongodb://127.0.0.1:27017/best_seller`;
const mongoUri = `mongodb+srv://happynguala:darknet@cluster0.gzl4p.gcp.mongodb.net/bestseller?retryWrites=true&w=majority`;

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
