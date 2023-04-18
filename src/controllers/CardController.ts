import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import Card from "../models/Card";
import { Database } from "../database";
import TransactionController from "./TransactionController";
import CardDto from "../dtos/Card";
import ErrorResponse from "../utils/Error";
import TokenController from "./TokenController";
import JwtController from "./JwtController";

class CardController {
  private database: Database;
  private collectionName = "Card";

  constructor() {
    this.database = new Database();

    this.create = this.create.bind(this);
    this.findTransactionByToken = this.findTransactionByToken.bind(this);
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

  public async findById(cardId: string) {
    try {
      await this.database.connect();
      const collection = this.database.getCollection(this.collectionName);

      const model = await collection.findOne({ _id: new ObjectId(cardId) });

      const cardFinded: Card = {
        email: model.email,
        number: model.number,
        cvv: model.cvv,
        expirationYear: model.expirationYear,
        expirationMonth: model.expirationMonth,
      };

      return cardFinded;
    } catch (err) {
      return new ErrorResponse("No se encontro documento");
    } finally {
      await this.database.close();
    }
  }

  public async findTransactionByToken(req: Request, res: Response) {
    try {
      await this.database.connect();
      const token = req.query.token;

      const findedToken = await TransactionController.findByToken(`${token}`);

      if (findedToken && "expirationDate" in findedToken) {
        // const expirationDate = new Date(findedToken.expirationDate);
        // const currentDate = new Date();

        const verifyJwt = JwtController.verifyByToken(`${token}`);

        if ("error" in verifyJwt) {
          res.send({ message: verifyJwt.message });
          return;
        }

        const card = await this.findById(findedToken.cardId);
        // "number" in card / confuso?
        const NUMBER_CARD_PROPERTY = "number";

        if (NUMBER_CARD_PROPERTY in card) {
          const dto: CardDto = {
            email: card.email,
            number: card.number,
            expirationYear: card.expirationYear,
            expirationMonth: card.expirationMonth,
          };

          res.send(dto);
        } else {
          res.send(card);
        }
      } else {
        res.send({ message: "Token inexistente" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    } finally {
      await this.database.close();
    }
  }
}

export default CardController;
