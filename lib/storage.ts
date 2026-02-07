import fs from 'fs'
import path from 'path'
import { ContentData } from './types'

const DATA_DIR = path.join(process.cwd(), 'data')
const STORAGE_FILE = path.join(DATA_DIR, 'storage.json')

// Ensure data directory exists (только если файловая система доступна для записи)
try {
  if (typeof fs !== 'undefined' && fs.existsSync && !fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
} catch (error) {
  // В serverless окружении (Vercel) это может не работать - это нормально
  console.log('Data directory creation skipped (serverless environment)')
}

// Default content structure
const defaultContent: ContentData = {
  modules: {
    hero: {
      enabled: true,
      data: {
        groomName: 'Александр',
        brideName: 'Мария',
        weddingDate: '2024-08-15',
        backgroundImage: '',
        showCountdown: true,
      },
      order: 1,
    },
    invitation: {
      enabled: true,
      data: {
        title: 'Дорогие друзья и близкие!',
        text: 'Мы рады пригласить вас разделить с нами самый важный день в нашей жизни — день нашей свадьбы!',
      },
      order: 2,
    },
    story: {
      enabled: true,
      data: {
        title: 'Наша история',
        text: 'Мы встретились... и с тех пор каждый день становится особенным.',
        images: [],
        showTimeline: false,
      },
      order: 3,
    },
    eventDetails: {
      enabled: true,
      data: {
        title: 'Детали мероприятия',
        events: [
          {
            title: 'Церемония',
            date: '2024-08-15',
            time: '16:00',
            address: 'Москва, ул. Примерная, д. 1',
            mapUrl: '',
          },
        ],
      },
      order: 4,
    },
    program: {
      enabled: true,
      data: {
        title: 'Программа дня',
        items: [
          {
            time: '16:00',
            title: 'Регистрация',
            description: 'Встреча гостей',
            icon: 'ring',
          },
          {
            time: '17:00',
            title: 'Банкет',
            description: 'Торжественный ужин',
            icon: 'food',
          },
        ],
      },
      order: 5,
    },
    dressCode: {
      enabled: true,
      data: {
        title: 'Dress Code',
        womenTitle: 'Dress Code для гостей',
        description: 'Мы будем рады видеть вас в элегантных нарядах в пастельных тонах',
        colors: ['#F5F5DC', '#F5E6D3', '#F4E4E1', '#D4AF37'],
        womenPhoto: '',
        menTitle: 'Dress Code для мужчин',
        menDescription: 'Элегантный костюм в пастельных тонах',
        menColors: ['#F5F5DC', '#F5E6D3', '#F4E4E1', '#D4AF37'],
        menPhoto: '',
      },
      order: 6,
    },
    wishes: {
      enabled: true,
      data: {
        title: 'Наши пожелания',
        text: 'Просим вас не дарить нам в день праздника цветы - мы не успеем насладиться их красотой до нашего отъезда.',
      },
      order: 7,
    },
    gifts: {
      enabled: true,
      data: {
        title: 'Подарки',
        text: 'Не ломайте голову над подарком-мы подготовили для вас вишлист, где вы можете выбрать из списка нужные нам подарки.',
        wishlistUrl: 'https://example.com/wishlist',
        buttonText: 'ОТКРЫТЬ',
      },
      order: 8,
    },
    rsvp: {
      enabled: true,
      data: {
        title: 'Подтвердите ваше присутствие',
        subtitle: 'Пожалуйста, сообщите нам, сможете ли вы разделить с нами этот день',
        drinks: [
          { name: 'Шампанское', enabled: true },
          { name: 'Вино белое', enabled: true },
          { name: 'Вино красное', enabled: true },
          { name: 'Водка', enabled: true },
          { name: 'Виски', enabled: true },
          { name: 'Текила', enabled: true },
          { name: 'Коньяк', enabled: true },
        ],
      },
      order: 9,
    },
    gallery: {
      enabled: true,
      data: {
        title: 'Галерея',
        text: 'После свадьбы мы разместим видео и фотографии. Вы сможете посмотреть их и поделиться своими в нашем телеграм канале.',
        telegramUrl: 'https://t.me/example',
        buttonText: 'ОТКРЫТЬ',
        images: [],
      },
      order: 10,
    },
    organizer: {
      enabled: true,
      data: {
        title: 'Наш организатор',
        text: 'В случае возникновения вопросов в день торжества, обращайтесь к нашему свадебному организатору',
        name: 'Марина Симонова',
        phone: '+375 (44) 777-77-77',
        photo: '',
      },
      order: 10.5,
    },
    calendar: {
      enabled: true,
      data: {
        title: 'Календарь',
        weddingDate: '2024-08-15',
      },
      order: 10.7,
    },
    finalBlock: {
      enabled: true,
      data: {
        title: 'С нетерпением ждём встречи с вами!',
        signature: 'С любовью, Александр и Мария',
        backgroundImage: '',
      },
      order: 11,
    },
  },
  music: {
    enabled: false,
    url: '',
  },
  mobilePreviewButton: {
    enabled: true,
  },
  rsvpResponses: [],
}

export function getContent(): ContentData {
  try {
    // Проверяем доступность файловой системы
    if (typeof fs !== 'undefined' && fs.existsSync && fs.readFileSync) {
      if (fs.existsSync(STORAGE_FILE)) {
        const fileContent = fs.readFileSync(STORAGE_FILE, 'utf-8')
        const content = JSON.parse(fileContent)
        // Merge with defaults to ensure all modules exist
        return {
          ...defaultContent,
          ...content,
          modules: {
            ...defaultContent.modules,
            ...content.modules,
          },
          mobilePreviewButton: {
            ...defaultContent.mobilePreviewButton,
            ...(content.mobilePreviewButton || {}),
          },
        }
      }
    }
  } catch (error) {
    // В serverless окружении (Vercel) файлы могут быть недоступны - это нормально
    // Исправление для работы на Vercel
    console.log('Using default content (file storage unavailable):', error instanceof Error ? error.message : 'unknown error')
  }
  // Всегда возвращаем defaultContent, даже если файл недоступен
  return defaultContent
}

export function saveContent(content: ContentData): void {
  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(content, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error saving storage:', error)
    throw error
  }
}

export function addRSVPResponse(response: Omit<ContentData['rsvpResponses'][0], 'id' | 'submittedAt'>): void {
  const content = getContent()
  const newResponse = {
    ...response,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
  }
  content.rsvpResponses.push(newResponse)
  saveContent(content)
}

export function deleteRSVPResponse(id: string): void {
  const content = getContent()
  content.rsvpResponses = content.rsvpResponses.filter((response) => response.id !== id)
  saveContent(content)
}

// Vercel deployment fix - исправление для работы на Vercel serverless