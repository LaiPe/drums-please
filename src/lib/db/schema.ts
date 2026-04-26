import { integer, json, pgTable, text, varchar } from "drizzle-orm/pg-core";
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

// ── Homepage editorial tables ─────────────────────────────────────────────────

// Section 1 — Hero (0 or 1 row). Always shown; null fields → placeholder fallback.
export const homepageHeroTable = pgTable("homepage_hero", {
    id:        integer().primaryKey().generatedAlwaysAsIdentity(),
    mediaType: varchar("media_type", { length: 10 }),   // 'image' | 'video'
    mediaSrc:  varchar("media_src",  { length: 255 }),
    text:      varchar({ length: 500 }),
})

// Section 2 — Products (0 or 1 row). Hidden if no row or empty array.
export const homepageProductsTable = pgTable("homepage_products", {
    id:          integer().primaryKey().generatedAlwaysAsIdentity(),
    categoryIds: json("category_ids").$type<number[]>().notNull().default([]),
})

// Section 3 — About (0 or 1 row). Hidden if no row.
export const homepageAboutTable = pgTable("homepage_about", {
    id:       integer().primaryKey().generatedAlwaysAsIdentity(),
    imageSrc: varchar("image_src", { length: 255 }),
    content:  text(),
})

// Section 4 — CTA (0 or 1 row). Hidden if no row.
export const homepageCtaTable = pgTable("homepage_cta", {
    id:        integer().primaryKey().generatedAlwaysAsIdentity(),
    mediaType: varchar("media_type", { length: 10 }),
    mediaSrc:  varchar("media_src",  { length: 255 }),
    title:     varchar({ length: 255 }),
    subtitle:  varchar({ length: 500 }),
    ctaLabel:  varchar("cta_label",  { length: 100 }),
})

export type HomepageHero     = InferSelectModel<typeof homepageHeroTable>
export type HomepageProducts = InferSelectModel<typeof homepageProductsTable>
export type HomepageAbout    = InferSelectModel<typeof homepageAboutTable>
export type HomepageCta      = InferSelectModel<typeof homepageCtaTable>