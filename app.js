const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} = require("apollo-server-core");
const express = require("express");
const http = require("http");
const cors = require("cors")

const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");

const app = express();
const httpServer = http.createServer(app);
app.use(cors())

require("./configs/database");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginDrainHttpServer({httpServer}),
    ApolloServerPluginLandingPageGraphQLPlayground(),
    // ApolloServerPluginLandingPageDisabled(),
  ],
});

server.start().then((r) => {
  server.applyMiddleware({ app });
  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});
