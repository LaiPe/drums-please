import 'dotenv/config';
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { productsCategoriesTable, productsTable } from '../schema';
import { products, productsCategories } from '../../data/placehorlder-data';

const client = postgres(process.env.DATABASE_URL!, {ssl: 'require'});
const db = drizzle({ client });

async function main() {
    const categoriesInsert = await db
        .insert(productsCategoriesTable)
        .values(productsCategories.map(({ id, ...cat }) => cat))
        .returning();
    
    // In the placeholder data, products ids are equals to their slugs, 
    // and categories ids are equals to their slugs as well. 
    // We need to map those slugs to the actual generated ids in the database.
    const categoryIdsMap : Map<string, number> = new Map(categoriesInsert.map(category => [category.slug, category.id]));
    const productsToInsert = products.map(({id, ...product}) => ({
        ...product,
        categoryId: categoryIdsMap.get(product.categoryId)!
    }));

    await db.insert(productsTable).values(productsToInsert).returning();
}

main().finally(() => client.end());