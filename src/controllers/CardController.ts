import { InsertOneResult, ObjectId } from "mongodb";
import Card from "../models/Card";
import { Database } from "../database";

class CardController {
  private database: Database;
  private collectionName = "Card";

  constructor() {
    this.database = new Database();
  }

  public async create(body: Card): Promise<ObjectId | void> {
    try {
      await this.database.connect();
      const collection = this.database.getCollection(this.collectionName);

      const card: Card = body;
      const result = await collection.insertOne(card);

      return result.insertedId;
    } catch (err) {
      return;
    } finally {
      await this.database.close();
    }
  }
}

export default CardController;
