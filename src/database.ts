import { MongoClient, Collection } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URI;
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
