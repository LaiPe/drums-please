import styles from './MediaPicker.module.css'
import { MediaType } from './types'

type Props = {
  selected: string
  mediaType: MediaType
  previewUrl: string | null
  onClear: () => void
}

export default function MediaPickerPreview({ selected, mediaType, previewUrl, onClear }: Props) {
  return (
    <div className={styles.preview}>
      {mediaType === 'image' && previewUrl && (
        <img src={previewUrl} alt="Sélection" className={styles.previewThumb} />
      )}
      <span className={styles.previewPath}>{selected}</span>
      <button type="button" className={styles.clearBtn} onClick={onClear} title="Retirer la sélection">
        ✕
      </button>
    </div>
  )
}
