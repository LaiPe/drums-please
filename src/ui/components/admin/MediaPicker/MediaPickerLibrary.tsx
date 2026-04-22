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

export default function MediaPickerLibrary({ files, selected, mediaType, isPending, provider, onSelect }: Props) {
  return (
    <div className={styles.library}>
      {isPending && <p className="admin-hint">Chargement…</p>}
      {!isPending && files.length === 0 && (
        <p className="admin-hint">Aucun fichier dans ce dossier.</p>
      )}
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
            >
              {mediaType === 'image' ? (
                <img src={url} alt={path} className={styles.itemThumb} />
              ) : (
                <span className={styles.filename}>{path.split('/').pop()}</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
