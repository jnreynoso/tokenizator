import { MongoClient, Collection } from "mongodb";

const url = "mongodb://localhost:27017";
const dbName = "tokenizator";

export class Database {
  private client: MongoClient;
  private db: any;

  constructor() {}

  async connect() {
    this.client = new MongoClient(url, {});
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
