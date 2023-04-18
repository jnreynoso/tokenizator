import { Router, Request, Response } from "express";
import TokenController from "../controllers/TokenController";

const tokenRouter = Router();

tokenRouter.post("/", TokenController.create);

export default tokenRouter;
