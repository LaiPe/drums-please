'use server'

import { z } from 'zod'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { brandIdentityLogoTable } from '../db/schema'
import { revalidatePath } from 'next/cache'

const db = drizzle(postgres(process.env.DATABASE_URL!, { ssl: 'require' }))

export type ActionState = {
    success?: boolean
    error?: string
    fieldErrors?: Record<string, string[]>
}

// ── Logo ──────────────────────────────────────────────────────────────────────

const LogoSchema = z.object({
    logoDesktopSrc: z.string().optional(),
    logoMobileSrc:  z.string().optional(),
})

export async function upsertLogo(_: ActionState, formData: FormData): Promise<ActionState> {
    const result = LogoSchema.safeParse({
        logoDesktopSrc: formData.get('logoDesktopSrc') || undefined,
        logoMobileSrc:  formData.get('logoMobileSrc')  || undefined,
    })
    if (!result.success) return { fieldErrors: result.error.flatten().fieldErrors }
    try {
        await db.delete(brandIdentityLogoTable)
        await db.insert(brandIdentityLogoTable).values({
            logoDesktopSrc: result.data.logoDesktopSrc ?? null,
            logoMobileSrc:  result.data.logoMobileSrc  ?? null,
        })
        revalidatePath('/')
        revalidatePath('/admin/brand-identity')
        return { success: true }
    } catch {
        return { error: "Une erreur est survenue." }
    }
}

export async function deleteLogo(_: ActionState, _fd: FormData): Promise<ActionState> {
    try {
        await db.delete(brandIdentityLogoTable)
        revalidatePath('/')
        revalidatePath('/admin/brand-identity')
        return { success: true }
    } catch {
        return { error: "Une erreur est survenue." }
    }
}
