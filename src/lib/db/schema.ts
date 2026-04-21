import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm/table";

export const productsCategoriesTable = pgTable("products_categories", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    slug: varchar({ length: 255 }).notNull().unique(),
    imageSrc: varchar("image_src", { length: 255 }).notNull()
});

export const productsTable = pgTable("products", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    slug: varchar({ length: 255 }).notNull().unique(),
    categoryId: integer("category_id").notNull().references(() => productsCategoriesTable.id),
    imageSrc: varchar("image_src", { length: 255 }).notNull(),
    description: text().notNull() // TODO : make it viable for markdown content
});

export type ProductCategory = InferSelectModel<typeof productsCategoriesTable>
export type Product = InferSelectModel<typeof productsTable>