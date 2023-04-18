import { MongoClient, Collection } from "mongodb";

const url =
  "mongodb://jnreynoso:shutdown-i123QWE@docdb-2023-04-18-22-24-20.cluster-cbhdrjtqlmgp.us-east-1.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false";
const dbName = "tokenizator";

export class Database {
  private client: MongoClient;
  private db: any;

  constructor() {}

  async connect() {
    this.client = new MongoClient(url, {
      ssl: true,
      sslValidate: true,
      sslCA: "rds-combined-ca-bundle.pem",
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
