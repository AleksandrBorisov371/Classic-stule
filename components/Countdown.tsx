'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'

interface CountdownProps {
  targetDate: string
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [prevValues, setPrevValues] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const target = new Date(targetDate)
      const diff = target.getTime() - now.getTime()

      setTimeLeft((prev) => {
        if (diff > 0) {
          const newTimeLeft = {
            days: differenceInDays(target, now),
            hours: differenceInHours(target, now) % 24,
            minutes: differenceInMinutes(target, now) % 60,
            seconds: differenceInSeconds(target, now) % 60,
          }
          setPrevValues(prev)
          return newTimeLeft
        } else {
          setPrevValues(prev)
          return { days: 0, hours: 0, minutes: 0, seconds: 0 }
        }
      })
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div className="flex gap-1 sm:gap-2 md:gap-6 justify-center items-center w-full overflow-hidden">
      <div className="flex gap-1 sm:gap-2 md:gap-6 justify-center items-center w-full">
        {[
          { label: 'Дней', value: timeLeft.days, prev: prevValues.days },
          { label: 'Часов', value: timeLeft.hours, prev: prevValues.hours },
          { label: 'Минут', value: timeLeft.minutes, prev: prevValues.minutes },
          { label: 'Секунд', value: timeLeft.seconds, prev: prevValues.seconds },
        ].map((item, index) => (
          <motion.div 
            key={index} 
            className="text-center flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="bg-white/20 backdrop-blur-md rounded-lg sm:rounded-xl px-2 py-2 sm:px-3 sm:py-3 md:px-6 md:py-4 mb-1 sm:mb-2 border border-white/30 shadow-xl relative overflow-hidden min-w-[50px] sm:min-w-[60px] md:min-w-0"
              whileHover={{ 
                boxShadow: '0 10px 30px rgba(212,175,55,0.3)',
                borderColor: 'rgba(212,175,55,0.5)'
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.value}
                  className="text-lg sm:text-2xl md:text-5xl font-bold text-white leading-tight"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.value.toString().padStart(2, '0')}
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent pointer-events-none" />
            </motion.div>
            <div className="text-[10px] sm:text-xs md:text-sm text-white/90 font-medium uppercase tracking-wide">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}





