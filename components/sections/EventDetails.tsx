'use client'

import { motion } from 'framer-motion'
import { EventDetailsData } from '@/lib/types'
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa'

interface EventDetailsProps {
  data: EventDetailsData
}

export default function EventDetails({ data }: EventDetailsProps) {
  const events = data.events || []

  return (
    <section id="eventDetails" className="py-20 px-4 bg-gradient-to-b from-cream via-white to-cream/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          className="font-display text-4xl md:text-5xl text-center text-gray-800 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="relative inline-block">
            {data.title || 'Детали мероприятия'}
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </span>
        </motion.h2>
        {events.length > 0 ? (
          <div className="space-y-12">
            {events.map((event, index) => (
            <motion.div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-gold/10 hover:border-gold/30 hover:shadow-2xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.02,
                y: -5
              }}
            >
              {event.title && (
                <motion.h3 
                  className="font-display text-2xl md:text-3xl text-gray-800 mb-6 group-hover:text-gold transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {event.title}
                </motion.h3>
              )}
              <div className="space-y-4 mb-6">
                <motion.div 
                  className="flex items-center gap-3 text-gray-700 bg-cream/30 p-3 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaCalendarAlt className="text-gold text-xl" />
                  </motion.div>
                  <span className="text-lg font-medium">
                    {new Date(event.date).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 text-gray-700 bg-cream/30 p-3 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaClock className="text-gold text-xl" />
                  </motion.div>
                  <span className="text-lg font-medium">{event.time}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 text-gray-700 bg-cream/30 p-3 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaMapMarkerAlt className="text-gold text-xl" />
                  </motion.div>
                  <span className="text-lg font-medium">{event.address}</span>
                </motion.div>
              </div>
              {event.mapUrl && (
                <motion.div 
                  className="mt-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <motion.a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gold to-yellow-500 text-white rounded-full font-semibold text-lg shadow-xl relative overflow-hidden group"
                    whileHover={{ 
                      scale: 1.1, 
                      boxShadow: '0 10px 40px rgba(212,175,55,0.4)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaMapMarkerAlt className="text-xl flex-shrink-0" />
                    <span className="relative z-10">Показать на карте</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-gold opacity-0 group-hover:opacity-100"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </motion.div>
              )}
            </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="text-center text-gray-600 py-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Мероприятия не добавлены
          </motion.div>
        )}
      </div>
    </section>
  )
}

