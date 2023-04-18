import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const secret = "mi_secreto_super_secreto";

class JWTController {
  public signin(cardId: string): void {
    const token = jwt.sign({ cardId }, secret, { expiresIn: "1m" });

    return token;
  }

  public verify(req: Request, res: Response, next: Function) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .send("No se proporcionó un token de autenticación");
    }

    try {
      const decoded = jwt.verify(token, secret);
      req.body.userId = decoded.userId;
      next();
    } catch (err) {
      res.status(401).send("El token de autenticación es inválido");
    }
  }
}

export default new JWTController();
