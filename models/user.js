const mongoose = require("mongoose");
const ObjectID = require("mongoose").Types.ObjectId;
const mongoosePaginate = require("mongoose-paginate-v2");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    favorites: {
      type: [ObjectID],
      required: true,
      ref: "Book",
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(mongoosePaginate);

// userSchema.pre("save", function (next) {
//   const user = this;

//   bcrypt.genSalt(10, function (err, salt) {
//     if (err) {
//       res.json({ success: false, message: err.message });
//     } else {
//       bcrypt.hash(user.password, salt, function (err, hashed) {
//         if (err) {
//           return next(err);
//         }
//         user.password = hashed;
//         next();
//       });
//     }
//   });
// });

module.exports = mongoose.model("User", userSchema);
