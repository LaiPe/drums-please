'use server'

import { z } from 'zod'
import { Resend } from 'resend'

const ContactSchema = z.object({
    name: z.string().min(1, 'Le nom est requis'),
    email: z.string().email("L'adresse email est invalide"),
    message: z.string().min(10, 'Le message doit faire au moins 10 caractères'),
})

export type ContactState = {
    success?: boolean
    error?: string
    fieldErrors?: Record<string, string[]>
}

export async function sendContactEmail(
    _prevState: ContactState,
    formData: FormData
): Promise<ContactState> {
    const parsed = ContactSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
    })

    if (!parsed.success) {
        return { fieldErrors: parsed.error.flatten().fieldErrors }
    }

    const { name, email, message } = parsed.data

    try {
        const resend = new Resend(process.env.RESEND_API_KEY)

        await resend.emails.send({
            from: 'Contact <onboarding@resend.dev>',
            to: [process.env.CONTACT_EMAIL!],
            replyTo: email,
            subject: `[DRUMS PLEASE] : Message de contact de ${name}`,
            html: `
                <p><strong>Nom :</strong> ${name}</p>
                <p><strong>Email :</strong> ${email}</p>
                <p><strong>Message :</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        })

        return { success: true }
    } catch {
        return { error: "Une erreur s'est produite. Veuillez réessayer." }
    }
}
