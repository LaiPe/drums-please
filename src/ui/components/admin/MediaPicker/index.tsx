'use client'

import { useEffect, useMemo, useState, useTransition } from 'react'
import { createStorageProvider } from '@/lib/data/storage'
import { listMediaFiles, uploadMediaFile, deleteMediaFile } from '@/lib/actions/storageActions'
import { MediaType, BUCKETS } from './types'
import MediaPickerCompact from './MediaPickerCompact'
import MediaPickerModal from './MediaPickerModal'

type Props = {
  mediaType: MediaType
  name: string
  defaultValue?: string
  folder?: string
}

export default function MediaPicker({ mediaType, name, defaultValue, folder }: Props) {
  const [modalOpen, setModalOpen] = useState(false)
  const [files, setFiles] = useState<string[]>([])
  const [selected, setSelected] = useState<string>(defaultValue ?? '')
  const [isPending, startTransition] = useTransition()
  const [uploadError, setUploadError] = useState('')

  const provider = useMemo(() => createStorageProvider(BUCKETS[mediaType]), [mediaType])
  const previewUrl = selected ? provider.getUrl(selected, { width: 80, height: 80 }) : null

  useEffect(() => {
    startTransition(async () => {
      const list = await listMediaFiles(mediaType, folder)
      setFiles(list)
    })
  }, [mediaType, folder])

  function handleUpload(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    startTransition(async () => {
      const result = await uploadMediaFile(mediaType, folder, formData)
      if (result.error) { setUploadError(result.error); return }
      const refreshed = await listMediaFiles(mediaType, folder)
      setFiles(refreshed)
      setSelected(result.path!)
      setModalOpen(false)
    })
  }

  function handleDelete(path: string) {
    startTransition(async () => {
      await deleteMediaFile(mediaType, path)
      const refreshed = await listMediaFiles(mediaType, folder)
      setFiles(refreshed)
      if (selected === path) setSelected('')
    })
  }

  return (
    <>
      <input type="hidden" name={name} value={selected} />
      <MediaPickerCompact
        selected={selected}
        previewUrl={previewUrl}
        mediaType={mediaType}
        isPending={isPending}
        uploadError={uploadError}
        onUploadError={setUploadError}
        onUpload={handleUpload}
        onOpenModal={() => setModalOpen(true)}
        onClear={() => setSelected('')}
      />
      {modalOpen && (
        <MediaPickerModal
          files={files}
          selected={selected}
          mediaType={mediaType}
          isPending={isPending}
          provider={provider}
          uploadError={uploadError}
          onUploadError={setUploadError}
          onUpload={handleUpload}
          onSelect={(path: string) => { setSelected(path); setModalOpen(false) }}
          onDelete={handleDelete}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}
