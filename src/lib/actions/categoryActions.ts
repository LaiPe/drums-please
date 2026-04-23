'use server'

import { z } from 'zod'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { productsCategoriesTable } from '../db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const db = drizzle(postgres(process.env.DATABASE_URL!, { ssl: 'require' }))

export type ActionState = {
    success?: boolean
    error?: string
    fieldErrors?: Record<string, string[]>
}

function slugify(str: string) {
    return str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

const CategoryCreateSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    imageSrc: z.string().min(1, "L'image est requise"),
})

const CategoryUpdateSchema = z.object({
    id: z.coerce.number().int().positive(),
    name: z.string().min(1, "Le nom est requis"),
    imageSrc: z.string().min(1, "L'image est requise"),
})

const DeleteSchema = z.object({
    id: z.coerce.number().int().positive(),
})

export async function createCategory(_: ActionState, formData: FormData): Promise<ActionState> {
    const result = CategoryCreateSchema.safeParse({
        name: formData.get('name'),
        slug: formData.get('slug') || undefined,
        imageSrc: formData.get('imageSrc'),
    })

    if (!result.success) {
        return { fieldErrors: result.error.flatten().fieldErrors }
    }

    const { name, imageSrc } = result.data
    const slug = slugify(name)
    if (!slug) return { fieldErrors: { name: ["Nom invalide — impossible de générer un slug."] } }

    try {
        await db.insert(productsCategoriesTable).values({ name, slug, imageSrc })
    } catch {
        return { error: 'Erreur — le slug existe peut-être déjà.' }
    }

    revalidatePath('/admin/products')
    revalidatePath('/products/[slug]', 'page')
    redirect('/admin/products')
}

export async function updateCategory(_: ActionState, formData: FormData): Promise<ActionState> {
    const result = CategoryUpdateSchema.safeParse({
        id: formData.get('id'),
        name: formData.get('name'),
        slug: formData.get('slug'),
        imageSrc: formData.get('imageSrc'),
    })

    if (!result.success) {
        return { fieldErrors: result.error.flatten().fieldErrors }
    }

    const { id, name, imageSrc } = result.data
    const slug = slugify(name)

    try {
        await db.update(productsCategoriesTable)
            .set({ name, slug, imageSrc })
            .where(eq(productsCategoriesTable.id, id))
    } catch {
        return { error: 'Erreur — le slug existe peut-être déjà.' }
    }

    revalidatePath('/admin/products')
    revalidatePath('/products/[slug]', 'page')
    redirect('/admin/products')
}

export async function deleteCategory(_: ActionState, formData: FormData): Promise<ActionState> {
    const result = DeleteSchema.safeParse({ id: formData.get('id') })
    if (!result.success) return { error: 'ID invalide.' }

    try {
        await db.delete(productsCategoriesTable).where(eq(productsCategoriesTable.id, result.data.id))
    } catch {
        return { error: 'Suppression impossible — des produits sont liés à cette catégorie.' }
    }

    revalidatePath('/admin/products')
    revalidatePath('/products/[slug]', 'page')
    redirect('/admin/products')
}
