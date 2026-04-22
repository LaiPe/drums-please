import { useState } from 'react'
import styles from './MediaPicker.module.css'
import { MediaType } from './types'
import { StorageProvider } from '@/lib/data/storage'

type Props = {
  files: string[]
  selected: string
  mediaType: MediaType
  isPending: boolean
  provider: StorageProvider
  onSelect: (path: string) => void
}

function ImageThumb({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <>
      {!loaded && <div className={styles.skeletonItem} style={{ position: 'absolute', inset: 0 }} />}
      <img
        src={src}
        alt={alt}
        className={className}
        style={loaded ? undefined : { opacity: 0 }}
        onLoad={() => setLoaded(true)}
      />
    </>
  )
}

export default function MediaPickerLibrary({ files, selected, mediaType, isPending, provider, onSelect }: Props) {
  return (
    <div className={styles.library}>
      {isPending && (
        <div className={styles.grid}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={styles.skeletonItem} />
          ))}
        </div>
      )}
      {!isPending && files.length === 0 && (
        <p className="admin-hint">Aucun fichier dans ce dossier.</p>
      )}
      {!isPending && (
        <div className={styles.grid}>
          {files.map(path => {
            const url = provider.getUrl(path, { width: 150, height: 150 })
            const isSelected = path === selected
            return (
              <button
                key={path}
                type="button"
                className={`${styles.item}${isSelected ? ` ${styles.itemSelected}` : ''}`}
                onClick={() => onSelect(path)}
                title={path.split('/').pop()}
                style={{ position: 'relative' }}
              >
                {mediaType === 'image' ? (
                  <ImageThumb src={url} alt={path} className={styles.itemThumb} />
                ) : (
                  <span className={styles.filename}>{path.split('/').pop()}</span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
