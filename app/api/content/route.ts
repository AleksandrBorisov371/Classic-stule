import { NextResponse } from 'next/server'
import { getContent, saveContent } from '@/lib/storage'
import { ContentData } from '@/lib/types'

export async function GET() {
  try {
    const content = getContent()
    // Убеждаемся, что content не null/undefined
    if (!content) {
      throw new Error('Content is null')
    }
    return NextResponse.json(content)
  } catch (error) {
    console.error('Error fetching content:', error)
    // На Vercel файловое хранилище может быть недоступно
    // getContent() должен вернуть defaultContent в любом случае
    // Но на всякий случай делаем дополнительную проверку
    // Исправление для работы на Vercel serverless
    const fallbackContent = getContent()
    return NextResponse.json(fallbackContent || {
      modules: {},
      music: { enabled: false, url: '' },
      mobilePreviewButton: { enabled: true },
      rsvpResponses: []
    })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const content = body as ContentData
    saveContent(content)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving content:', error)
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 })
  }
}

// Vercel deployment fix