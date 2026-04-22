'use server'

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { productsCategoriesTable } from '../db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

const db = drizzle(postgres(process.env.DATABASE_URL!, { ssl: 'require' }))

export type ActionState = { error?: string; success?: boolean }

function slugify(str: string) {
    return str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export async function createCategory(_: ActionState, formData: FormData): Promise<ActionState> {
    const name = (formData.get('name') as string)?.trim()
    const imageSrc = (formData.get('imageSrc') as string)?.trim()
    const rawSlug = (formData.get('slug') as string)?.trim()
    const slug = rawSlug || slugify(name)

    if (!name || !imageSrc) return { error: 'Le nom et l\'image sont requis.' }
    if (!slug) return { error: 'Slug invalide.' }

    try {
        await db.insert(productsCategoriesTable).values({ name, slug, imageSrc })
        revalidatePath('/admin/products')
        revalidatePath('/products/[slug]', 'page')
        return { success: true }
    } catch {
        return { error: 'Erreur — le slug existe peut-être déjà.' }
    }
}

export async function updateCategory(_: ActionState, formData: FormData): Promise<ActionState> {
    const id = Number(formData.get('id'))
    const name = (formData.get('name') as string)?.trim()
    const slug = (formData.get('slug') as string)?.trim()
    const imageSrc = (formData.get('imageSrc') as string)?.trim()

    if (!id || !name || !slug || !imageSrc) return { error: 'Tous les champs sont requis.' }

    try {
        await db.update(productsCategoriesTable)
            .set({ name, slug, imageSrc })
            .where(eq(productsCategoriesTable.id, id))
        revalidatePath('/admin/products')
        revalidatePath('/products/[slug]', 'page')
        return { success: true }
    } catch {
        return { error: 'Erreur — le slug existe peut-être déjà.' }
    }
}

export async function deleteCategory(_: ActionState, formData: FormData): Promise<ActionState> {
    const id = Number(formData.get('id'))
    if (!id) return { error: 'ID manquant.' }

    try {
        await db.delete(productsCategoriesTable).where(eq(productsCategoriesTable.id, id))
        revalidatePath('/admin/products')
        revalidatePath('/products/[slug]', 'page')
        return { success: true }
    } catch {
        return { error: 'Suppression impossible — des produits sont liés à cette catégorie.' }
    }
}
