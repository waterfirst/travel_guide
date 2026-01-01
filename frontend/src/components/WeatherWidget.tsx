import { useState, useEffect } from 'react'

const YONGIN_LAT = 37.2411
const YONGIN_LON = 127.1776

interface WeatherData {
  temp: number
  description: string
  icon: string
  humidity: number
  windSpeed: number
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // OpenWeatherMap API는 클라이언트에서 직접 호출 가능
    // 무료 API 사용 (제한: 60 calls/minute)
    const fetchWeather = async () => {
      try {
        // 무료 날씨 API 사용 (Open-Meteo - API 키 불필요)
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${YONGIN_LAT}&longitude=${YONGIN_LON}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=Asia%2FTokyo`
        )

        if (!response.ok) {
          throw new Error('날씨 정보를 가져올 수 없습니다')
        }

        const data = await response.json()
        const current = data.current

        // 날씨 코드를 한글로 변환
        const getWeatherDescription = (code: number): string => {
          if (code === 0) return '맑음'
          if (code <= 3) return '구름 조금'
          if (code <= 48) return '흐림'
          if (code <= 67) return '비'
          if (code <= 77) return '눈'
          if (code <= 82) return '소나기'
          return '천둥번개'
        }

        setWeather({
          temp: Math.round(current.temperature_2m),
          description: getWeatherDescription(current.weather_code),
          icon: getWeatherIcon(current.weather_code),
          humidity: current.relative_humidity_2m,
          windSpeed: Math.round(current.wind_speed_10m * 10) / 10
        })
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : '날씨 정보 로딩 실패')
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  const getWeatherIcon = (code: number): string => {
    if (code === 0) return '☀️'
    if (code <= 3) return '🌤️'
    if (code <= 48) return '☁️'
    if (code <= 67) return '🌧️'
    if (code <= 77) return '❄️'
    if (code <= 82) return '🌦️'
    return '⛈️'
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
        <div className="flex items-center justify-center">
          <div className="animate-pulse">날씨 정보 로딩 중...</div>
        </div>
      </div>
    )
  }

  if (error || !weather) {
    return (
      <div className="bg-gradient-to-r from-gray-400 to-gray-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
        <div className="text-center">
          <p className="text-sm">날씨 정보를 불러올 수 없습니다</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-bold text-sm sm:text-base">용인시 현재 날씨</span>
          </div>
          <div className="flex items-center">
            <span className="text-4xl sm:text-5xl mr-3">{weather.icon}</span>
            <div>
              <div className="text-3xl sm:text-4xl font-bold">{weather.temp}°C</div>
              <div className="text-xs sm:text-sm opacity-90">{weather.description}</div>
            </div>
          </div>
        </div>
        <div className="text-right text-xs sm:text-sm opacity-90 ml-4">
          <div className="mb-1">습도: {weather.humidity}%</div>
          <div>풍속: {weather.windSpeed}m/s</div>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-white/30 text-xs sm:text-sm opacity-90">
        <div className="flex items-center">
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          출발지: 경기도 용인시 신봉사거리
        </div>
      </div>
    </div>
  )
}
