import { Router } from "express";
import { getDietTypes } from "../controllers/dietTypeController.js";

const router = Router();

router.get("/", getDietTypes);

export default router;
