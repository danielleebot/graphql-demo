import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { AuthenticationError } from "apollo-server";
import { defaultFieldResolver } from "graphql";
import * as jwt from "jsonwebtoken";

// This function takes in a schema and adds auth logic
// to every resolver for an object field that has a directive with
// the specified name (we're using `auth`)
export function authDirectiveTransformer(schema, directiveName) {
  return mapSchema(schema, {
    // Executes once for each object field in the schema
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      // Check whether this field has the specified directive
      const directive = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (directive) {
        // Get this field's original resolver
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async function (source, args, context, info) {
          const { token, dataSources } = context;
          try {
            if (!token) throw new AuthenticationError("Unauthorized");

            const decodeData = jwt.verify(token, "secret");
            if (!decodeData) throw new AuthenticationError("Unauthorized");

            const user = await dataSources.users.getUserById(
              (decodeData as { userId: string }).userId
            );
            context.user = user;
          } catch (err) {
            console.log("err", err);
            throw new AuthenticationError("Unauthorized");
          }

          const result = await resolve(source, args, context, info);
          return result;
        };
        return fieldConfig;
      }
    },
  });
}
