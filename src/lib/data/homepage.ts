import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import {
    homepageHeroTable, HomepageHero,
    homepageProductsTable, HomepageProducts,
    homepageAboutTable, HomepageAbout,
    homepageCtaTable, HomepageCta,
} from '../db/schema'

const db = drizzle(postgres(process.env.DATABASE_URL!, { ssl: 'require' }))

export async function getHomepageHero(): Promise<HomepageHero | null> {
    const rows = await db.select().from(homepageHeroTable).limit(1)
    return rows[0] ?? null
}

export async function getHomepageProducts(): Promise<HomepageProducts | null> {
    const rows = await db.select().from(homepageProductsTable).limit(1)
    return rows[0] ?? null
}

export async function getHomepageAbout(): Promise<HomepageAbout | null> {
    const rows = await db.select().from(homepageAboutTable).limit(1)
    return rows[0] ?? null
}

export async function getHomepageCta(): Promise<HomepageCta | null> {
    const rows = await db.select().from(homepageCtaTable).limit(1)
    return rows[0] ?? null
}
