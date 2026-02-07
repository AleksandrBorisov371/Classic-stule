import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Свадебное приглашение',
  description: 'Приглашение на свадьбу',
  openGraph: {
    title: 'Свадебное приглашение',
    description: 'Приглашение на свадьбу',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}





