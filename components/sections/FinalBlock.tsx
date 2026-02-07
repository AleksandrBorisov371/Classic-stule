'use client'

import { motion } from 'framer-motion'
import { FinalBlockData } from '@/lib/types'

interface FinalBlockProps {
  data: FinalBlockData
}

export default function FinalBlock({ data }: FinalBlockProps) {
  return (
    <section
      id="finalBlock"
      className="relative py-32 px-4 flex items-center justify-center min-h-screen overflow-hidden"
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
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"
        animate={{
          background: [
            'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.4) 100%)',
            'linear-gradient(135deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.35) 100%)',
            'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.4) 100%)',
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-gold/40 rounded-full"
          style={{
            left: `${10 + i * 12}%`,
            top: `${15 + i * 10}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.6,
          }}
        />
      ))}
      
      <motion.div
        className="relative z-10 text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="font-display text-4xl md:text-6xl text-white mb-8 drop-shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 0 40px rgba(212,175,55,0.3)',
          }}
        >
          {data.title}
        </motion.h2>
        <motion.p 
          className="font-display text-2xl md:text-3xl text-white drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          {data.signature}
        </motion.p>
      </motion.div>
    </section>
  )
}





