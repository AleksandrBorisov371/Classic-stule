'use client'

import { useState } from 'react'
import { ContentData } from '@/lib/types'
import ImageUploader from './ImageUploader'
import MultipleImageUploader from './MultipleImageUploader'

interface ModuleEditorProps {
  content: ContentData
  onToggleModule: (key: string) => void
  onModuleUpdate: (key: string, data: any) => void
  onOrderChange: (key: string, order: number) => void
  saving: boolean
}

const moduleNames: Record<string, string> = {
  hero: 'Hero-блок',
  invitation: 'Приглашение',
  story: 'История пары',
  eventDetails: 'Детали мероприятия',
  program: 'Программа дня',
  dressCode: 'Dress Code',
  wishes: 'Пожелания',
  gifts: 'Подарки',
  rsvp: 'RSVP форма',
  gallery: 'Галерея',
  organizer: 'Наш организатор',
  calendar: 'Календарь',
  finalBlock: 'Финальный блок',
}

export default function ModuleEditor({
  content,
  onToggleModule,
  onModuleUpdate,
  onOrderChange,
  saving,
}: ModuleEditorProps) {
  const [expandedModule, setExpandedModule] = useState<string | null>(null)

  const sortedModules = Object.entries(content.modules).sort(
    (a, b) => (a[1].order || 0) - (b[1].order || 0)
  )

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Управление модулями</h2>
        <p className="text-sm text-gray-600">
          Включите/выключите модули и измените их порядок отображения
        </p>
      </div>
      {sortedModules.map(([key, module]) => (
        <div key={key} className="bg-white rounded-lg shadow">
          <div className="p-4 flex items-center justify-between border-b">
            <div className="flex items-center gap-4">
              <span className="text-gray-500">#{module.order || 0}</span>
              <h3 className="font-semibold text-lg">{moduleNames[key]}</h3>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  module.enabled
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {module.enabled ? 'Включен' : 'Выключен'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={module.order || 0}
                onChange={(e) => onOrderChange(key, parseInt(e.target.value) || 0)}
                className="w-20 px-2 py-1 border rounded"
                placeholder="Порядок"
              />
              <button
                onClick={() => onToggleModule(key)}
                className={`px-4 py-2 rounded ${
                  module.enabled
                    ? 'bg-red-100 text-red-800 hover:bg-red-200'
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                }`}
              >
                {module.enabled ? 'Выключить' : 'Включить'}
              </button>
              <button
                onClick={() =>
                  setExpandedModule(expandedModule === key ? null : key)
                }
                className="px-4 py-2 bg-gold text-white rounded hover:bg-opacity-90"
              >
                {expandedModule === key ? 'Свернуть' : 'Редактировать'}
              </button>
            </div>
          </div>
          {expandedModule === key && (
            <div className="p-4 border-t">
              <ModuleForm
                moduleKey={key}
                data={module.data}
                onUpdate={(data) => onModuleUpdate(key, data)}
              />
            </div>
          )}
        </div>
      ))}
      {saving && (
        <div className="fixed bottom-4 right-4 bg-gold text-white px-6 py-3 rounded-lg shadow-lg">
          Сохранение...
        </div>
      )}
    </div>
  )
}

