import { Router } from "express";
import CardController from "../controllers/CardController.js";

const tokenRouter = Router();

const controller = new CardController();

tokenRouter.get("/", controller.findTransactionByToken);

export default tokenRouter;
