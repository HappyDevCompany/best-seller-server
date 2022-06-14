const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID
    username: String
    sex: String
    password: String
    favorites: [Book]
    isAdmin: Boolean
    createdAt: String
    updatedAt: String
  }

  type Book {
    id: ID
    name: String
    cover: String
    author: String
    edition: String
    editionDate: String
    summary: String
    numberPages: String
    likers: [User]
    comments: [Comment]
    createdAt: String
    updatedAt: String
  }

  type Comment {
    id: ID
    user: User
    text: String
    createdAt: String
  }

  type Query {
    hello: String
    login(username: String!, password: String!): User
    users: [User]
    user(id: ID!): User
    books: [Book]
    book(id: ID!): Book
  }

  type Mutation {
    register(username: String!, password: String!,sex: String!): User
    createBook(
      name: String!
      cover: String!
      author: String!
      edition: String!
      editionDate: String!
      summary: String!
      numberPages: String!
    ): Book
    updateBook(
      id: ID!
      name: String
      cover: String
      author: String
      edition: String
      editionDate: String
      summary: String
      numberPages: String
    ): Book
    deleteBook(id: ID!): String
    likeBook(id: ID!, userId: ID!): Book
    dislikeBook(id: ID!, userId: ID!): Book
    addCommentBook(id: ID!, userId: ID!, text: String): Book
    addFavoriteBook(id: ID!, bookId: ID!): User
    removeFavoriteBook(id: ID!, bookId: ID!): User
  }
`;

module.exports = typeDefs;
