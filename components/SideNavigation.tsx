'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ModuleInfo {
  key: string
  label: string
  id: string
}

interface SideNavigationProps {
  modules: ModuleInfo[]
}

export default function SideNavigation({ modules }: SideNavigationProps) {
  const [activeModule, setActiveModule] = useState<string>('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200 // Offset for better detection

      // Find which section is currently in view
      let current = ''
      for (const module of modules) {
        const element = document.getElementById(module.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            current = module.id
            break
          }
        }
      }

      // If we're at the top, set first module as active
      if (scrollPosition < 300 && modules.length > 0) {
        current = modules[0].id
      }

      setActiveModule(current)
      
      // Show navigation always when at top
      setIsVisible(true)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [modules])

  const scrollToModule = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80 // Offset for fixed header if any
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  if (modules.length === 0) return null

  return (
    <motion.div
      className="fixed right-8 top-4 z-50 hidden lg:block"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
      transition={{ duration: 0.3 }}
      style={{ maxHeight: 'calc(100vh - 100px)' }}
    >
      <div className="flex flex-col items-center gap-4">
        {modules.map((module, index) => {
          const isActive = activeModule === module.id
          return (
            <motion.button
              key={module.id}
              onClick={() => scrollToModule(module.id)}
              className="relative group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={module.label}
            >
              {/* Connection line */}
              {index < modules.length - 1 && (
                <motion.div
                  className="absolute left-1/2 top-8 w-0.5 h-12 bg-gray-300 -translate-x-1/2"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: index * 0.1 }}
                />
              )}
              
              {/* Number circle */}
              <motion.div
                className={`relative w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-br from-gold to-yellow-600 text-white shadow-lg shadow-gold/50 scale-110'
                    : 'bg-white text-gray-600 border-2 border-gray-300 group-hover:border-gold group-hover:bg-cream'
                }`}
                animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {index + 1}
                
                {/* Active indicator pulse */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-gold"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>

              {/* Tooltip on hover */}
              <motion.div
                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"
                initial={{ x: -10, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
              >
                {module.label}
                <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-gray-800"></div>
              </motion.div>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}