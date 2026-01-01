import { Course } from '../types/course'
import WeatherWidget from '../components/WeatherWidget'

interface HomePageProps {
  onTypeSelect: (type: Course['type']) => void
}

const travelTypes = [
  {
    type: 'bonfire' as const,
    icon: '🔥',
    title: '퇴근 후 불멍',
    subtitle: '친구 2-3명과 당일치기',
    description: '퇴근 후 부담 없이 떠나는 불멍 & 담소 코스',
    color: 'bg-gradient-to-br from-orange-400 to-red-500',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&q=80'
  },
  {
    type: 'spa-day' as const,
    icon: '♨️',
    title: '부모님과 온천',
    subtitle: '당일치기 효도 여행',
    description: '온천욕과 맛있는 식사를 함께하는 코스',
    color: 'bg-gradient-to-br from-blue-400 to-cyan-500',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80'
  },
  {
    type: 'spa-overnight' as const,
    icon: '🏨',
    title: '1박2일 온천 힐링',
    subtitle: '온천과 휴식에 집중',
    description: '여유롭게 온천을 즐기는 힐링 여행',
    color: 'bg-gradient-to-br from-purple-400 to-pink-500',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80'
  },
  {
    type: 'solo-drive' as const,
    icon: '🚗',
    title: '혼자 떠나는 드라이브',
    subtitle: '자차로 자유롭게',
    description: '혼자만의 시간을 즐기는 드라이브 코스',
    color: 'bg-gradient-to-br from-green-400 to-teal-500',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80'
  }
]

export default function HomePage({ onTypeSelect }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-secondary to-accent shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">
            ✨ 경기도 1월 여행 가이드
          </h1>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg text-white/90 drop-shadow-md">
            날씨와 상황에 맞는 최적의 여행 코스를 찾아보세요
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Weather Widget */}
        <div className="mb-6 sm:mb-8">
          <WeatherWidget />
        </div>

        {/* Travel Type Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {travelTypes.map((travelType) => (
            <button
              key={travelType.type}
              onClick={() => onTypeSelect(travelType.type)}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 active:scale-95 sm:hover:scale-105 sm:hover:-translate-y-2 h-full min-h-[220px] sm:min-h-[240px] border-2 border-transparent hover:border-white"
            >
              {/* Background Image */}
              <img
                src={travelType.image}
                alt={travelType.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 ${travelType.color} opacity-80 group-hover:opacity-70 transition-opacity`}></div>

              {/* Content */}
              <div className="relative p-5 sm:p-6 lg:p-8 text-white h-full flex flex-col justify-end">
                <div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 drop-shadow-lg">{travelType.title}</h2>
                  <p className="text-sm sm:text-base opacity-95 mb-2 drop-shadow-md">{travelType.subtitle}</p>
                  <p className="text-xs sm:text-sm opacity-90 mb-4 sm:mb-6 drop-shadow-md">{travelType.description}</p>
                  <div className="flex items-center text-sm sm:text-base font-semibold drop-shadow-lg">
                    코스 보기
                    <svg
                      className="ml-2 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-8 sm:mt-12 lg:mt-16 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-100">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-textDark mb-6 sm:mb-8 text-center">
            💡 이 가이드의 특징
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            <div className="p-5 sm:p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border-l-4 border-primary shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h4 className="text-base sm:text-lg lg:text-xl font-bold text-textDark">
                  날씨 기반 추천
                </h4>
              </div>
              <p className="text-sm sm:text-base text-gray-700">
                실시간 날씨를 반영하여 최적의 코스를 추천합니다
              </p>
            </div>

            <div className="p-5 sm:p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl border-l-4 border-secondary shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-base sm:text-lg lg:text-xl font-bold text-textDark">
                  예산 계산
                </h4>
              </div>
              <p className="text-sm sm:text-base text-gray-700">
                교통비, 입장료, 식비 등 상세한 비용 정보를 제공합니다
              </p>
            </div>

            <div className="p-5 sm:p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border-l-4 border-accent shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="text-base sm:text-lg lg:text-xl font-bold text-textDark">
                  지도 & 경로
                </h4>
              </div>
              <p className="text-sm sm:text-base text-gray-700">
                구글 지도와 연동된 상세한 경로 정보를 확인하세요
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-8 sm:mt-12 lg:mt-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
          <p className="text-center text-gray-500 text-xs sm:text-sm">
            © 2026 경기도 여행 가이드. Plan - Generator - Healer 방식으로 제작되었습니다.
          </p>
        </div>
      </footer>
    </div>
  )
}
