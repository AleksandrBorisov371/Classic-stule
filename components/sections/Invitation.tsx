'use client'

import { motion } from 'framer-motion'
import { InvitationData } from '@/lib/types'

interface InvitationProps {
  data: InvitationData
}

export default function Invitation({ data }: InvitationProps) {
  return (
    <section id="invitation" className="py-20 px-4 bg-gradient-to-b from-white via-cream/50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <motion.div
        className="max-w-3xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2 
          className="font-display text-4xl md:text-5xl text-gray-800 mb-8 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="relative inline-block">
            {data.title}
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </span>
        </motion.h2>
        <motion.p 
          className="text-lg md:text-xl text-gray-700 leading-relaxed whitespace-pre-line"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {data.text}
        </motion.p>
      </motion.div>
    </section>
  )
}





