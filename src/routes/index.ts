import { Router } from "express";
import jwtRouter from "./jwt";
import tokenRouter from "./token";
import cardRouter from "./card";

const router = Router();

router.use("/token", tokenRouter);
router.use("/jwt", jwtRouter);
router.use("/card", cardRouter);

export default router;
