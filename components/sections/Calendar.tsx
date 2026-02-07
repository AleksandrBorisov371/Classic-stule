'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarData } from '@/lib/types'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns'

interface CalendarProps {
  data: CalendarData
}

export default function Calendar({ data }: CalendarProps) {
  const weddingDate = new Date(data.weddingDate)
  const [currentMonth] = useState(weddingDate)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const firstDayOfWeek = monthStart.getDay()
  const daysBeforeMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

  return (
    <section id="calendar" className="py-20 px-4 bg-gradient-to-b from-cream to-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="font-display text-4xl md:text-5xl text-center text-gray-800 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {data.title || 'Календарь'}
        </motion.h2>
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-gold/10 hover:border-gold/30 hover:shadow-2xl transition-all duration-300"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl md:text-3xl text-gray-800 mb-2">
              {format(currentMonth, 'LLLL yyyy')}
            </h3>
          </div>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
              <div key={day} className="text-center font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: daysBeforeMonth }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square"></div>
            ))}
            {daysInMonth.map((day) => {
              const isWeddingDay = isSameDay(day, weddingDate)
              return (
                <motion.div
                  key={day.toISOString()}
                  className={`aspect-square flex items-center justify-center rounded-lg transition-all cursor-pointer ${
                    isWeddingDay
                      ? 'bg-gradient-to-br from-gold to-yellow-500 text-white font-bold shadow-xl'
                      : isSameMonth(day, currentMonth)
                      ? 'bg-cream/50 text-gray-700 hover:bg-cream hover:shadow-md'
                      : 'text-gray-400'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: isWeddingDay ? 1.15 : 1.1,
                    rotate: isWeddingDay ? 5 : 0
                  }}
                  animate={isWeddingDay ? {
                    boxShadow: [
                      '0 0 20px rgba(212,175,55,0.5)',
                      '0 0 30px rgba(212,175,55,0.8)',
                      '0 0 20px rgba(212,175,55,0.5)',
                    ]
                  } : {}}
                  transition={isWeddingDay ? {
                    duration: 0.3,
                    delay: 0.1,
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  } : {
                    duration: 0.3,
                    delay: 0.1
                  }}
                >
                  {format(day, 'd')}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

