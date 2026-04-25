'use client'

import { useActionState } from 'react'
import { sendContactEmail, type ContactState } from '@/lib/actions/contactActions'
import Button from '@/ui/components/inputs/Button'
import styles from './ContactForm.module.css'

const initialState: ContactState = {}

export default function ContactForm() {
    const [state, formAction, pending] = useActionState(sendContactEmail, initialState)

    if (state.success) {
        return (
            <p className={styles.success}>
                Message envoyé ! Nous vous répondrons dans les plus brefs délais.
            </p>
        )
    }

    return (
        <form action={formAction} className={styles.form}>
            <div className={styles.row}>
                <div className={styles.field}>
                    <label htmlFor="contact-name" className={styles.label}>Nom</label>
                    <input
                        id="contact-name"
                        name="name"
                        type="text"
                        placeholder="Votre nom"
                        required
                        className={styles.input}
                    />
                    {state.fieldErrors?.name && (
                        <span className={styles.fieldError}>{state.fieldErrors.name[0]}</span>
                    )}
                </div>
                <div className={styles.field}>
                    <label htmlFor="contact-email" className={styles.label}>Email</label>
                    <input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="votre@email.com"
                        required
                        className={styles.input}
                    />
                    {state.fieldErrors?.email && (
                        <span className={styles.fieldError}>{state.fieldErrors.email[0]}</span>
                    )}
                </div>
            </div>
            <div className={styles.field}>
                <label htmlFor="contact-message" className={styles.label}>Message</label>
                <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Votre message..."
                    required
                    rows={4}
                    className={styles.textarea}
                />
                {state.fieldErrors?.message && (
                    <span className={styles.fieldError}>{state.fieldErrors.message[0]}</span>
                )}
            </div>
            {state.error && <p className={styles.error}>{state.error}</p>}
            <div className={styles.submit}>
                <Button type="submit" variant="outline" size="medium" disabled={pending}>
                    {pending ? 'Envoi en cours…' : 'Envoyer'}
                </Button>
            </div>
        </form>
    )
}
