import * as admin from "firebase-admin";
import { UserDataSource } from "./users";

if (!process.env.NODE_ENV)
  throw new Error("process.env.NODE_ENV is not defined");
if (!process.env.FIRESTORE_DATABASE_ID)
  throw new Error("process.env.FIRESTORE_DATABASE_ID is not defined");

const app =
  process.env.NODE_ENV === "development"
    ? admin.initializeApp({
        credential: admin.credential.cert("./temp/service-account.json"),
      })
    : admin.initializeApp();
const firestore = app.firestore();
firestore.settings({
  ignoreUndefinedProperties: true,
  databaseId: process.env.FIRESTORE_DATABASE_ID,
});

const usersCollection = firestore.collection("users");

export default {
  users: new UserDataSource(usersCollection),
};
