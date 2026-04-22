import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { ProductCategory, productsCategoriesTable, productsTable, Product } from '../db/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(postgres(process.env.DATABASE_URL!, { ssl: 'require' }));

export function getAllProductCategories() : Promise<ProductCategory[]> {
    return db.select().from(productsCategoriesTable);
}

export async function getCategoryBySlug(slug: string) : Promise<ProductCategory | undefined> {
    const rows = await db.select().from(productsCategoriesTable).where(eq(productsCategoriesTable.slug, slug));
    return rows[0];
}

export function getAllProductsByCategoryId(categoryId: number) : Promise<Product[]> {
    return db.select().from(productsTable).where(eq(productsTable.categoryId, categoryId));
}

export async function getProductsByCategorySlug(slug: string) : Promise<Product[]> {
    const category = await getCategoryBySlug(slug);
    if (!category) return [];
    return getAllProductsByCategoryId(category.id);
}