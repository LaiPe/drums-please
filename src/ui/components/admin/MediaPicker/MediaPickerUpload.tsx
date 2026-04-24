import { useState } from 'react'
import styles from './MediaPicker.module.css'
import { MediaType, ACCEPT, MAX_SIZE_MB, MAX_SIZE_BYTES } from './types'

type Props = {
  mediaType: MediaType
  isPending: boolean
  error: string
  compact?: boolean
  onError: (msg: string) => void
  onUpload: (file: File) => void
}

export default function MediaPickerUpload({ mediaType, isPending, error, compact, onError, onUpload }: Props) {
  const [isDragOver, setIsDragOver] = useState(false)

  function processFile(file: File) {
    onError('')
    if (file.size > MAX_SIZE_BYTES) {
      onError(`Le fichier dépasse la limite de ${MAX_SIZE_MB} Mo (${(file.size / 1024 / 1024).toFixed(1)} Mo).`)
      return
    }
    onUpload(file)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) processFile(file)
    e.target.value = ''
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) processFile(file)
  }

  const dropzoneClass = [
    styles.dropzone,
    compact ? styles.dropzoneCompact : '',
    isDragOver ? styles.dropzoneActive : '',
    isPending ? styles.dropzoneDisabled : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={styles.upload}>
      <div
        className={dropzoneClass}
        onDragOver={e => { e.preventDefault(); setIsDragOver(true) }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <span className={styles.dropzoneIcon}>↑</span>
        {!compact && (
          <span className={styles.dropzoneLabel}>
            {isPending ? 'Upload en cours…' : `Cliquer ou déposer une ${mediaType === 'image' ? 'image' : 'vidéo'}`}
          </span>
        )}
        {compact && (
          <span className={styles.dropzoneLabel}>
            {isPending ? '…' : 'Uploader'}
          </span>
        )}
        {!compact && (
          <span className={styles.dropzoneHint}>max {MAX_SIZE_MB} Mo</span>
        )}
        <input
          type="file"
          accept={ACCEPT[mediaType]}
          className={styles.fileInput}
          disabled={isPending}
          onChange={handleChange}
        />
      </div>
      {error && <p className="admin-error">{error}</p>}
    </div>
  )
}
