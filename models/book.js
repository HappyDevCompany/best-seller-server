const mongoose = require("mongoose");
const ObjectID = require("mongoose").Types.ObjectId;
const mongoosePaginate = require("mongoose-paginate-v2");

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    edition: {
      type: String,
      required: true,
    },
    editionDate: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    numberPages: {
      type: String,
      required: true,
    },
    likers: {
      type: [ObjectID],
      required: true,
      ref: "User",
    },
    comments: {
      type: [
        {
          user: {
            type: ObjectID,
            required: true,
            ref: "User",
          },
          text: { type: String, required: true },
          createdAt: { type: Date, default: Date.now(), required: true },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Book", bookSchema);
