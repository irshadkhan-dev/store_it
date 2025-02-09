import { singlestoreTable } from "drizzle-orm/singlestore-core";
import * as t from "drizzle-orm/singlestore-core";
export const users = t.singlestoreTable("users", {
  id: t.text("id").primaryKey(),
  name: t.text("name").notNull(),
});
