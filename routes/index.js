import { Router } from "express";
import userRouter from "./userRouter.js";
import blogRouter from "./blogRouter.js";
import adminPanelRouter from "./adminPanelRouter.js";

const router = Router();

router.use("/", userRouter);
router.use("/", blogRouter);
router.use("/admin", adminPanelRouter);

export default router;