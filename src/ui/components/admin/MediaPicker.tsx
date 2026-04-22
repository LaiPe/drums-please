'use client'

import { useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { createStorageProvider } from '@/lib/data/storage'
import { listMediaFiles, uploadMediaFile } from '@/lib/actions/storageActions'

type MediaType = 'image' | 'video'
type Tab = 'library' | 'upload'

type Props = {
  mediaType: MediaType
  name: string
  defaultValue?: string
  // Prefix for uploaded files — pass the current slug value to avoid name collisions.
  // Files will be stored as `<folder>/<filename>`. If omitted, files go to bucket root.
  folder?: string
}

const BUCKETS: Record<MediaType, string> = {
  image: 'images',
  video: 'videos',
}

const ACCEPT: Record<MediaType, string> = {
  image: 'image/*',
  video: 'video/*',
}

export default function MediaPicker({ mediaType, name, defaultValue, folder }: Props) {
  const [tab, setTab] = useState<Tab>('library')
  const [files, setFiles] = useState<string[]>([])
  const [selected, setSelected] = useState<string>(defaultValue ?? '')
  const [isPending, startTransition] = useTransition()
  const [uploadError, setUploadError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const provider = useMemo(() => createStorageProvider(BUCKETS[mediaType]), [mediaType])

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

  const MAX_SIZE_MB = 10
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

  async function handleUpload() {
    setUploadError('')
    const file = fileInputRef.current?.files?.[0]
    if (!file) return
    if (file.size > MAX_SIZE_BYTES) {
      setUploadError(`Le fichier dépasse la limite de ${MAX_SIZE_MB} Mo (${(file.size / 1024 / 1024).toFixed(1)} Mo).`)
      return
    }
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
      if (fileInputRef.current) fileInputRef.current.value = ''
    })
  }

  const previewUrl = selected ? provider.getUrl(selected, { width: 80, height: 80 }) : null

  return (
    <div className="admin-media-picker">
      {/* Hidden input carrying the selected path into the parent form */}
      <input type="hidden" name={name} value={selected} />

      {/* Selected preview */}
      {selected && (
        <div className="admin-media-preview">
          {mediaType === 'image' && previewUrl && (
            <img src={previewUrl} alt="Sélection" className="admin-media-thumb" />
          )}
          <span className="admin-media-path">{selected}</span>
          <button type="button" className="admin-media-clear" onClick={() => setSelected('')}>
            ✕
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="admin-media-tabs">
        <button
          type="button"
          className={`admin-media-tab${tab === 'library' ? ' admin-media-tab--active' : ''}`}
          onClick={() => setTab('library')}
        >
          Bibliothèque
        </button>
        <button
          type="button"
          className={`admin-media-tab${tab === 'upload' ? ' admin-media-tab--active' : ''}`}
          onClick={() => setTab('upload')}
        >
          Uploader
        </button>
      </div>

      {/* Library */}
      {tab === 'library' && (
        <div className="admin-media-library">
          {isPending && <p className="admin-hint">Chargement…</p>}
          {!isPending && files.length === 0 && (
            <p className="admin-hint">Aucun fichier dans ce dossier.</p>
          )}
          <div className="admin-media-grid">
            {files.map(path => {
              const url = provider.getUrl(path, { width: 80, height: 80 })
              const isSelected = path === selected
              return (
                <button
                  key={path}
                  type="button"
                  className={`admin-media-item${isSelected ? ' admin-media-item--selected' : ''}`}
                  onClick={() => handleSelect(path)}
                  title={path}
                >
                  {mediaType === 'image' ? (
                    <img src={url} alt={path} className="admin-media-thumb" />
                  ) : (
                    <span className="admin-media-filename">{path.split('/').pop()}</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Upload */}
      {tab === 'upload' && (
        <div className="admin-media-upload">
          <div className="admin-field">
            <label className="admin-label" htmlFor="media-file">Fichier</label>
            <input
              ref={fileInputRef}
              id="media-file"
              type="file"
              accept={ACCEPT[mediaType]}
              className="admin-input"
            />
            {folder && <span className="admin-hint">Sera stocké dans : <code>{folder}/</code></span>}
          </div>
          {uploadError && <p className="admin-error">{uploadError}</p>}
          <div className="admin-form-actions">
            <button type="button" className="admin-btn-submit" disabled={isPending} onClick={handleUpload}>
              {isPending ? 'Upload en cours…' : 'Uploader'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
