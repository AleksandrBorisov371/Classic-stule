'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Hero from '@/components/sections/Hero'
import Invitation from '@/components/sections/Invitation'
import Story from '@/components/sections/Story'
import EventDetails from '@/components/sections/EventDetails'
import Program from '@/components/sections/Program'
import DressCode from '@/components/sections/DressCode'
import Wishes from '@/components/sections/Wishes'
import Gifts from '@/components/sections/Gifts'
import RSVP from '@/components/sections/RSVP'
import Gallery from '@/components/sections/Gallery'
import Organizer from '@/components/sections/Organizer'
import Calendar from '@/components/sections/Calendar'
import FinalBlock from '@/components/sections/FinalBlock'
import MusicPlayer from '@/components/MusicPlayer'
import MobilePreviewButton from '@/components/MobilePreviewButton'
import SideNavigation from '@/components/SideNavigation'
import { ContentData } from '@/lib/types'

export default function Home() {
  const [content, setContent] = useState<ContentData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        setContent(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error loading content:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cream via-white to-rose/20">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="relative w-20 h-20 mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 border-4 border-gold/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-gold rounded-full"></div>
          </motion.div>
          <motion.p 
            className="text-gray-700 font-semibold text-lg"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Загрузка...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Ошибка загрузки контента</p>
      </div>
    )
  }

  // Sort modules by order
  const sortedModules = Object.entries(content.modules)
    .filter(([_, module]) => module.enabled)
    .sort(([_, a], [__, b]) => (a.order || 0) - (b.order || 0))

  // Module labels mapping
  const moduleLabels: Record<string, string> = {
    hero: 'Главная',
    invitation: 'Приглашение',
    story: 'История',
    eventDetails: 'Детали',
    program: 'Программа',
    dressCode: 'Дресс-код',
    wishes: 'Пожелания',
    gifts: 'Подарки',
    rsvp: 'RSVP',
    gallery: 'Галерея',
    organizer: 'Организатор',
    calendar: 'Календарь',
    finalBlock: 'Финальный блок',
  }

  // Prepare navigation modules
  const navigationModules = sortedModules.map(([key]) => ({
    key,
    label: moduleLabels[key] || key,
    id: key === 'eventDetails' ? 'eventDetails' : key,
  }))

  return (
    <main className="min-h-screen">
      <SideNavigation modules={navigationModules} />
      {sortedModules.map(([key, module]) => {
        const props = { data: module.data }
        switch (key) {
          case 'hero':
            return <Hero key={key} {...props} />
          case 'invitation':
            return <Invitation key={key} {...props} />
          case 'story':
            return <Story key={key} {...props} />
          case 'eventDetails':
            return <EventDetails key={key} {...props} />
          case 'program':
            return <Program key={key} {...props} />
          case 'dressCode':
            return <DressCode key={key} {...props} />
          case 'wishes':
            return <Wishes key={key} {...props} />
          case 'gifts':
            return <Gifts key={key} {...props} />
          case 'rsvp':
            return <RSVP key={key} {...props} />
          case 'gallery':
            return <Gallery key={key} {...props} />
          case 'organizer':
            return <Organizer key={key} {...props} />
          case 'calendar':
            return <Calendar key={key} {...props} />
          case 'finalBlock':
            return <FinalBlock key={key} {...props} />
          default:
            return null
        }
      })}
      <MusicPlayer url={content.music?.url || ''} enabled={content.music?.enabled || false} />
      <MobilePreviewButton enabled={content.mobilePreviewButton?.enabled || false} />
    </main>
  )
}


