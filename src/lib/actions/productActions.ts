'use server'

import { z } from 'zod'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { productsTable } from '../db/schema'
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

const ProductCreateSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    imageSrc: z.string().min(1, "L'image est requise"),
    description: z.string().min(1, "La description est requise"),
    categoryId: z.coerce.number().int().positive(),
})

const ProductUpdateSchema = z.object({
    id: z.coerce.number().int().positive(),
    name: z.string().min(1, "Le nom est requis"),
    imageSrc: z.string().min(1, "L'image est requise"),
    description: z.string().min(1, "La description est requise"),
    categoryId: z.coerce.number().int().positive(),
})

const DeleteSchema = z.object({
    id: z.coerce.number().int().positive(),
})

export async function createProduct(_: ActionState, formData: FormData): Promise<ActionState> {
    const categorySlug = (formData.get('categorySlug') as string)?.trim()

    const result = ProductCreateSchema.safeParse({
        name: formData.get('name'),
        slug: formData.get('slug') || undefined,
        imageSrc: formData.get('imageSrc'),
        description: formData.get('description'),
        categoryId: formData.get('categoryId'),
    })

    if (!result.success) {
        return { fieldErrors: result.error.flatten().fieldErrors }
    }

    const { name, imageSrc, description, categoryId } = result.data
    const slug = slugify(name)
    if (!slug) return { fieldErrors: { name: ["Nom invalide — impossible de générer un slug."] } }

    try {
        await db.insert(productsTable).values({ name, slug, imageSrc, description, categoryId })
    } catch {
        return { error: 'Erreur — le slug existe peut-être déjà.' }
    }

    revalidatePath('/admin/products')
    revalidatePath('/products/[slug]', 'page')
    redirect(`/admin/products/${categorySlug}`)
}

export async function updateProduct(_: ActionState, formData: FormData): Promise<ActionState> {
    const categorySlug = (formData.get('categorySlug') as string)?.trim()

    const result = ProductUpdateSchema.safeParse({
        id: formData.get('id'),
        name: formData.get('name'),
        imageSrc: formData.get('imageSrc'),
        description: formData.get('description'),
        categoryId: formData.get('categoryId'),
    })

    if (!result.success) {
        return { fieldErrors: result.error.flatten().fieldErrors }
    }

    const { id, name, imageSrc, description, categoryId } = result.data
    const slug = slugify(name)

    try {
        await db.update(productsTable)
            .set({ name, slug, imageSrc, description, categoryId })
            .where(eq(productsTable.id, id))
    } catch {
        return { error: 'Erreur — le slug existe peut-être déjà.' }
    }

    revalidatePath('/admin/products')
    revalidatePath('/products/[slug]', 'page')
    redirect(`/admin/products/${categorySlug}`)
}

export async function deleteProduct(_: ActionState, formData: FormData): Promise<ActionState> {
    const categorySlug = (formData.get('categorySlug') as string)?.trim()
    const result = DeleteSchema.safeParse({ id: formData.get('id') })
    if (!result.success) return { error: 'ID invalide.' }

    try {
        await db.delete(productsTable).where(eq(productsTable.id, result.data.id))
    } catch {
        return { error: 'Une erreur est survenue.' }
    }

    revalidatePath('/admin/products')
    revalidatePath('/products/[slug]', 'page')
    redirect(`/admin/products/${categorySlug}`)
}
