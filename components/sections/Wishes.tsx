'use client'

import { motion } from 'framer-motion'
import { WishesData } from '@/lib/types'

interface WishesProps {
  data: WishesData
}

export default function Wishes({ data }: WishesProps) {
  return (
    <section id="wishes" className="py-20 px-4 bg-gradient-to-b from-white via-rose/10 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-rose/10 rounded-full blur-3xl" />
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2
          className="font-display text-4xl md:text-5xl text-gray-800 mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="relative inline-block">
            {data.title || 'Наши пожелания'}
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
          className="bg-gradient-to-br from-rose/40 to-rose/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-rose/30 hover:shadow-2xl transition-all duration-300"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed whitespace-pre-line">
            {data.text}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

