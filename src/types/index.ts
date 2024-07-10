import { gql } from "graphql-tag";

export default gql`
  directive @auth on FIELD_DEFINITION

  type Query {
    users: [User] @auth
  }

  type User {
    username: String!
    email: String
    password: String
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type LoginPayload {
    userId: String!
    token: String!
  }

  type Mutation {
    login(user: LoginInput): LoginPayload
  }
`;
