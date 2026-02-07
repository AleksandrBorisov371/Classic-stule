'use client'

import { motion } from 'framer-motion'
import { ProgramData } from '@/lib/types'
import {
  FaRing,
  FaUtensils,
  FaBirthdayCake,
  FaMusic,
  FaCamera,
  FaGlassCheers,
  FaCar,
  FaCity,
  FaMountain,
  FaBed,
  FaFire,
  FaArchway,
  FaBus,
  FaUserFriends,
  FaUsers,
  FaWineGlass,
  FaMicrophone,
  FaSeedling,
  FaRocket,
  FaHeart,
  FaHandshake,
} from 'react-icons/fa'

interface ProgramProps {
  data: ProgramData
}

const iconMap: Record<string, any> = {
  ring: FaRing,
  food: FaUtensils,
  cake: FaBirthdayCake,
  music: FaMusic,
  photo: FaCamera,
  toast: FaGlassCheers,
  car: FaCar,
  city: FaCity,
  nature: FaMountain,
  sleep: FaBed,
  fireworks: FaFire,
  arch: FaArchway,
  transfer: FaBus,
  dance: FaHeart,
  gathering: FaHandshake,
  buffet: FaWineGlass,
  show: FaMicrophone,
  bouquet: FaSeedling,
  salute: FaRocket,
}

export default function Program({ data }: ProgramProps) {
  return (
    <section id="program" className="py-20 px-4 bg-gradient-to-b from-white via-cream/30 to-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2
          className="font-display text-4xl md:text-5xl text-center text-gray-800 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="relative inline-block">
            {data.title || 'Программа дня'}
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </span>
        </motion.h2>
        <div className="space-y-6">
          {data.items.map((item, index) => {
            const Icon = iconMap[item.icon] || FaRing
            return (
              <motion.div
                key={index}
                className="flex flex-col md:flex-row items-start gap-4 md:gap-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gold/10 hover:border-gold/30 w-full"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.02,
                  x: index % 2 === 0 ? 5 : -5,
                }}
              >
                <motion.div 
                  className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-start"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-gold to-yellow-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <Icon className="text-white text-2xl" />
                  </div>
                </motion.div>
                <div className="flex-1 w-full">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2 w-full">
                    <motion.span 
                      className="font-semibold text-gold text-lg bg-gold/10 px-3 py-1 rounded-full w-full md:w-auto text-center md:text-left"
                      whileHover={{ scale: 1.1 }}
                    >
                      {item.time}
                    </motion.span>
                    <h3 className="font-display text-xl md:text-2xl text-gray-800 group-hover:text-gold transition-colors duration-300 w-full md:w-auto text-center md:text-left">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-center md:text-left w-full">{item.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

