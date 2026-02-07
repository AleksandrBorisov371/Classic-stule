'use client'

import { useState } from 'react'
import { RSVPResponse } from '@/lib/types'

interface RSVPListProps {
  responses: RSVPResponse[]
  onDelete?: (id: string) => void
}

export default function RSVPList({ responses, onDelete }: RSVPListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const handleExportCSV = () => {
    const headers = ['Имя', 'Придёт', 'Количество гостей', 'Напитки', 'Пожелание', 'Комментарий', 'Дата отправки']
    const rows = responses.map((r) => [
      r.name,
      r.attending ? 'Да' : 'Нет',
      r.guestsCount.toString(),
      (r.selectedDrinks || []).join('; '),
      r.wish || '',
      r.comment || '',
      new Date(r.submittedAt).toLocaleString('ru-RU'),
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n')

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `rsvp-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот ответ?')) {
      return
    }

    setDeletingId(id)
    try {
      const response = await fetch(`/api/rsvp/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        if (onDelete) {
          onDelete(id)
        }
      } else {
        alert('Ошибка при удалении ответа')
      }
    } catch (error) {
      console.error('Error deleting RSVP:', error)
      alert('Ошибка при удалении ответа')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow p-4 mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Ответы RSVP</h2>
          <p className="text-sm text-gray-600">Всего ответов: {responses.length}</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="px-6 py-2 bg-gold text-white rounded hover:bg-opacity-90"
        >
          Экспорт в CSV
        </button>
      </div>
      {responses.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-600">
          Пока нет ответов
        </div>
      ) : (
        <div className="space-y-4">
          {responses.map((response) => (
            <div key={response.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{response.name}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(response.submittedAt).toLocaleString('ru-RU')}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      response.attending
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {response.attending ? 'Придёт' : 'Не придёт'}
                  </span>
                  <button
                    onClick={() => handleDelete(response.id)}
                    disabled={deletingId === response.id}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {deletingId === response.id ? 'Удаление...' : 'Удалить'}
                  </button>
                </div>
              </div>
              {response.attending && (
                <>
                  <p className="text-gray-700 mb-2">
                    <strong>Количество гостей:</strong> {response.guestsCount}
                  </p>
                  {response.selectedDrinks && response.selectedDrinks.length > 0 && (
                    <p className="text-gray-700 mb-2">
                      <strong>Напитки:</strong> {response.selectedDrinks.join(', ')}
                    </p>
                  )}
                  {response.wish && (
                    <p className="text-gray-700 mb-2">
                      <strong>Пожелание:</strong> {response.wish}
                    </p>
                  )}
                </>
              )}
              {response.comment && (
                <p className="text-gray-700">
                  <strong>Комментарий:</strong> {response.comment}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


