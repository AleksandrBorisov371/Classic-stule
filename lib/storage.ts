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
          groomName: 'Артём',
          brideName: 'Валерия',
          weddingDate: '2026-07-15',
          backgroundImage: '/images/1769357436952-jbffvk6md1h.png',
          showCountdown: true
        },
        order: 1
      },
      invitation: {
        enabled: true,
        data: {
          title: 'Дорогие друзья и близкие!',
          text: 'Мы рады пригласить вас разделить с нами самый важный день в нашей жизни — день нашей свадьбы!'
        },
        order: 2
      },
      story: {
        enabled: true,
        data: {
          title: 'Наша история',
          text: 'Мы встретились... и с тех пор каждый день становится особенным.',
          images: [
            '/images/1769357307827-9n3pp8bm0z.png',
            '/images/1769357307806-ecs7hfbowd.png',
            '/images/1769357307815-8goefi839l.png',
            '/images/1769357307820-va5kfois64.png'
          ],
          showTimeline: false
        },
        order: 3
      },
      eventDetails: {
        enabled: true,
        data: {
          date: '2026-06-15',
          time: '16:00',
          address: 'Адрес мероприятия 1',
          mapUrl: 'https://yandex.ru/maps/-/CLHXvI8S',
          events: [
            {
              title: 'Церемония бракосочетания',
              date: '2026-07-16',
              time: '15:30',
              address: 'Drozdy Club (Дрозды клуб)',
              mapUrl: 'https://yandex.by/maps/29630/minsk-district/?ll=27.447592%2C53.954722&source=serp_navig&z=18.48'
            },
            {
              title: 'Начало банкета',
              date: '2026-07-16',
              time: '18:00',
              address: 'Drozdy Club (Дрозды клуб)',
              mapUrl: 'https://yandex.by/maps/29630/minsk-district/?ll=27.447592%2C53.954722&source=serp_navig&z=18.48'
            }
          ],
          title: 'Детали мероприятия'
        },
        order: 4
      },
      program: {
        enabled: true,
        data: {
          items: [
            {
              time: '14:00',
              title: 'Сбор гостей',
              description: 'Прибытие на площадку, welcome-зона с напитками и лёгкими закусками. Неспешное общение в ожидании главного события.',
              icon: 'gathering'
            },
            {
              time: '15:30',
              title: 'Церемония бракосочетания',
              description: 'Самый волнительный и трогательный момент нашего дня. Будем рады видеть вас свидетелями наших обещаний друг другу.',
              icon: 'ring'
            },
            {
              time: '16:30',
              title: 'Поздравления и фуршет',
              description: 'Первые тосты, объятия, цветы и шампанское в честь новой семьи. Фото на память с каждым гостем.',
              icon: 'buffet'
            },
            {
              time: '18:00',
              title: 'Начало банкета',
              description: 'Приглашаем к праздничному столу. Официальные приветственные речи родителей и друзей.',
              icon: 'toast'
            },
            {
              time: '19:30',
              title: 'Первый танец',
              description: 'Наше первое выступление в качестве мужа и жены. После него танцпол открыт для всех!',
              icon: 'dance'
            },
            {
              time: '20:00',
              title: 'Шоу-программа и интерактив',
              description: 'Развлекательные конкурсы для гостей, сюрпризы, выступления артистов — скучать не придётся.',
              icon: 'show'
            },
            {
              time: '21:00',
              title: 'Традиции: разрезание торта и бросание букета',
              description: 'Сладкая кульминация вечера и передача счастливой эстафеты.',
              icon: 'cake'
            },
            {
              time: '22:00',
              title: 'Свободный банкет и танцы до упаду',
              description: 'Время для душевных разговоров, вкусных угощений и, конечно, зажигательных танцев под лучшие хиты.',
              icon: 'music'
            },
            {
              time: '23:30',
              title: 'Финальный аккорд: фейерверк или салют из хлопушек',
              description: 'Яркая эмоция на память для всех гостей.',
              icon: 'fireworks'
            },
            {
              time: '00:00',
              title: 'Окончание официальной части',
              description: 'Для тех, кто полон сил, праздник может продолжиться в неформальной обстановке. Для остальных организован трансфер.',
              icon: 'transfer'
            }
          ]
        },
        order: 5
      },
      dressCode: {
        enabled: true,
        data: {
          title: 'Dress Code для гостей',
          description: 'Мы будем рады видеть вас в элегантных нарядах в пастельных тонах',
          colors: [
            '#2F4F4F',
            '#F5F1EB',
            '#C2A38B',
            '#D8CFC4'
          ],
          womenPhoto: '/images/1769357797542-6g67l2pcy34.png',
          menDescription: 'Мы будем рады видеть вас в классических костюмах',
          menTitle: 'Dress Code для мужчин',
          menPhoto: '/images/1769357827706-s6vbbpqyf0n.png',
          menColors: [
            '#2B2E34',
            '#4A4F55',
            '#8C8578',
            '#C2B8A3'
          ],
          womenTitle: 'Dress Code для девушек'
        },
        order: 6
      },
      wishes: {
        enabled: true,
        data: {
          text: 'Просим вас не дарить нам в день\nпраздника цветы -\nмы не успеем насладиться\nих красотой до нашего отъезда.\nМожно придумать любую альтернативу\nбукету или заменить бутылочкой\nдля нашего бара.\n\nВ связи с особенностями площадки и\nограниченным количеством мест\nмы празднуем этот день только\nсо взрослыми гостями.\nНадеемся на ваше понимание!'
        },
        order: 7
      },
      gifts: {
        enabled: true,
        data: {
          text: 'Не ломайте голову над подарком-мы подготовили для вас вишлист, где вы можете выбрать из списка нужные нам подарки.',
          wishlistUrl: 'https://followish.io/mywishlist/u120u1tqshrvnt',
          buttonText: 'ОТКРЫТЬ'
        },
        order: 8
      },
      rsvp: {
        enabled: true,
        data: {
          title: 'Подтвердите ваше присутствие',
          subtitle: 'Пожалуйста, сообщите нам, сможете ли вы разделить с нами этот день',
          commentLabel: ''
        },
        order: 9
      },
      gallery: {
        enabled: true,
        data: {
          text: 'После свадьбы мы разместим видео и фотографии. Вы сможете посмотреть их и поделиться своими в нашем телеграм канале.',
          telegramUrl: 'https://t.me/priglashenie_na_svadby',
          buttonText: 'ОТКРЫТЬ',
          images: [
            '/images/1769357351111-08yo80uooqo.png',
            '/images/1769357351119-11ppkv4fkeue.png',
            '/images/1769357351124-9hzvcyi2e2f.png',
            '/images/1769357351134-kevufb94g4.png',
            '/images/1769357351139-5fri1sy04q9.png',
            '/images/1769357351128-stcc0p7wrxl.png',
            '/images/1769357351173-xehggxh1yq.png',
            '/images/1769357351176-url5vdskgnf.png'
          ]
        },
        order: 10
      },
      organizer: {
        enabled: true,
        data: {
          title: 'Наш организатор!',
          text: 'В случае возникновения вопросов в день торжества, обращайтесь к нашему свадебному организатору',
          name: 'Борисова Алёна',
          phone: '+375 (44) 771-41-41',
          photo: '/images/1769357860832-q97eugog84s.png'
        },
        order: 11
      },
      calendar: {
        enabled: true,
        data: {
          title: 'До встречи!',
          weddingDate: '2026-07-16'
        },
        order: 13
      },
      finalBlock: {
        enabled: true,
        data: {
          title: 'С нетерпением ждём встречи с вами!',
          signature: 'С любовью, Артём и Валерия',
          backgroundImage: '/images/1769357458070-o2lex54anli.png'
        },
        order: 12
      }
    },
    music: {
      enabled: true,
      url: 'https://cs23-1v4.vkuseraudio.net/s/v1/ac/F9VkjqAGR5dVGRFH_0lnqx2gHmblo3f_h9HmPgKlnekC6Hq0q4RjrOgeAcBKjILq9sXge0oZ-dbrrcJvNOxBHrXGUUd4YtkI6uRo0mNsjrCnySVXk4jeuvVAg0_6eWAJ8pLabrRKKOymnmcAhvazpRxOl0gf7oEDfZV4MsWwcCKqSno/index.m3u8?siren=1'
    },
    mobilePreviewButton: {
      enabled: true
    },
    rsvpResponses: [

    ]
  } as ContentData

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
