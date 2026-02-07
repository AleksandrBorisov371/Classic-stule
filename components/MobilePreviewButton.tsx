'use client'

import { useState, useEffect } from 'react'
import { FaMobileAlt, FaTimes } from 'react-icons/fa'

interface MobilePreviewButtonProps {
  enabled: boolean
}

export default function MobilePreviewButton({ enabled }: MobilePreviewButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isInIframe, setIsInIframe] = useState(false)

  useEffect(() => {
    // Check if we're inside an iframe (mobile preview)
    setIsInIframe(window.self !== window.top)
    
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // lg breakpoint in Tailwind
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!enabled) return null
  // Don't show anything if we're inside iframe (mobile preview)
  if (isInIframe) return null

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <>
      {/* Hide button when mobile preview is open or on mobile devices */}
      {!isOpen && !isMobile && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-50 bg-gold text-white rounded-full px-4 py-3 flex items-center gap-2 shadow-lg hover:bg-opacity-90 transition-colors"
          aria-label="Как выглядит сайт на экране телефона"
          title="Как выглядит сайт на экране телефона"
        >
          <FaMobileAlt className="text-xl flex-shrink-0" />
          <span className="text-sm font-medium whitespace-nowrap">Как выглядит сайт на экране телефона</span>
        </button>
      )}

      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black bg-opacity-75 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false)
            }
          }}
        >
          <div 
            className="relative bg-gray-800 rounded-[2.5rem] shadow-2xl overflow-hidden p-2"
            style={{
              width: '390px',
              height: '810px',
              minWidth: '390px',
              minHeight: '810px',
              maxWidth: '390px',
              maxHeight: '810px',
            }}
          >
            {/* Phone frame */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-20"></div>
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full z-20"></div>
            
            <div className="relative w-full h-full bg-white rounded-[2rem] overflow-hidden">
              <iframe
                src={currentUrl}
                className="w-full h-full border-0"
                style={{ 
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                title="Мобильный предпросмотр"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

