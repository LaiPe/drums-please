'use client'

import { useEffect, useMemo, useState, useTransition } from 'react'
import styles from './MediaPicker.module.css'
import { createStorageProvider } from '@/lib/data/storage'
import { listMediaFiles, uploadMediaFile } from '@/lib/actions/storageActions'
import { MediaType, Tab, BUCKETS } from './types'
import MediaPickerPreview from './MediaPickerPreview'
import MediaPickerTabs from './MediaPickerTabs'
import MediaPickerLibrary from './MediaPickerLibrary'
import MediaPickerUpload from './MediaPickerUpload'

type Props = {
  mediaType: MediaType
  name: string
  defaultValue?: string
  folder?: string
}

export default function MediaPicker({ mediaType, name, defaultValue, folder }: Props) {
  const [tab, setTab] = useState<Tab>('library')
  const [files, setFiles] = useState<string[]>([])
  const [selected, setSelected] = useState<string>(defaultValue ?? '')
  const [isPending, startTransition] = useTransition()
  const [uploadError, setUploadError] = useState<string>('')

  const provider = useMemo(() => createStorageProvider(BUCKETS[mediaType]), [mediaType])
  const previewUrl = selected ? provider.getUrl(selected, { width: 75, height: 75 }) : null

  useEffect(() => {
    startTransition(async () => {
      const list = await listMediaFiles(mediaType, folder)
      setFiles(list)
    })
  }, [mediaType, folder])

  function handleSelect(path: string) {
    setSelected(path)
    setTab('library')
  }

  function handleUpload(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    startTransition(async () => {
      const result = await uploadMediaFile(mediaType, folder, formData)
      if (result.error) {
        setUploadError(result.error)
        return
      }
      const refreshed = await listMediaFiles(mediaType, folder)
      setFiles(refreshed)
      setSelected(result.path!)
      setTab('library')
    })
  }

  return (
    <div className={styles.picker}>
      <input type="hidden" name={name} value={selected} />

      {selected && (
        <MediaPickerPreview
          selected={selected}
          mediaType={mediaType}
          previewUrl={previewUrl}
          onClear={() => setSelected('')}
        />
      )}

      <MediaPickerTabs tab={tab} onChange={setTab} />

      {tab === 'library' && (
        <MediaPickerLibrary
          files={files}
          selected={selected}
          mediaType={mediaType}
          isPending={isPending}
          provider={provider}
          onSelect={handleSelect}
        />
      )}

      {tab === 'upload' && (
        <MediaPickerUpload
          mediaType={mediaType}
          folder={folder}
          isPending={isPending}
          error={uploadError}
          onError={setUploadError}
          onUpload={handleUpload}
        />
      )}
    </div>
  )
}
