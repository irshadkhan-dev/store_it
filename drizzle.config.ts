import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./app/db/schema.ts",
  dialect: "singlestore",
  dbCredentials: {
    url: process.env.SINGLESTORE_DATABASE_URL!,
  },
  tablesFilter: ["drive_*"],
});
