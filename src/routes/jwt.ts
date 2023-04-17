import { jwt } from "jsonwebtoken";
import express, { Router, Request, Response } from "express";
import jwtController from "../controllers/JwtController";

const jwtRouter = Router();

jwtRouter.get("/generate-token", jwtController.generateToken);

jwtRouter.get(
  "/protected",
  jwtController.verifyToken,
  (req: Request, res: Response) => {
    res.send(`Bienvenido, usuario con ID ${req.body.userId}`);
  }
);

export default jwtRouter;
