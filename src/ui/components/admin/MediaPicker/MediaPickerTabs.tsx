import styles from './MediaPicker.module.css'
import { Tab } from './types'

type Props = {
  tab: Tab
  onChange: (tab: Tab) => void
}

export default function MediaPickerTabs({ tab, onChange }: Props) {
  return (
    <div className={styles.tabs}>
      <button
        type="button"
        className={`${styles.tab}${tab === 'library' ? ` ${styles.tabActive}` : ''}`}
        onClick={() => onChange('library')}
      >
        Bibliothèque
      </button>
      <button
        type="button"
        className={`${styles.tab}${tab === 'upload' ? ` ${styles.tabActive}` : ''}`}
        onClick={() => onChange('upload')}
      >
        Uploader
      </button>
    </div>
  )
}
