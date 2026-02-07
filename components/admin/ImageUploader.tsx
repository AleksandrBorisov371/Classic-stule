'use client'

import { useState, useRef } from 'react'

interface ImageUploaderProps {
  value: string
  onChange: (url: string) => void
  label?: string
  placeholder?: string
  multiple?: boolean
  onMultipleChange?: (urls: string[]) => void
}

export default function ImageUploader({
  value,
  onChange,
  label,
  placeholder = 'https://example.com/image.jpg',
  multiple = false,
  onMultipleChange,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setError('')
    setUploading(true)

    try {
      if (multiple && onMultipleChange) {
        // Загрузка нескольких файлов
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

        const urls = await Promise.all(uploadPromises)
        onMultipleChange(urls)
      } else {
        // Загрузка одного файла
        const file = files[0]
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
        onChange(data.url)
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка при загрузке файла')
      console.error('Upload error:', err)
    } finally {
      setUploading(false)
      // Сброс input для возможности повторной загрузки того же файла
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-2">
      {label && <label className="block font-semibold mb-2">{label}</label>}
      
      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          onChange={handleFileSelect}
          multiple={multiple}
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
          {uploading ? 'Загрузка...' : multiple ? 'Загрузить фото' : 'Загрузить фото'}
        </button>
        
        <span className="text-gray-500 self-center">или</span>
        
        <input
          type="text"
          value={multiple ? '' : value || ''}
          onChange={(e) => !multiple && onChange(e.target.value)}
          className="flex-1 px-4 py-2 border rounded"
          placeholder={placeholder}
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {!multiple && value && (
        <div className="mt-2">
          <img
            src={value}
            alt="Preview"
            className="max-w-full h-auto max-h-48 rounded border"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        </div>
      )}
    </div>
  )
}


