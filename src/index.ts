import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import schema from "./schema";
import dataSources from "./datasources";

const server = new ApolloServer({
  schema,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      // Get the user token from the headers.
      const token = req.headers.authorization || "";
      return { token, dataSources };
    },
  });
  console.log(`🚀  Server ready at: ${url}`);
})();
