import { Request, Response } from "express";
import { Database } from "../database.js";
import TokenDto from "../dtos/Token.js";

import Card from "../models/Card.js";
import Transaction from "../models/Transaction.js";
import CardController from "./CardController.js";
import JwtController from "./JwtController.js";
import TransactionController from "./TransactionController.js";

class TokenController {
  private database: Database;

  constructor() {
    this.database = new Database();
    this.create = this.create.bind(this);
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const body = req.body;
      const headers = req.headers;

      const { errors, hasErrors } = this.validations(body, headers);

      if (hasErrors) {
        res.send({ errors });
        return;
      }

      const card = new Card(
        body.email,
        body.card_number,
        body.cvv,
        body.expiration_year,
        body.expiration_month
      );

      const controller = new CardController();

      const insertedId = await controller.create(card);

      const token: string = JwtController.signin(`${insertedId}`);
      const now = new Date();
      const oneMinuteFromNow = new Date(now.getTime() + 60 * 1000);

      const expirationDate = oneMinuteFromNow.toISOString();

      await TransactionController.create(
        new Transaction(`${insertedId}`, token, expirationDate)
      );

      const dto: TokenDto = {
        token: `${token}`,
      };

      res.send(dto);
    } catch (err) {
      res.send({
        error: true,
        message: "No se pudo crear el token correctamente",
      });
    }
  }

  private validatePk(str: string): boolean {
    const regexBearer = /Bearer (\w+)/;
    const match = str.match(regexBearer);
    const token = match ? match[1] : null;

    const regexPk = /^pk_[a-z]+_[A-Za-z0-9]{16}$/;
    return regexPk.test(token);
  }

  private validations(body: any, headers: any) {
    const requiredParams = [
      "email",
      "card_number",
      "cvv",
      "expiration_year",
      "expiration_month",
    ];

    if (!Card.validateRequiredParams(body, requiredParams)) {
      return {
        errors: [
          `${Card.INVALID_REQUIRED_PARAMETERS_MESSAGE} ${requiredParams.join(
            ","
          )}`,
        ],
        hasErrors: true,
      };
    }

    if (!this.validatePk(headers.authorization || "")) {
      return {
        errors: [`Verifique formato de PK en el request`],
        hasErrors: true,
      };
    }

    const errors = {
      email: Card.validateEmail(body.email),
      cardNumber: Card.validateCardNumber(body.card_number),
      cvv: Card.validateCvv(body.cvv, body.card_number),
      expirationYear: Card.validateExpirationYear(body.expiration_year),
      expirationMonth: Card.validateExpirationMonth(body.expiration_month),
    };

    const hasErrors = Object.values(errors).some(
      (error) => error !== undefined
    );

    return {
      errors,
      hasErrors,
    };
  }
}

export default new TokenController();
