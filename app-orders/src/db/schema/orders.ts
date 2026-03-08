import { pgEnum } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { integer, text } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { costumer } from "./customers.ts";

export const ORDER_STATUS = pgEnum("order_status", [
  "pending",
  "paid",
  "canceled",
]);

export const orders = pgTable("orders", {
  id: text().primaryKey(),
  costumerId: text()
    .notNull()
    .references(() => costumer.id),
  amount: integer().notNull(),
  status: ORDER_STATUS().notNull().default("pending"),
  createdAt: timestamp().defaultNow().notNull(),
});
