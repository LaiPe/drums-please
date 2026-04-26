'use server'

import { z } from 'zod'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import {
    homepageHeroTable,
    homepageProductsTable,
    homepageAboutTable,
    homepageCtaTable,
} from '../db/schema'
import { revalidatePath } from 'next/cache'

const db = drizzle(postgres(process.env.DATABASE_URL!, { ssl: 'require' }))

export type ActionState = {
    success?: boolean
    error?: string
    fieldErrors?: Record<string, string[]>
}

// ── Hero ──────────────────────────────────────────────────────────────────────

const HeroSchema = z.object({
    mediaType: z.enum(['image', 'video']).optional(),
    mediaSrc:  z.string().optional(),
    text:      z.string().optional(),
})

export async function upsertHero(_: ActionState, formData: FormData): Promise<ActionState> {
    const result = HeroSchema.safeParse({
        mediaType: formData.get('mediaType') || undefined,
        mediaSrc:  formData.get('mediaSrc')  || undefined,
        text:      formData.get('text')      || undefined,
    })
    if (!result.success) return { fieldErrors: result.error.flatten().fieldErrors }
    try {
        await db.delete(homepageHeroTable)
        await db.insert(homepageHeroTable).values({
            mediaType: result.data.mediaType ?? null,
            mediaSrc:  result.data.mediaSrc  ?? null,
            text:      result.data.text      ?? null,
        })
        revalidatePath('/')
        revalidatePath('/admin/homepage')
        return { success: true }
    } catch {
        return { error: "Une erreur est survenue." }
    }
}

export async function deleteHero(_: ActionState, _fd: FormData): Promise<ActionState> {
    try {
        await db.delete(homepageHeroTable)
        revalidatePath('/')
        revalidatePath('/admin/homepage')
        return { success: true }
    } catch {
        return { error: "Une erreur est survenue." }
    }
}

// ── Products ──────────────────────────────────────────────────────────────────

export async function upsertProducts(_: ActionState, formData: FormData): Promise<ActionState> {
    const raw = formData.get('categoryIds') as string
    let categoryIds: number[]
    try {
        categoryIds = JSON.parse(raw)
        if (!Array.isArray(categoryIds) || categoryIds.some(id => typeof id !== 'number'))
            return { error: 'Format de catégories invalide.' }
    } catch {
        return { error: 'Format de catégories invalide.' }
    }
    try {
        await db.delete(homepageProductsTable)
        await db.insert(homepageProductsTable).values({ categoryIds })
        revalidatePath('/')
        revalidatePath('/admin/homepage')
        return { success: true }
    } catch {
        return { error: "Une erreur est survenue." }
    }
}

export async function deleteProducts(_: ActionState, _fd: FormData): Promise<ActionState> {
    try {
        await db.delete(homepageProductsTable)
        revalidatePath('/')
        revalidatePath('/admin/homepage')
        return { success: true }
    } catch {
        return { error: "Une erreur est survenue." }
    }
}

// ── About ─────────────────────────────────────────────────────────────────────

const AboutSchema = z.object({
    imageSrc: z.string().optional(),
    content:  z.string().optional(),
})

export async function upsertAbout(_: ActionState, formData: FormData): Promise<ActionState> {
    const result = AboutSchema.safeParse({
        imageSrc: formData.get('imageSrc') || undefined,
        content:  formData.get('content')  || undefined,
    })
    if (!result.success) return { fieldErrors: result.error.flatten().fieldErrors }
    try {
        await db.delete(homepageAboutTable)
        await db.insert(homepageAboutTable).values({
            imageSrc: result.data.imageSrc ?? null,
            content:  result.data.content  ?? null,
        })
        revalidatePath('/')
        revalidatePath('/admin/homepage')
        return { success: true }
    } catch {
        return { error: "Une erreur est survenue." }
    }
}

export async function deleteAbout(_: ActionState, _fd: FormData): Promise<ActionState> {
    try {
        await db.delete(homepageAboutTable)
        revalidatePath('/')
        revalidatePath('/admin/homepage')
        return { success: true }
    } catch {
        return { error: "Une erreur est survenue." }
    }
}

// ── CTA ───────────────────────────────────────────────────────────────────────

const CtaSchema = z.object({
    mediaType: z.enum(['image', 'video']).optional(),
    mediaSrc:  z.string().optional(),
    title:     z.string().optional(),
    subtitle:  z.string().optional(),
    ctaLabel:  z.string().optional(),
})

export async function upsertCta(_: ActionState, formData: FormData): Promise<ActionState> {
    const result = CtaSchema.safeParse({
        mediaType: formData.get('mediaType') || undefined,
        mediaSrc:  formData.get('mediaSrc')  || undefined,
        title:     formData.get('title')     || undefined,
        subtitle:  formData.get('subtitle')  || undefined,
        ctaLabel:  formData.get('ctaLabel')  || undefined,
    })
    if (!result.success) return { fieldErrors: result.error.flatten().fieldErrors }
    try {
        await db.delete(homepageCtaTable)
        await db.insert(homepageCtaTable).values({
            mediaType: result.data.mediaType ?? null,
            mediaSrc:  result.data.mediaSrc  ?? null,
            title:     result.data.title     ?? null,
            subtitle:  result.data.subtitle  ?? null,
            ctaLabel:  result.data.ctaLabel  ?? null,
        })
        revalidatePath('/')
        revalidatePath('/admin/homepage')
        return { success: true }
    } catch {
        return { error: "Une erreur est survenue." }
    }
}

export async function deleteCta(_: ActionState, _fd: FormData): Promise<ActionState> {
    try {
        await db.delete(homepageCtaTable)
        revalidatePath('/')
        revalidatePath('/admin/homepage')
        return { success: true }
    } catch {
        return { error: "Une erreur est survenue." }
    }
}
