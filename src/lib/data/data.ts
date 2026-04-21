import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { ProductCategory, productsCategoriesTable, productsTable, Product } from '../db/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(postgres(process.env.DATABASE_URL!, { ssl: 'require' }));

export function getAllProductCategories() : Promise<ProductCategory[]> {
    return db.select().from(productsCategoriesTable);
}

export function getAllProductsByCategoryId(categoryId: number) : Promise<Product[]> {
    return db.select().from(productsTable).where(eq(productsTable.categoryId, categoryId));
}