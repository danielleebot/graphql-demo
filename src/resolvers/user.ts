import * as jwt from "jsonwebtoken";

const resolvers = {
  Query: {
    users: async (parent, args, { dataSources }) => {
      return await dataSources.users.getUsers();
    },
  },
  Mutation: {
    login: async (parent, { user }, { dataSources }, info) => {
      const userId = await dataSources.users.creatNewUser(user);
      const token = jwt.sign({ userId }, "secret", { expiresIn: 60 * 60 });

      return { userId, token };
    },
  },
};

export default resolvers;
