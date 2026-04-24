'use client'

import styles from './MediaPicker.module.css'
import { MediaType } from './types'
import { StorageProvider } from '@/lib/data/storage'
import Modal from '@/ui/components/admin/modal/Modal'
import MediaPickerUpload from './MediaPickerUpload'
import MediaPickerLibrary from './MediaPickerLibrary'

type Props = {
  files: string[]
  selected: string
  mediaType: MediaType
  isPending: boolean
  provider: StorageProvider
  uploadError: string
  onUploadError: (msg: string) => void
  onUpload: (file: File) => void
  onSelect: (path: string) => void
  onDelete: (path: string) => void
  onClose: () => void
}

export default function MediaPickerModal({
  files, selected, mediaType, isPending, provider, uploadError,
  onUploadError, onUpload, onSelect, onDelete, onClose,
}: Props) {
  return (
    <Modal isOpen={true} onClose={onClose} title="Sélectionner un média" maxWidth="760px">
      <div className={styles.modalContent}>
        <div className={styles.modalUploadPanel}>
          <MediaPickerUpload
            mediaType={mediaType}
            isPending={isPending}
            error={uploadError}
            onError={onUploadError}
            onUpload={onUpload}
          />
        </div>
        <MediaPickerLibrary
          files={files}
          selected={selected}
          mediaType={mediaType}
          isPending={isPending}
          provider={provider}
          onSelect={onSelect}
          onDelete={onDelete}
        />
      </div>
    </Modal>
  )
}
