import { Router, type IRouter } from "express";
import { db, majorsTable } from "@workspace/db";
import { ListMajorsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/majors", async (_req, res): Promise<void> => {
  const majors = await db.select().from(majorsTable).orderBy(majorsTable.name);
  res.json(ListMajorsResponse.parse(majors));
});

export default router;
