import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AppServices {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userData = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userData) {
        // calling another method
        return this.login({ email, password });
      } else {
        return userData;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = await account.get();
      // Logged in
      return user;
    } catch (error) {
      // Not logged in
      throw error;
    }
    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const appService = new AppServices();

export default appService;
