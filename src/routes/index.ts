import { Router } from "express";
import jwtRouter from "./jwt.js";
import tokenRouter from "./token.js";
import cardRouter from "./card.js";

const router = Router();

router.use("/token", tokenRouter);
router.use("/jwt", jwtRouter);
router.use("/card", cardRouter);

export default router;
