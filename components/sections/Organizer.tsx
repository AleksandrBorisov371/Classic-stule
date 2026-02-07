'use client'

import { motion } from 'framer-motion'
import { OrganizerData } from '@/lib/types'
import { FaPhone } from 'react-icons/fa'

interface OrganizerProps {
  data: OrganizerData
}

export default function Organizer({ data }: OrganizerProps) {
  return (
    <section id="organizer" className="py-20 px-4 bg-gradient-to-b from-white via-cream/20 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          className="font-display text-4xl md:text-5xl text-center text-gray-800 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="relative inline-block">
            {data.title || 'Наш организатор'}
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
          className="grid md:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="text-lg text-gray-700 leading-relaxed bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <p className="mb-6">{data.text}</p>
            <div className="space-y-4">
              <h3 className="font-display text-2xl md:text-3xl text-gray-800">
                {data.name}
              </h3>
              <motion.div 
                className="flex items-center gap-3 text-gray-700 bg-cream/30 p-3 rounded-lg w-fit"
                whileHover={{ scale: 1.05, x: 5 }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaPhone className="text-gold text-xl" />
                </motion.div>
                <a 
                  href={`tel:${data.phone}`} 
                  className="text-lg font-medium hover:text-gold transition-colors"
                >
                  {data.phone}
                </a>
              </motion.div>
            </div>
          </motion.div>
          {data.photo && (
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, x: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <motion.img
                src={data.photo}
                alt={data.name}
                className="rounded-2xl shadow-2xl max-w-full h-auto"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}




