import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { brandIdentityLogoTable, BrandIdentityLogo } from '../db/schema'

const db = drizzle(postgres(process.env.DATABASE_URL!, { ssl: 'require' }))

export async function getBrandIdentityLogo(): Promise<BrandIdentityLogo | null> {
    const rows = await db.select().from(brandIdentityLogoTable).limit(1)
    return rows[0] ?? null
}
