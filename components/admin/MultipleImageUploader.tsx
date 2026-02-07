'use client'

import { useState, useRef } from 'react'

interface MultipleImageUploaderProps {
  values: string[]
  onChange: (urls: string[]) => void
  label?: string
  placeholder?: string
}

export default function MultipleImageUploader({
  values,
  onChange,
  label,
  placeholder = 'https://example.com/img1.jpg, https://example.com/img2.jpg',
}: MultipleImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setError('')
    setUploading(true)

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Ошибка загрузки')
        }

        const data = await response.json()
        return data.url
      })

      const newUrls = await Promise.all(uploadPromises)
      onChange([...values, ...newUrls])
    } catch (err: any) {
      setError(err.message || 'Ошибка при загрузке файлов')
      console.error('Upload error:', err)
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveImage = (index: number) => {
    const newValues = [...values]
    newValues.splice(index, 1)
    onChange(newValues)
  }

  const handleUrlInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const urls = e.target.value
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    onChange(urls)
  }

  return (
    <div className="space-y-2">
      {label && <label className="block font-semibold mb-2">{label}</label>}
      
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            onChange={handleFileSelect}
            multiple
            className="hidden"
          />
          
          <button
            type="button"
            onClick={handleUploadClick}
            disabled={uploading}
            className={`px-4 py-2 rounded border ${
              uploading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            } transition-colors`}
          >
            {uploading ? 'Загрузка...' : 'Загрузить фото'}
          </button>
          
          <span className="text-gray-500 self-center">или</span>
          
          <span className="text-sm text-gray-600 self-center">введите URL через запятую</span>
        </div>

        <textarea
          value={values.join(', ')}
          onChange={handleUrlInput}
          rows={3}
          className="w-full px-4 py-2 border rounded"
          placeholder={placeholder}
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {values.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-semibold mb-2">Загруженные изображения ({values.length}):</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {values.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded border"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Удалить"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


