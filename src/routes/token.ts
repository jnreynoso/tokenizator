import { Router } from "express";
import TokenController from "../controllers/TokenController.js";

const tokenRouter = Router();

tokenRouter.post("/", TokenController.create);

export default tokenRouter;
