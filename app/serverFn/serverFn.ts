import db from "@/db";
import { filesTable } from "@/db/schema";
import { createServerFn } from "@tanstack/start";
import { desc, eq } from "drizzle-orm";

export const getAllFile = createServerFn({ method: "GET" })
  .validator((data: string) => data)
  .handler(async (ctx) => {
    return await db
      .select()
      .from(filesTable)
      .where(eq(filesTable.ownerId, ctx.data))
      .orderBy(desc(filesTable.createdAt));
  });
