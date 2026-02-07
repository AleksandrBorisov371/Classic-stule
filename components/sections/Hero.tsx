'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HeroData } from '@/lib/types'
import Countdown from '@/components/Countdown'

interface HeroProps {
  data: HeroData
}

export default function Hero({ data }: HeroProps) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleRSVPClick = () => {
    const rsvpSection = document.getElementById('rsvp')
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: data.backgroundImage
          ? `url(${data.backgroundImage})`
          : 'linear-gradient(135deg, #f5f5dc 0%, #f5e6d3 50%, #f4e4e1 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"
        animate={{
          background: [
            'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)',
            'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.3) 100%)',
            'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)',
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating particles effect */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gold/30 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + i * 12}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-4 drop-shadow-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          style={{
            textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 0 40px rgba(212,175,55,0.3)',
          }}
        >
          {data.groomName}
        </motion.h1>
        <motion.div
          className="text-4xl md:text-6xl text-gold mb-8 font-display"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6, type: "spring", stiffness: 200 }}
          style={{
            textShadow: '0 2px 10px rgba(212,175,55,0.5)',
            filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.5))',
          }}
        >
          &amp;
        </motion.div>
        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-8 drop-shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
          style={{
            textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 0 40px rgba(212,175,55,0.3)',
          }}
        >
          {data.brideName}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-white mb-8 font-light tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          style={{
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          {new Date(data.weddingDate).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </motion.p>
        {data.showCountdown && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.8, type: "spring" }}
            className="mb-8"
          >
            <Countdown targetDate={data.weddingDate} />
          </motion.div>
        )}
        <motion.button
          onClick={handleRSVPClick}
          className="px-10 py-5 bg-gradient-to-r from-white to-cream text-gray-800 rounded-full font-semibold text-lg shadow-2xl relative overflow-hidden group"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.5, type: "spring" }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: '0 10px 40px rgba(212,175,55,0.4)',
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Подтвердить присутствие</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-gold to-yellow-400 opacity-0 group-hover:opacity-100"
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.div>
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1, 
          y: [0, -10, 0],
        }}
        transition={{ 
          delay: 1.5, 
          duration: 0.8,
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }
        }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <motion.svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          whileHover={{ scale: 1.2 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </motion.svg>
      </motion.div>
    </section>
  )
}