function ModuleForm({
  moduleKey,
  data,
  onUpdate,
}: {
  moduleKey: string
  data: any
  onUpdate: (data: any) => void
}) {
  const [formData, setFormData] = useState(data)

  const handleChange = (field: string, value: any) => {
    const updated = { ...formData, [field]: value }
    setFormData(updated)
    onUpdate(updated)
  }

  const handleArrayChange = (field: string, index: number, value: any) => {
    const updated = { ...formData }
    if (!updated[field]) updated[field] = []
    updated[field][index] = value
    setFormData(updated)
    onUpdate(updated)
  }

  const handleArrayAdd = (field: string, defaultValue: any) => {
    const updated = { ...formData }
    if (!updated[field]) updated[field] = []
    updated[field].push(defaultValue)
    setFormData(updated)
    onUpdate(updated)
  }

  const handleArrayRemove = (field: string, index: number) => {
    const updated = { ...formData }
    updated[field].splice(index, 1)
    setFormData(updated)
    onUpdate(updated)
  }

  switch (moduleKey) {
    case 'hero':
      return (
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-2">Имя жениха</label>
            <input
              type="text"
              value={formData.groomName || ''}
              onChange={(e) => handleChange('groomName', e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Имя невесты</label>
            <input
              type="text"
              value={formData.brideName || ''}
              onChange={(e) => handleChange('brideName', e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Дата свадьбы</label>
            <input
              type="date"
              value={formData.weddingDate || ''}
              onChange={(e) => handleChange('weddingDate', e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <ImageUploader
              value={formData.backgroundImage || ''}
              onChange={(url) => handleChange('backgroundImage', url)}
              label="Фоновое изображение"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.showCountdown || false}
                onChange={(e) => handleChange('showCountdown', e.target.checked)}
              />
              <span>Показывать таймер обратного отсчёта</span>
            </label>
          </div>
        </div>
      )

    case 'invitation':
      return (
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-2">Заголовок</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Текст</label>
            <textarea
              value={formData.text || ''}
              onChange={(e) => handleChange('text', e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        </div>
      )

    case 'story':
      return (
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-2">Заголовок</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Текст</label>
            <textarea
              value={formData.text || ''}
              onChange={(e) => handleChange('text', e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <MultipleImageUploader
              values={formData.images || []}
              onChange={(urls) => handleChange('images', urls)}
              label="Изображения"
              placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
            />
          </div>
        </div>
      )

    case 'eventDetails':
      return (
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-2">Заголовок модуля</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="border-t pt-4">
            <label className="block font-semibold mb-4">Мероприятия</label>
            {(formData.events || []).map((event: any, index: number) => (
              <div key={index} className="border p-4 rounded mb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Мероприятие {index + 1}</span>
                  <button
                    onClick={() => handleArrayRemove('events', index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Удалить
                  </button>
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={event.title || ''}
                    onChange={(e) =>
                      handleArrayChange('events', index, { ...event, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded"
                    placeholder="Название мероприятия"
                  />
                  <input
                    type="date"
                    value={event.date || ''}
                    onChange={(e) =>
                      handleArrayChange('events', index, { ...event, date: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded"
                  />
                  <input
                    type="time"
                    value={event.time || ''}
                    onChange={(e) =>
                      handleArrayChange('events', index, { ...event, time: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded"
                  />
                  <input
                    type="text"
                    value={event.address || ''}
                    onChange={(e) =>
                      handleArrayChange('events', index, { ...event, address: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded"
                    placeholder="Адрес"
                  />
                  <input
                    type="text"
                    value={event.mapUrl || ''}
                    onChange={(e) =>
                      handleArrayChange('events', index, { ...event, mapUrl: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded"
                    placeholder="URL карты (iframe)"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={() =>
                handleArrayAdd('events', {
                  title: '',
                  date: '',
                  time: '',
                  address: '',
                  mapUrl: '',
                })
              }
              className="px-4 py-2 bg-gold text-white rounded hover:bg-opacity-90"
            >
              + Добавить мероприятие
            </button>
          </div>
        </div>
      )

    case 'program':
      return (
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-2">Заголовок</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          {(formData.items || []).map((item: any, index: number) => (
            <div key={index} className="border p-4 rounded">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Элемент {index + 1}</span>
                <button
                  onClick={() => handleArrayRemove('items', index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Удалить
                </button>
              </div>
              <div className="space-y-2">
                <input
                  type="time"
                  value={item.time || ''}
                  onChange={(e) =>
                    handleArrayChange('items', index, { ...item, time: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Время"
                />
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={(e) =>
                    handleArrayChange('items', index, { ...item, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Название"
                />
                <input
                  type="text"
                  value={item.description || ''}
                  onChange={(e) =>
                    handleArrayChange('items', index, {
                      ...item,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Описание"
                />
                <select
                  value={item.icon || 'ring'}
                  onChange={(e) =>
                    handleArrayChange('items', index, { ...item, icon: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded"
                >
                  <option value="ring">Кольцо</option>
                  <option value="food">Еда</option>
                  <option value="cake">Торт</option>
                  <option value="music">Музыка</option>
                  <option value="photo">Фото</option>
                  <option value="toast">Тост</option>
                  <option value="car">Автомобили</option>
                  <option value="city">Прогулка по городу</option>
                  <option value="nature">Прогулка за городом</option>
                  <option value="sleep">Сон</option>
                  <option value="fireworks">Фейерверк</option>
                  <option value="arch">Выездная регистрация (арка)</option>
                  <option value="transfer">Трансфер</option>
                  <option value="dance">Танец</option>
                  <option value="gathering">Сбор гостей</option>
                  <option value="buffet">Фуршет</option>
                  <option value="show">Шоу программа</option>
                  <option value="bouquet">Летящий букет</option>
                  <option value="salute">Салют</option>
                </select>
              </div>
            </div>
          ))}
          <button
            onClick={() =>
              handleArrayAdd('items', { time: '', title: '', description: '', icon: 'ring' })
            }
            className="px-4 py-2 bg-gold text-white rounded hover:bg-opacity-90"
          >
            + Добавить элемент
          </button>
        </div>
      )

    case 'dressCode':
      return (
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-2">Заголовок</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-4">Dress Code для девушек</h3>
            <div>
              <label className="block font-semibold mb-2">Заголовок</label>
              <input
                type="text"
                value={formData.womenTitle || ''}
                onChange={(e) => handleChange('womenTitle', e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Описание</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Цвета (hex через запятую)</label>
              <input
                type="text"
                value={(formData.colors || []).join(', ')}
                onChange={(e) =>
                  handleChange(
                    'colors',
                    e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                  )
                }
                className="w-full px-4 py-2 border rounded"
                placeholder="#F5F5DC, #F5E6D3, #F4E4E1"
              />
            </div>
            <div>
              <ImageUploader
                value={formData.womenPhoto || ''}
                onChange={(url) => handleChange('womenPhoto', url)}
                label="Фото для девушек (900px ширина)"
                placeholder="https://example.com/women-dress.jpg"
              />
            </div>
          </div>
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-4">Dress Code для мужчин</h3>
            <div>
              <label className="block font-semibold mb-2">Заголовок</label>
              <input
                type="text"
                value={formData.menTitle || ''}
                onChange={(e) => handleChange('menTitle', e.target.value)}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Описание</label>
              <textarea
                value={formData.menDescription || ''}
                onChange={(e) => handleChange('menDescription', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Цвета для мужчин (hex через запятую)</label>
              <input
                type="text"
                value={(formData.menColors || []).join(', ')}
                onChange={(e) =>
                  handleChange(
                    'menColors',
                    e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                  )
                }
                className="w-full px-4 py-2 border rounded"
                placeholder="#F5F5DC, #F5E6D3, #F4E4E1"
              />
            </div>
            <div>
              <ImageUploader
                value={formData.menPhoto || ''}
                onChange={(url) => handleChange('menPhoto', url)}
                label="Фото для мужчин (900px ширина)"
                placeholder="https://example.com/men-dress.jpg"
              />
            </div>
          </div>
        </div>
      )

    case 'wishes':
      return (
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-2">Заголовок</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Текст</label>
            <textarea
              value={formData.text || ''}
              onChange={(e) => handleChange('text', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        </div>
      )

    case 'gifts':
      return (
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-2">Заголовок</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Текст</label>
            <textarea
              value={formData.text || ''}
              onChange={(e) => handleChange('text', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">URL вишлиста</label>
            <input
              type="text"
              value={formData.wishlistUrl || ''}
              onChange={(e) => handleChange('wishlistUrl', e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Текст кнопки</label>
            <input
              type="text"
              value={formData.buttonText || ''}
              onChange={(e) => handleChange('buttonText', e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        </div>
      )

    case 'rsvp':
      return (
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-2">Заголовок</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Подзаголовок</label>
            <input
              type="text"
              value={formData.subtitle || ''}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Комментарий</label>
            <textarea
              value={formData.commentLabel || ''}
              onChange={(e) => handleChange('commentLabel', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border rounded"
              placeholder="Подпись для поля комментария (необязательно)"
            />
          </div>
          <div className="border-t pt-4">
            <label className="block font-semibold mb-4">Напитки</label>
            {(formData.drinks || []).length === 0 ? (
              <p className="text-gray-500 text-sm mb-4">Напитки не добавлены</p>
            ) : (
              (formData.drinks || []).map((drink: any, index: number) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={drink.enabled || false}
                    onChange={(e) =>
                      handleArrayChange('drinks', index, { ...drink, enabled: e.target.checked })
                    }
                    className="mr-2"
                  />
                  <input
                    type="text"
                    value={drink.name || ''}
                    onChange={(e) =>
                      handleArrayChange('drinks', index, { ...drink, name: e.target.value })
                    }
                    className="flex-1 px-4 py-2 border rounded"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      )

    case 'gallery':
      return (
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-2">Заголовок</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Текст</label>
            <textarea
              value={formData.text || ''}
              onChange={(e) => handleChange('text', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">URL Telegram канала</label>
            <input
              type="text"
              value={formData.telegramUrl || ''}
              onChange={(e) => handleChange('telegramUrl', e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Текст кнопки</label>
            <input
              type="text"
              value={formData.buttonText || ''}
              onChange={(e) => handleChange('buttonText', e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <MultipleImageUploader
              values={formData.images || []}
              onChange={(urls) => handleChange('images', urls)}
              label="Изображения"
              placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
            />
          </div>
        </div>
      )

    case 'organizer':
      return (
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-2">Заголовок</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Текст</label>
            <textarea
              value={formData.text || ''}
              onChange={(e) => handleChange('text', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">ФИО</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Телефон</label>
            <input
              type="text"
              value={formData.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <ImageUploader
              value={formData.photo || ''}
              onChange={(url) => handleChange('photo', url)}
              label="Фото организатора"
              placeholder="https://example.com/organizer.jpg"
            />
          </div>
        </div>
      )

    case 'calendar':
      return (
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-2">Заголовок</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Дата свадьбы</label>
            <input
              type="date"
              value={formData.weddingDate || ''}
              onChange={(e) => handleChange('weddingDate', e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        </div>
      )

    case 'finalBlock':
      return (
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-2">Заголовок</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Подпись</label>
            <input
              type="text"
              value={formData.signature || ''}
              onChange={(e) => handleChange('signature', e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <ImageUploader
              value={formData.backgroundImage || ''}
              onChange={(url) => handleChange('backgroundImage', url)}
              label="Фоновое изображение"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
      )

    default:
      return <div>Редактор для этого модуля не реализован</div>
  }
}


