import { Router, type IRouter } from "express";
import { db, careersTable } from "@workspace/db";
import { ListCareersResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/careers", async (_req, res): Promise<void> => {
  const careers = await db.select().from(careersTable).orderBy(careersTable.title);
  res.json(ListCareersResponse.parse(careers));
});

export default router;
