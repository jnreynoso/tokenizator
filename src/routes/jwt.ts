import { Router, Request, Response } from "express";
import jwtController from "../controllers/JwtController.js";

const jwtRouter = Router();

jwtRouter.get("/signin", jwtController.signin);

jwtRouter.get(
  "/protected",
  jwtController.verify,
  (req: Request, res: Response) => {
    res.send(`Bienvenido, usuario con ID ${req.body.userId}`);
  }
);

export default jwtRouter;
