'use client'

import { motion } from 'framer-motion'
import { DressCodeData } from '@/lib/types'

interface DressCodeProps {
  data: DressCodeData
}

export default function DressCode({ data }: DressCodeProps) {
  return (
    <section id="dressCode" className="py-20 px-4 bg-gradient-to-b from-white via-rose/20 to-rose/40 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose/10 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          className="font-display text-4xl md:text-5xl text-center text-gray-800 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="relative inline-block">
            {data.title}
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </span>
        </motion.h2>
        
        {/* Women's Dress Code */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="text-center md:text-left bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {data.womenTitle && (
                <h3 className="font-display text-2xl md:text-3xl text-gray-800 mb-4">
                  {data.womenTitle}
                </h3>
              )}
              <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                {data.description}
              </p>
              {data.colors && data.colors.length > 0 && (
                <div className="flex justify-center md:justify-start gap-4 flex-wrap">
                  {data.colors.map((color, index) => (
                    <motion.div
                      key={index}
                      className="w-16 h-16 rounded-full border-4 border-white shadow-xl cursor-pointer"
                      style={{ backgroundColor: color }}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 360,
                        boxShadow: `0 0 20px ${color}40`
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
            {data.womenPhoto && (
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, x: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring" }}
              >
                <motion.img
                  src={data.womenPhoto}
                  alt="Dress Code для девушек"
                  className="max-w-full h-auto rounded-2xl shadow-2xl"
                  style={{ maxWidth: '900px', width: '100%' }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Men's Dress Code */}
        {data.menTitle && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {data.menPhoto && (
                <motion.div 
                  className="flex justify-center order-2 md:order-1"
                  initial={{ opacity: 0, x: -30, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  <motion.img
                    src={data.menPhoto}
                    alt="Dress Code для мужчин"
                    className="max-w-full h-auto rounded-2xl shadow-2xl"
                    style={{ maxWidth: '900px', width: '100%' }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              )}
              <motion.div 
                className="text-center md:text-left order-1 md:order-2 bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="font-display text-2xl md:text-3xl text-gray-800 mb-4">
                  {data.menTitle}
                </h3>
                <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                  {data.menDescription}
                </p>
                {data.menColors && data.menColors.length > 0 && (
                  <div className="flex justify-center md:justify-start gap-4 flex-wrap">
                    {data.menColors.map((color, index) => (
                      <motion.div
                        key={index}
                        className="w-16 h-16 rounded-full border-4 border-white shadow-xl cursor-pointer"
                        style={{ backgroundColor: color }}
                        initial={{ scale: 0, rotate: 180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.5, 
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ 
                          scale: 1.2, 
                          rotate: -360,
                          boxShadow: `0 0 20px ${color}40`
                        }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

