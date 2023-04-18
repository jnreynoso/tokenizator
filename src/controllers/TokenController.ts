import { Request, Response } from "express";
import TokenDto from "../dtos/Token";

import Card from "../models/Card";
import CardController from "./CardController";
import JwtController from "./JwtController";

class TokenController {
  constructor() {
    this.create = this.create.bind(this);
  }

  public async create(req: Request, res: Response): Promise<void> {
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

    const token = JwtController.signin(`${insertedId}`);

    const dto: TokenDto = {
      token: `${token}`,
    };

    res.send(dto);
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
