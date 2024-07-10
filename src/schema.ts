import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./types";
import resolvers from "./resolvers/user";
import { authDirectiveTransformer } from "./directives/auth";

let schema = makeExecutableSchema({ typeDefs, resolvers });
schema = authDirectiveTransformer(schema, "auth");

export default schema;
