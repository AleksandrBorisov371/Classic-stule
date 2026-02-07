'use client'

import { useState, useEffect } from 'react'
import { ContentData } from '@/lib/types'
import ModuleEditor from './ModuleEditor'
import RSVPList from './RSVPList'

export default function AdminDashboard() {
  const [content, setContent] = useState<ContentData | null>(null)
  const [localContent, setLocalContent] = useState<ContentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'modules' | 'rsvp' | 'music' | 'settings'>('modules')
  const [saving, setSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const response = await fetch('/api/content')
      const data = await response.json()
      setContent(data)
      setLocalContent(data)
    } catch (error) {
      console.error('Error loading content:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!localContent) return
    setSaving(true)
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(localContent),
      })
      if (response.ok) {
        setContent(localContent)
        setHasChanges(false)
        alert('Изменения сохранены!')
      } else {
        alert('Ошибка при сохранении')
      }
    } catch (error) {
      console.error('Error saving content:', error)
      alert('Ошибка при сохранении')
    } finally {
      setSaving(false)
    }
  }

  const handleToggleModule = (moduleKey: string) => {
    if (!localContent) return
    const updatedContent = {
      ...localContent,
      modules: {
        ...localContent.modules,
        [moduleKey]: {
          ...localContent.modules[moduleKey as keyof typeof localContent.modules],
          enabled: !localContent.modules[moduleKey as keyof typeof localContent.modules].enabled,
        },
      },
    }
    setLocalContent(updatedContent)
    setHasChanges(true)
  }

  const handleModuleUpdate = (moduleKey: string, data: any) => {
    if (!localContent) return
    const updatedContent = {
      ...localContent,
      modules: {
        ...localContent.modules,
        [moduleKey]: {
          ...localContent.modules[moduleKey as keyof typeof localContent.modules],
          data,
        },
      },
    }
    setLocalContent(updatedContent)
    setHasChanges(true)
  }

  const handleOrderChange = (moduleKey: string, newOrder: number) => {
    if (!localContent) return
    const updatedContent = {
      ...localContent,
      modules: {
        ...localContent.modules,
        [moduleKey]: {
          ...localContent.modules[moduleKey as keyof typeof localContent.modules],
          order: newOrder,
        },
      },
    }
    setLocalContent(updatedContent)
    setHasChanges(true)
  }

  const handleMusicUpdate = (music: { enabled: boolean; url: string }) => {
    if (!localContent) return
    const updatedContent = {
      ...localContent,
      music,
    }
    setLocalContent(updatedContent)
    setHasChanges(true)
  }

  const handleMobilePreviewButtonUpdate = (mobilePreviewButton: { enabled: boolean }) => {
    if (!localContent) return
    const updatedContent = {
      ...localContent,
      mobilePreviewButton,
    }
    setLocalContent(updatedContent)
    setHasChanges(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Ошибка загрузки контента</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="font-display text-2xl text-gray-800">Админ-панель</h1>
            <button
              onClick={() => {
                sessionStorage.removeItem('admin_auth')
                window.location.href = '/admin'
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Выйти
            </button>
          </div>
          <div className="flex justify-between items-center border-t">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('modules')}
                className={`px-4 py-2 border-b-2 ${
                  activeTab === 'modules'
                    ? 'border-gold text-gold'
                    : 'border-transparent text-gray-600'
                }`}
              >
                Модули
              </button>
              <button
                onClick={() => setActiveTab('music')}
                className={`px-4 py-2 border-b-2 ${
                  activeTab === 'music'
                    ? 'border-gold text-gold'
                    : 'border-transparent text-gray-600'
                }`}
              >
                Музыка
              </button>
              <button
                onClick={() => setActiveTab('rsvp')}
                className={`px-4 py-2 border-b-2 ${
                  activeTab === 'rsvp'
                    ? 'border-gold text-gold'
                    : 'border-transparent text-gray-600'
                }`}
              >
                RSVP ({content.rsvpResponses.length})
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 border-b-2 ${
                  activeTab === 'settings'
                    ? 'border-gold text-gold'
                    : 'border-transparent text-gray-600'
                }`}
              >
                Настройки
              </button>
            </div>
            {hasChanges && (
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 bg-gold text-white rounded hover:bg-opacity-90 disabled:opacity-50"
              >
                {saving ? 'Сохранение...' : 'Сохранить'}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'modules' ? (
          <ModuleEditor
            content={localContent || content}
            onToggleModule={handleToggleModule}
            onModuleUpdate={handleModuleUpdate}
            onOrderChange={handleOrderChange}
            saving={saving}
          />
        ) : activeTab === 'music' ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Настройки музыки</h2>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={localContent?.music?.enabled || false}
                    onChange={(e) =>
                      handleMusicUpdate({
                        ...localContent?.music,
                        enabled: e.target.checked,
                        url: localContent?.music?.url || '',
                      })
                    }
                  />
                  <span>Включить музыку</span>
                </label>
              </div>
              <div>
                <label className="block font-semibold mb-2">URL музыки</label>
                <input
                  type="text"
                  value={localContent?.music?.url || ''}
                  onChange={(e) =>
                    handleMusicUpdate({
                      enabled: localContent?.music?.enabled || false,
                      url: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded"
                  placeholder="https://example.com/music.mp3"
                />
              </div>
            </div>
          </div>
        ) : activeTab === 'settings' ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Настройки сайта</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Кнопка предпросмотра мобильной версии</h3>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={localContent?.mobilePreviewButton?.enabled || false}
                    onChange={(e) =>
                      handleMobilePreviewButtonUpdate({
                        enabled: e.target.checked,
                      })
                    }
                  />
                  <span>Показывать кнопку "Как выглядит сайт на экране телефона"</span>
                </label>
                <p className="text-sm text-gray-600 mt-2">
                  Кнопка будет отображаться в левом нижнем углу сайта
                </p>
              </div>
            </div>
          </div>
        ) : (
          <RSVPList
            responses={content.rsvpResponses}
            onDelete={(id) => {
              // Обновляем список ответов после удаления
              loadContent()
            }}
          />
        )}
      </div>
    </div>
  )
}


