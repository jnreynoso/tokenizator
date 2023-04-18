import dotenv from "dotenv";

import { MongoClient, Collection } from "mongodb";

dotenv.config();

const MONGO_USER = process.env.MONGO_USER;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

console.log("**************************************************");
console.log("**************************************************");
console.log("**************************************************");
console.log("**************************************************");
console.log("**************************************************");
console.log("**************************************************");
console.log("**************************************************");
console.log("**************************************************");
console.log(process.env.MONGO_USER);

const url = "mongodb://localhost:27017";
//const url = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`;
const dbName = "tokenizator";

export class Database {
  private client: MongoClient;
  private db: any;

  constructor() {}

  async connect() {
    this.client = new MongoClient(url, {
      tlsAllowInvalidCertificates: true,
    });
    await this.client.connect();
    this.db = this.client.db(dbName);
  }

  getCollection(name: string): Collection {
    return this.db.collection(name);
  }

  async close() {
    await this.client.close();
  }
}
