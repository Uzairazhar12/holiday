import { useRef, useState } from 'react'
import { uploadMultipleFiles } from '@/api/s3'
import { Button } from '@/components/ui/button'
import { notify } from '@/utils/notify'

export function ImageUploader({
  folder = 'tours',
  value = [],
  onChange,
  label = 'Images',
}) {
  const inputRef = useRef(null)
  const [busy, setBusy] = useState(false)

  const handleFiles = async (files) => {
    if (!files?.length) return
    setBusy(true)
    try {
      const urls = await uploadMultipleFiles(files, folder)
      onChange([...(value || []), ...urls])
      notify({ title: 'Upload complete', description: `${urls.length} file(s) ready.` })
    } catch (e) {
      notify({
        variant: 'destructive',
        title: 'Upload failed',
        description: e.message || 'Check AWS / presign configuration.',
      })
    } finally {
      setBusy(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const removeAt = (idx) => {
    const next = [...(value || [])]
    next.splice(idx, 1)
    onChange(next)
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
        >
          {busy ? 'Uploading…' : 'Add images'}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {(value || []).map((url, idx) => (
          <div
            key={url + idx}
            className="relative overflow-hidden rounded-md border border-border"
          >
            <img src={url} alt="" className="aspect-video w-full object-cover" />
            <button
              type="button"
              className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white"
              onClick={() => removeAt(idx)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted">
        Uses AWS S3 when credentials or presign URL are configured — otherwise falls back to
        temporary browser URLs for local previews.
      </p>
    </div>
  )
}
