'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RSVPData } from '@/lib/types'

interface RSVPProps {
  data: RSVPData
}

export default function RSVP({ data }: RSVPProps) {
  const [formData, setFormData] = useState({
    name: '',
    attending: true,
    guestsCount: 1,
    comment: '',
    selectedDrinks: [] as string[],
    wish: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submittedAttending, setSubmittedAttending] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmittedAttending(formData.attending)
        setSubmitted(true)
        setFormData({ name: '', attending: true, guestsCount: 1, comment: '', selectedDrinks: [], wish: '' })
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error)
      alert('Произошла ошибка. Пожалуйста, попробуйте позже.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    const isYes = submittedAttending !== false
    return (
      <section id="rsvp" className="py-20 px-4 bg-gradient-to-b from-white to-cream">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8 md:p-12"
          >
            <h2 className="font-display text-3xl md:text-4xl text-gray-800 mb-4">
              Спасибо!
            </h2>
            <p className="text-lg text-gray-700">
              {isYes
                ? 'Мы получили ваше подтверждение и очень рады, что вы будете с нами!'
                : 'Мы получили ваш ответ. Нам очень жаль, что вы не сможете присутствовать — будем скучать!'}
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="py-20 px-4 bg-gradient-to-b from-white to-cream">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-4xl md:text-5xl text-gray-800 mb-4">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-lg text-gray-700">{data.subtitle}</p>
          )}
        </motion.div>
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 border border-gold/10"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          whileHover={{ boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
        >
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Ваше имя *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Вы сможете присутствовать? *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={formData.attending}
                    onChange={() => setFormData({ ...formData, attending: true })}
                    className="mr-2"
                  />
                  <span>Да, буду</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={!formData.attending}
                    onChange={() => setFormData({ ...formData, attending: false })}
                    className="mr-2"
                  />
                  <span>К сожалению, нет</span>
                </label>
              </div>
            </div>
            {formData.attending && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Количество гостей *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.guestsCount}
                  onChange={(e) =>
                    setFormData({ ...formData, guestsCount: parseInt(e.target.value) || 1 })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </div>
            )}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Комментарий
              </label>
              <input
                type="text"
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            {formData.attending && data.drinks && data.drinks.filter((d: any) => d.enabled).length > 0 && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Предпочитаемые напитки:
                </label>
                <div className="space-y-2">
                  {data.drinks.filter((d: any) => d.enabled).map((drink: any) => (
                    <label key={drink.name} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.selectedDrinks.includes(drink.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              selectedDrinks: [...formData.selectedDrinks, drink.name],
                            })
                          } else {
                            setFormData({
                              ...formData,
                              selectedDrinks: formData.selectedDrinks.filter((d) => d !== drink.name),
                            })
                          }
                        }}
                        className="mr-2"
                      />
                      <span>{drink.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            {formData.attending && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Ваше пожелание
                </label>
                <input
                  type="text"
                  value={formData.wish}
                  onChange={(e) => setFormData({ ...formData, wish: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="Ваши пожелания и предпочтения..."
                />
              </div>
            )}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-gradient-to-r from-gold to-yellow-500 text-white rounded-full font-semibold text-lg shadow-xl relative overflow-hidden group disabled:opacity-50"
              whileHover={{ 
                scale: loading ? 1 : 1.05,
                boxShadow: loading ? '' : '0 10px 40px rgba(212,175,55,0.4)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">{loading ? 'Отправка...' : 'Отправить'}</span>
              {!loading && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-gold opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}

