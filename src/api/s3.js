import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { apiClient } from '@/api/axios'

/**
 * Production: call your backend (VITE_S3_PRESIGN_URL) to obtain a short-lived PUT URL.
 * Dev fallback: optional direct PutObject when static AWS keys are present (not for public production sites).
 */
export async function uploadPublicFile({
  file,
  folder = 'tours',
  keyPrefix = '',
}) {
  const presignUrl = import.meta.env.VITE_S3_PRESIGN_URL

  if (presignUrl) {
    const { data } = await apiClient.post(presignUrl, {
      fileName: file.name,
      contentType: file.type,
      folder,
    })
    const uploadUrl = data.url || data.uploadUrl
    const fields = data.fields
    if (fields) {
      const form = new FormData()
      Object.entries(fields).forEach(([k, v]) => form.append(k, v))
      form.append('file', file)
      await fetch(data.url, { method: 'POST', body: form })
      return data.publicUrl || data.Location || `${data.baseUrl}/${data.key}`
    }
    await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type || 'application/octet-stream' },
      body: file,
    })
    return data.publicUrl || data.key
  }

  const region = import.meta.env.VITE_AWS_REGION
  const bucket = import.meta.env.VITE_AWS_S3_BUCKET
  const accessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID
  const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY

  if (!region || !bucket || !accessKeyId || !secretAccessKey) {
    return URL.createObjectURL(file)
  }

  const client = new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  })

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const key = `${folder}/${keyPrefix}${Date.now()}-${safeName}`

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: file,
      ContentType: file.type || 'application/octet-stream',
    }),
  )

  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`
}

export async function uploadMultipleFiles(files, folder = 'tours') {
  const list = Array.from(files || [])
  const urls = []
  for (const file of list) {
    urls.push(await uploadPublicFile({ file, folder }))
  }
  return urls
}
