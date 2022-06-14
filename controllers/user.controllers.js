const UserModel = require("../models/user");
const ObjectId = require("mongoose").Types.ObjectId;
const bcrypt = require("bcrypt");

const login = async (username, password) => {
  try {
    const user = await UserModel.findOne({ username }).populate('favorites')

    if (!user) {
      throw new Error("Ce compte n'existe pas!");
    }

    // const isValid = await bcrypt.compare(password, user.password);
    if (password === user.password) {
      user.password = undefined;
      return user;
    } else {
      throw new Error("Le mot de passe est incorrect!");
    }
  } catch (err) {
    throw new Error(err);
  }
};

const register = async (username, password, sex) => {
  try {
    const user = await UserModel.findOne({ username }).populate('favorites');

    if (user) {
      throw new Error("Ce compte est utilisé par un autre utilisateur !");
    }

    const newUser = await UserModel.create({ username, password, sex });

    if (!newUser) {
      throw new Error("Un probleme est survenu lors de l'inscription !");
    }
    return newUser
    // return await UserModel.findById(newUser._id)
  } catch (err) {
    throw new Error(err);
  }
};

const getUsers = async (page = 1, postPerPage = 10) => {
  try {
    const result = await UserModel.paginate(
      {},
      {
        page,
        limit: postPerPage,
        select: "-password",
        populate: "favorites",
      }
    );

    return result.docs;
  } catch (err) {
    throw new Error(err);
  }
};

const getUser = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error("ID is invalid");

  try {
    return await UserModel.findById(id)
      .populate({ path: "favorites" })
      .select("-password");
  } catch (err) {
    throw new Error(err);
  }
};

const addFavoriteBook = async (id, bookId) => {
  if (!ObjectId.isValid(id) || !ObjectId.isValid(bookId))
    throw new Error("ID is invalid");

  try {
    await UserModel.findByIdAndUpdate(id, {
      $addToSet: {
        favorites: bookId,
      },
    });

    return await UserModel.findById(id)
      .populate({ path: "favorites" })
      .select("-password");
  } catch (err) {
    throw new Error(err);
  }
};

const removeFavoriteBook = async (id, bookId) => {
  if (!ObjectId.isValid(id) || !ObjectId.isValid(bookId))
    throw new Error("ID is invalid");

  try {
    await UserModel.findByIdAndUpdate(id, {
      $pull: {
        favorites: bookId,
      },
    });

    return await UserModel.findById(id)
      .populate({ path: "favorites" })
      .select("-password");
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  login,
  register,
  getUsers,
  getUser,
  addFavoriteBook,
  removeFavoriteBook,
};
