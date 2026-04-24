'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import styles from './RichTextEditor.module.css'

const Editor = dynamic(() => import('./InitializedMDXEditor'), { ssr: false })

type Props = {
    name: string
    defaultValue?: string
    placeholder?: string
}

export default function RichTextEditor({ name, defaultValue = '', placeholder }: Props) {
    const [value, setValue] = useState(defaultValue)
    const [mounted, setMounted] = useState(false)

    useEffect(() => { setMounted(true) }, [])

    return (
        <div className={styles.wrapper}>
            <input type="hidden" name={name} value={value} />
            {mounted && (
                <Editor
                    markdown={defaultValue}
                    onChange={setValue}
                    placeholder={placeholder}
                    className="dark-theme"
                />
            )}
        </div>
    )
}
