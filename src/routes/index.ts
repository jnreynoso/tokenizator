import { Router } from "express";
import jwtRouter from "./jwt";
import tokenRouter from "./token";

const router = Router();

router.use("/token", tokenRouter);
router.use("/jwt", jwtRouter);

export default router;
