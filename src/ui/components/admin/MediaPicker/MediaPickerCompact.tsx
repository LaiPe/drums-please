import styles from './MediaPicker.module.css'
import { MediaType } from './types'
import MediaPickerUpload from './MediaPickerUpload'

type Props = {
  selected: string
  previewUrl: string | null
  mediaType: MediaType
  isPending: boolean
  uploadError: string
  onUploadError: (msg: string) => void
  onUpload: (file: File) => void
  onOpenModal: () => void
  onClear: () => void
}

export default function MediaPickerCompact({
  selected, previewUrl, mediaType, isPending, uploadError,
  onUploadError, onUpload, onOpenModal, onClear,
}: Props) {
  if (selected) {
    return (
      <div className={styles.compactPreview}>
        {mediaType === 'image' && previewUrl && (
          <img src={previewUrl} alt="Média sélectionné" className={styles.compactThumb} />
        )}
        <span className={styles.compactPath}>{selected.split('/').pop()}</span>
        <div className={styles.compactActions}>
          <button type="button" className={styles.modifyBtn} onClick={onOpenModal}>
            Modifier
          </button>
          <button type="button" className={styles.clearBtn} onClick={onClear} title="Retirer">
            ✕
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.compactEmpty}>
      <div className={styles.compactHalf}>
        <MediaPickerUpload
          mediaType={mediaType}
          isPending={isPending}
          error={uploadError}
          onError={onUploadError}
          onUpload={onUpload}
          compact
        />
      </div>
      <div className={styles.compactDivider} />
      <div className={styles.compactHalf}>
        <button type="button" className={styles.libraryBtn} onClick={onOpenModal}>
          <span className={styles.libraryBtnIcon}>⊞</span>
          <span>Bibliothèque</span>
        </button>
      </div>
    </div>
  )
}
