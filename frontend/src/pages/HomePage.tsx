import { Course } from '../types/course'

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
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-textDark">
            경기도 1월 여행 가이드
          </h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
            날씨와 상황에 맞는 최적의 여행 코스를 찾아보세요
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Travel Type Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {travelTypes.map((travelType) => (
            <button
              key={travelType.type}
              onClick={() => onTypeSelect(travelType.type)}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 active:scale-95 sm:hover:scale-105 h-full min-h-[200px] sm:min-h-[220px]"
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
              <div className="relative p-5 sm:p-6 lg:p-8 text-white h-full flex flex-col justify-between">
                <div>
                  <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4 drop-shadow-xl">{travelType.icon}</div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 drop-shadow-lg">{travelType.title}</h2>
                  <p className="text-xs sm:text-sm opacity-95 mb-2 sm:mb-3 drop-shadow-md">{travelType.subtitle}</p>
                  <p className="text-xs sm:text-sm opacity-90 line-clamp-2 drop-shadow-md">{travelType.description}</p>
                </div>
                <div className="mt-4 flex items-center text-xs sm:text-sm font-semibold drop-shadow-lg">
                  코스 보기
                  <svg
                    className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
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
            </button>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-8 sm:mt-12 lg:mt-16 bg-white rounded-xl sm:rounded-2xl shadow-md p-5 sm:p-6 lg:p-8">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-textDark mb-4 sm:mb-6">
            이 가이드의 특징
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-primary text-white text-xl sm:text-2xl">
                  🌤️
                </div>
              </div>
              <div className="ml-3 sm:ml-4">
                <h4 className="text-base sm:text-lg font-semibold text-textDark">
                  날씨 기반 추천
                </h4>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
                  실시간 날씨를 반영하여 최적의 코스를 추천합니다
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-secondary text-white text-xl sm:text-2xl">
                  💰
                </div>
              </div>
              <div className="ml-3 sm:ml-4">
                <h4 className="text-base sm:text-lg font-semibold text-textDark">
                  예산 계산
                </h4>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
                  교통비, 입장료, 식비 등 상세한 비용 정보를 제공합니다
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-md bg-accent text-white text-xl sm:text-2xl">
                  🗺️
                </div>
              </div>
              <div className="ml-3 sm:ml-4">
                <h4 className="text-base sm:text-lg font-semibold text-textDark">
                  지도 & 경로
                </h4>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
                  자차 기준 상세한 경로와 지도 정보를 확인하세요
                </p>
              </div>
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
