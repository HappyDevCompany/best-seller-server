const BookModel = require("../models/book");
const ObjectId = require("mongoose").Types.ObjectId;

const createBook = async (
  name,
  cover,
  author,
  edition,
  editionDate,
  summary,
  numberPages
) => {
  try {
    if (
      !name ||
      !cover ||
      !author ||
      !edition ||
      !editionDate ||
      !summary ||
      !numberPages
    ){
      throw new Error("Tous les champs n'ont pas été correctement rempli !");
    }
      const newBook = await BookModel.create({
      name,
      cover,
      author,
      edition,
      editionDate,
      summary,
      numberPages,
    });

    if (!newBook) {
      throw new Error("Un probleme est survenu de l'ajout du livre !");
    }
    return newBook;
  } catch (err) {
    throw new Error(err);
  }
};

const updateBook = async (id, updateData) => {
  try {
    if (!ObjectId.isValid(id)) throw new Error("ID is invalid");

    await BookModel.findByIdAndUpdate(id, {
      $set: updateData,
    });

    return await BookModel.findById(id)
      .populate({ path: "likers", select: "-password" })
      .populate({ path: "comments.user", select: "-password" });
  } catch (err) {
    throw new Error(err);
  }
};

const deleteBook = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error("ID is invalid");

  const Book = await BookModel.findById(id);
  if (!Book)
    throw new Error(
      "⛔ La suppression a echouée car le livre n'existe pas ou plus !"
    );

  await BookModel.findByIdAndDelete(id);
  return "✅ Le livre a été suppimer avec success !";
};

const getBooks = async (page = 1, BookPerPage = 10) => {
  try {
    const result = await BookModel.paginate(
      {},
      {
        page,
        limit: BookPerPage,
        select: "-password",
        populate: "likers comments.user",
        sort: "-createdAt",
      }
    );

    return result.docs;
  } catch (err) {
    throw new Error(err);
  }
};

const getBook = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error("ID is invalid");

  try {
    return await BookModel.findById(id)
      .populate({ path: "likers", select: "-password" })
      .populate({ path: "comments.user", select: "-password" });
  } catch (err) {
    throw new Error(err);
  }
};

const likeBook = async (id, userId) => {
  if (!ObjectId.isValid(id) || !ObjectId.isValid(userId))
    throw new Error("ID is invalid");

  try {
    await BookModel.findByIdAndUpdate(id, {
      $addToSet: {
        likers: userId,
      },
    });

    return await BookModel.findById(id)
      .populate({ path: "likers", select: "-password" })
      .populate({ path: "comments.user", select: "-password" });
  } catch (err) {
    throw new Error(err);
  }
};

const dislikeBook = async (id, userId) => {
  if (!ObjectId.isValid(id) || !ObjectId.isValid(userId))
    throw new Error("ID is invalid");

  try {
    await BookModel.findByIdAndUpdate(id, {
      $pull: {
        likers: userId,
      },
    });

    return await BookModel.findById(id)
      .populate({ path: "likers", select: "-password" })
      .populate({ path: "comments.user", select: "-password" });
  } catch (err) {
    throw new Error(err);
  }
};

const addCommentBook = async (id, userId, text) => {
  if (!ObjectId.isValid(id) || !ObjectId.isValid(userId))
    throw new Error("ID is invalid");

  await BookModel.findByIdAndUpdate(id, {
    $addToSet: {
      comments: {
        user: userId,
        text,
      },
    },
  });

  return await BookModel.findById(id)
    .populate({ path: "likers", select: "-password" })
    .populate({ path: "comments.user", select: "-password" });
};

module.exports = {
  createBook,
  updateBook,
  deleteBook,
  getBooks,
  getBook,
  likeBook,
  dislikeBook,
  addCommentBook,
};
