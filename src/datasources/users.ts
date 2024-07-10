import { FirestoreDataSource } from "apollo-datasource-firestore";
import { ILoginUser } from "./interfaces";

export class UserDataSource extends FirestoreDataSource<any> {
  async creatNewUser({ username, password }: ILoginUser) {
    const userRef = this.collection.doc();
    await userRef.set({ id: userRef.id, username, password });

    return userRef.id;
  }

  async getUsers() {
    const snapshots = await this.collection.get();
    return snapshots.docs.map((doc) => doc.data());
  }

  async getUserById(userId: string) {
    const userRef = await this.collection.doc(userId).get();
    return userRef.data();
  }
}
