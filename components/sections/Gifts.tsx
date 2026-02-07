'use client'

import { motion } from 'framer-motion'
import { GiftsData } from '@/lib/types'

interface GiftsProps {
  data: GiftsData
}

export default function Gifts({ data }: GiftsProps) {
  return (
    <section id="gifts" className="py-20 px-4 bg-gradient-to-b from-cream via-white to-cream/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2
          className="font-display text-4xl md:text-5xl text-gray-800 mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="relative inline-block">
            {data.title || 'Подарки'}
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
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-gold/10 hover:border-gold/30 hover:shadow-2xl transition-all duration-300"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed whitespace-pre-line">
            {data.text}
          </p>
          {data.wishlistUrl && (
            <motion.a
              href={data.wishlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-gradient-to-r from-gold to-yellow-500 text-white rounded-full font-semibold text-lg shadow-xl relative overflow-hidden group"
              whileHover={{ 
                scale: 1.1, 
                boxShadow: '0 10px 40px rgba(212,175,55,0.4)'
              }}
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
      </div>
    </section>
  )
}

