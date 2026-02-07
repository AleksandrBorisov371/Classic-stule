import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cream to-white px-4">
      <div className="text-center">
        <h1 className="font-display text-6xl md:text-8xl text-gray-800 mb-4">404</h1>
        <h2 className="font-display text-2xl md:text-3xl text-gray-700 mb-8">
          Страница не найдена
        </h2>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-gold text-white rounded-full font-semibold text-lg hover:bg-opacity-90 transition-colors duration-300"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  )
}





