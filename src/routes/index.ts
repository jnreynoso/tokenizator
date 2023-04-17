import express, { Router } from "express";
import jwtRouter from "./jwt";

const router = Router();

router.use("/jwt", jwtRouter);

export default router;
