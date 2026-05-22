import { Router, type IRouter } from "express";
import healthRouter from "./health";
import assessmentRouter from "./assessment";
import majorsRouter from "./majors";
import careersRouter from "./careers";

const router: IRouter = Router();

router.use(healthRouter);
router.use(assessmentRouter);
router.use(majorsRouter);
router.use(careersRouter);

export default router;
