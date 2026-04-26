'use client'

import { useState } from 'react'
import MediaPicker from './MediaPicker'
import styles from './MediaTypePicker.module.css'

type Props = {
    defaultMediaType?: 'image' | 'video'
    defaultMediaSrc?: string
    mediaName?: string
    typeName?: string
    folder?: string
}

export default function MediaTypePicker({
    defaultMediaType = 'image',
    defaultMediaSrc,
    mediaName = 'mediaSrc',
    typeName = 'mediaType',
    folder = 'homepage',
}: Props) {
    const [mediaType, setMediaType] = useState<'image' | 'video'>(defaultMediaType)

    return (
        <div className={styles.wrapper}>
            <div className={styles.toggle} role="group" aria-label="Type de média">
                <button
                    type="button"
                    className={`${styles.option} ${mediaType === 'image' ? styles.active : ''}`}
                    onClick={() => setMediaType('image')}
                >
                    Image
                </button>
                <button
                    type="button"
                    className={`${styles.option} ${mediaType === 'video' ? styles.active : ''}`}
                    onClick={() => setMediaType('video')}
                >
                    Vidéo
                </button>
            </div>
            <input type="hidden" name={typeName} value={mediaType} />
            <MediaPicker
                mediaType={mediaType}
                name={mediaName}
                defaultValue={defaultMediaSrc}
                folder={folder}
            />
        </div>
    )
}
