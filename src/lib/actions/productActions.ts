'use server'

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { productsTable } from '../db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

const db = drizzle(postgres(process.env.DATABASE_URL!, { ssl: 'require' }))

export type ActionState = { error?: string; success?: boolean }

function slugify(str: string) {
    return str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export async function createProduct(_: ActionState, formData: FormData): Promise<ActionState> {
    const name = (formData.get('name') as string)?.trim()
    const imageSrc = (formData.get('imageSrc') as string)?.trim()
    const description = (formData.get('description') as string)?.trim()
    const categoryId = Number(formData.get('categoryId'))
    const rawSlug = (formData.get('slug') as string)?.trim()
    const slug = rawSlug || slugify(name)

    if (!name || !imageSrc || !description || !categoryId) return { error: 'Tous les champs sont requis.' }
    if (!slug) return { error: 'Slug invalide.' }

    try {
        await db.insert(productsTable).values({ name, slug, imageSrc, description, categoryId })
        revalidatePath('/admin/products')
        revalidatePath('/products/[slug]', 'page')
        return { success: true }
    } catch {
        return { error: 'Erreur — le slug existe peut-être déjà.' }
    }
}

export async function updateProduct(_: ActionState, formData: FormData): Promise<ActionState> {
    const id = Number(formData.get('id'))
    const name = (formData.get('name') as string)?.trim()
    const slug = (formData.get('slug') as string)?.trim()
    const imageSrc = (formData.get('imageSrc') as string)?.trim()
    const description = (formData.get('description') as string)?.trim()
    const categoryId = Number(formData.get('categoryId'))

    if (!id || !name || !slug || !imageSrc || !description || !categoryId) return { error: 'Tous les champs sont requis.' }

    try {
        await db.update(productsTable)
            .set({ name, slug, imageSrc, description, categoryId })
            .where(eq(productsTable.id, id))
        revalidatePath('/admin/products')
        revalidatePath('/products/[slug]', 'page')
        return { success: true }
    } catch {
        return { error: 'Erreur — le slug existe peut-être déjà.' }
    }
}

export async function deleteProduct(_: ActionState, formData: FormData): Promise<ActionState> {
    const id = Number(formData.get('id'))
    if (!id) return { error: 'ID manquant.' }

    try {
        await db.delete(productsTable).where(eq(productsTable.id, id))
        revalidatePath('/admin/products')
        revalidatePath('/products/[slug]', 'page')
        return { success: true }
    } catch {
        return { error: 'Une erreur est survenue.' }
    }
}
