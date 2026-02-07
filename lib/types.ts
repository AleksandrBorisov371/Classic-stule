export interface HeroData {
  groomName: string
  brideName: string
  weddingDate: string
  backgroundImage: string
  showCountdown: boolean
}

export interface InvitationData {
  title: string
  text: string
}

export interface StoryData {
  title: string
  text: string
  images: string[]
  showTimeline: boolean
}

export interface EventDetailsData {
  title: string
  events: Array<{
    title: string
    date: string
    time: string
    address: string
    mapUrl: string
  }>
}

export interface ProgramData {
  title: string
  items: Array<{
    time: string
    title: string
    description: string
    icon: string
  }>
}

export interface DressCodeData {
  title: string
  womenTitle: string
  description: string
  colors: string[]
  womenPhoto: string
  menTitle: string
  menDescription: string
  menColors: string[]
  menPhoto: string
}

export interface WishesData {
  title: string
  text: string
}

export interface GiftsData {
  title: string
  text: string
  wishlistUrl: string
  buttonText: string
}

export interface RSVPData {
  title: string
  subtitle: string
  drinks: Array<{
    name: string
    enabled: boolean
  }>
}

export interface OrganizerData {
  title: string
  text: string
  name: string
  phone: string
  photo: string
}

export interface CalendarData {
  title: string
  weddingDate: string
}

export interface MusicData {
  enabled: boolean
  url: string
}

export interface MobilePreviewButtonData {
  enabled: boolean
}

export interface GalleryData {
  title: string
  text: string
  telegramUrl: string
  buttonText: string
  images: string[]
}

export interface FinalBlockData {
  title: string
  signature: string
  backgroundImage: string
}

export interface RSVPResponse {
  id: string
  name: string
  attending: boolean
  guestsCount: number
  comment: string
  selectedDrinks: string[]
  wish: string
  submittedAt: string
}

export interface ModuleData {
  enabled: boolean
  data: any
  order?: number
}

export interface ContentData {
  modules: {
    hero: ModuleData
    invitation: ModuleData
    story: ModuleData
    eventDetails: ModuleData
    program: ModuleData
    dressCode: ModuleData
    wishes: ModuleData
    gifts: ModuleData
    rsvp: ModuleData
    gallery: ModuleData
    organizer: ModuleData
    calendar: ModuleData
    finalBlock: ModuleData
  }
  music: MusicData
  mobilePreviewButton: MobilePreviewButtonData
  rsvpResponses: RSVPResponse[]
}

