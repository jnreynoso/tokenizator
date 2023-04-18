import { ObjectId } from "mongodb";
import Transaction from "../models/Transaction.js";
import { Database } from "../database.js";
import ErrorResponse from "../utils/Error.js";

class TransactionController {
  private database: Database;
  private collectionName = "Transaction";

  constructor() {
    this.database = new Database();
  }

  public async create(body: Transaction): Promise<ObjectId | void> {
    try {
      await this.database.connect();
      const collection = this.database.getCollection(this.collectionName);

      const transaction: Transaction = body;
      const result = await collection.insertOne(transaction);

      return result.insertedId;
    } catch (err) {
      return;
    } finally {
      await this.database.close();
    }
  }

  public async read(req: Request, res: Response) {
    try {
      await this.database.connect();
      const collection = this.database.getCollection(this.collectionName);

      const models = await collection.find().toArray();

      return models;
    } catch (err) {
      return { error: "Error al obtener transacciones" };
    } finally {
      await this.database.close();
    }
  }

  public async findByToken(
    token: string
  ): Promise<Transaction | ErrorResponse> {
    try {
      await this.database.connect();
      const collection = this.database.getCollection(this.collectionName);

      const model = await collection.findOne({ token });

      const transaction: Transaction = {
        cardId: model.cardId,
        token: model.token,
        expirationDate: model.expirationDate,
      };
      return transaction;
    } catch (err) {
      return new ErrorResponse(err.message);
    } finally {
      await this.database.close();
    }
  }
}

export default new TransactionController();
