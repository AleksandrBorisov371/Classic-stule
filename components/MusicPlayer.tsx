'use client'

import { useState, useEffect } from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'

interface MusicPlayerProps {
  url: string
  enabled: boolean
}

export default function MusicPlayer({ url, enabled }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!enabled || !url) return

    const audioElement = new Audio(url)
    audioElement.loop = true
    audioElement.volume = 0.5
    setAudio(audioElement)

    return () => {
      audioElement.pause()
      audioElement.src = ''
    }
  }, [url, enabled])

  const togglePlay = () => {
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  if (!enabled || !url) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={togglePlay}
        className="w-12 h-12 bg-gold text-white rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-colors"
        aria-label={isPlaying ? 'Пауза' : 'Воспроизведение'}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
    </div>
  )
}




