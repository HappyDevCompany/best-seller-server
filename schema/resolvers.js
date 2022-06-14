const {
  likeBook,
  dislikeBook,
  getBooks,
  getBook,
  addCommentBook,
  deleteBook,
  updateBook,
  createBook,
} = require("../controllers/book.controllers");
const {
  getUsers,
  getUser,
  login,
  register,
  addFavoriteBook,
  removeFavoriteBook,
} = require("../controllers/user.controllers");

const resolvers = {
  // Query
  Query: {
    hello: () => "Salut c'est le jour de reunion",
    login: (_, { username, password }) => login(username, password),
    users: () => getUsers(),
    user: (_, { id }) => getUser(id),
    books: () => getBooks(),
    book: (_, { id }) => getBook(id),
  },

  // Mutation
  Mutation: {
    register: (_, { username, password, sex }) => register(username, password, sex),
    createBook: (_,{ name, cover, author, edition, editionDate, summary, numberPages }) =>
      createBook(
        name,
        cover,
        author,
        edition,
        editionDate,
        summary,
        numberPages
      ),
    updateBook: (_,{ id, name, cover, author, edition, editionDate, summary, numberPages }) =>
      updateBook(
        id,
        { name, cover, author, edition, editionDate, summary, numberPages }
      ),
    deleteBook: (_, { id }) => deleteBook(id),
    likeBook: (_, { id, userId }) => likeBook(id, userId),
    dislikeBook: (_, { id, userId }) => dislikeBook(id, userId),
    addCommentBook: (_, { id, userId, text }) =>addCommentBook(id, userId, text),
    addFavoriteBook: (_, { id, bookId }) => addFavoriteBook(id, bookId),
    removeFavoriteBook: (_, { id, bookId }) => removeFavoriteBook(id, bookId),
  },
};

module.exports = resolvers;
