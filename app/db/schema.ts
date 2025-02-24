import * as t from "drizzle-orm/singlestore-core";
import { index } from "drizzle-orm/singlestore-core";

export const createTable = t.singlestoreTableCreator((name) => `drive_${name}`);

export const filesTable = t.singlestoreTable(
  "files_table",
  {
    id: t
      .bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),

    ownerId: t.text("owner_id").notNull(),
    name: t.text("name").notNull(),
    size: t.int("size").notNull(),
    url: t.text("url").notNull(),
    fileType: t.text().notNull(),
    createdAt: t.timestamp("created_at").notNull().defaultNow(),
  },
  (t) => {
    return [index("owner_id_index").on(t.ownerId)];
  }
);

export type DB_FileType = typeof filesTable.$inferSelect;
