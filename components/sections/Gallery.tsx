'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { GalleryData } from '@/lib/types'

interface GalleryProps {
  data: GalleryData
}

export default function Gallery({ data }: GalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  useEffect(() => {
    if (selectedImageIndex === null || !data.images) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && selectedImageIndex > 0) {
        setSelectedImageIndex(selectedImageIndex - 1)
      } else if (e.key === 'ArrowRight' && selectedImageIndex < data.images.length - 1) {
        setSelectedImageIndex(selectedImageIndex + 1)
      } else if (e.key === 'Escape') {
        setSelectedImageIndex(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImageIndex, data.images])

  return (
    <section id="gallery" className="py-20 px-4 bg-gradient-to-b from-white via-cream/20 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          className="font-display text-4xl md:text-5xl text-center text-gray-800 mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="relative inline-block">
            {data.title || 'Галерея'}
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </span>
        </motion.h2>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed whitespace-pre-line">
            {data.text}
          </p>
          {data.telegramUrl && (
            <motion.a
              href={data.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-gradient-to-r from-gold to-yellow-500 text-white rounded-full font-semibold text-lg shadow-xl relative overflow-hidden group"
              whileHover={{ scale: 1.1, boxShadow: '0 10px 40px rgba(212,175,55,0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">{data.buttonText || 'ОТКРЫТЬ'}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-gold opacity-0 group-hover:opacity-100"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          )}
        </motion.div>
        {data.images && data.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.images.map((img, index) => (
              <motion.div
                key={index}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100
                }}
                onClick={() => setSelectedImageIndex(index)}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 2,
                  zIndex: 10,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                }}
              >
                <img
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/50 rounded-2xl transition-all duration-300"
                  initial={false}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <AnimatePresence>
        {selectedImageIndex !== null && data.images && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImageIndex(null)}
          >
            <motion.img
              key={selectedImageIndex}
              src={data.images[selectedImageIndex]}
              alt={`Gallery ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />
            {selectedImageIndex > 0 && (
              <motion.button
                className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-gold bg-black/50 rounded-full w-14 h-14 flex items-center justify-center backdrop-blur-sm z-10"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImageIndex(selectedImageIndex - 1)
                }}
                whileHover={{ scale: 1.2, x: -5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                aria-label="Предыдущее фото"
              >
                <FaChevronLeft />
              </motion.button>
            )}
            {selectedImageIndex < data.images.length - 1 && (
              <motion.button
                className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-3xl hover:text-gold bg-black/50 rounded-full w-14 h-14 flex items-center justify-center backdrop-blur-sm z-10"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImageIndex(selectedImageIndex + 1)
                }}
                whileHover={{ scale: 1.2, x: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                aria-label="Следующее фото"
              >
                <FaChevronRight />
              </motion.button>
            )}
            <motion.button
              className="absolute top-6 right-6 text-white text-5xl hover:text-gold bg-black/50 rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImageIndex(null)
              }}
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              aria-label="Закрыть"
            >
              ×
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}


