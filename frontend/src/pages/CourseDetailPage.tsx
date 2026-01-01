import { useState, useEffect } from 'react'
import { Course, Restaurant, Accommodation } from '../types/course'
import coursesData from '../../../data/courses.json'
import restaurantsData from '../../../data/restaurants.json'
import accommodationsData from '../../../data/accommodations.json'

interface CourseDetailPageProps {
  courseId: string
  onBack: () => void
}

export default function CourseDetailPage({ courseId, onBack }: CourseDetailPageProps) {
  const [course, setCourse] = useState<Course | null>(null)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])

  useEffect(() => {
    const foundCourse = (coursesData as Course[]).find(c => c.id === courseId)
    if (foundCourse) {
      setCourse(foundCourse)

      // Load restaurants
      const courseRestaurants = (restaurantsData as Restaurant[]).filter(r =>
        foundCourse.restaurants.includes(r.id)
      )
      setRestaurants(courseRestaurants)

      // Load accommodations
      if (foundCourse.accommodations) {
        const courseAccommodations = (accommodationsData as Accommodation[]).filter(a =>
          foundCourse.accommodations?.includes(a.id)
        )
        setAccommodations(courseAccommodations)
      }
    }
  }, [courseId])

  if (!course) {
    return <div className="p-8 text-center">로딩 중...</div>
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price)
  }

  const totalCost = course.itinerary.reduce((sum, item) => sum + item.cost, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 active:text-gray-900 transition-colors"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 mr-1.5 sm:mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm sm:text-base">목록으로 돌아가기</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Course Header */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden mb-4 sm:mb-6">
          <div className="h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white px-4">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">
                {course.type === 'bonfire' && '🔥'}
                {course.type === 'spa-day' && '♨️'}
                {course.type === 'spa-overnight' && '🏨'}
                {course.type === 'solo-drive' && '🚗'}
              </div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold px-4 sm:px-6 leading-tight">{course.title}</h1>
            </div>
          </div>
          <div className="p-4 sm:p-5 lg:p-6">
            <p className="text-gray-700 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">{course.description}</p>

            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-center">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">⏱️</div>
                <div className="text-xs sm:text-sm text-gray-600">소요시간</div>
                <div className="font-semibold text-gray-900 text-xs sm:text-base">{course.duration}</div>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-center">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🚗</div>
                <div className="text-xs sm:text-sm text-gray-600">거리</div>
                <div className="font-semibold text-gray-900 text-xs sm:text-base">{course.distance}km</div>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-center">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">💰</div>
                <div className="text-xs sm:text-sm text-gray-600">예상 비용</div>
                <div className="font-semibold text-gray-900 text-[10px] sm:text-xs lg:text-sm leading-tight">
                  {formatPrice(course.estimatedCost.min)}~<br/>{formatPrice(course.estimatedCost.max)}원
                </div>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-center">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🌤️</div>
                <div className="text-xs sm:text-sm text-gray-600">추천 날씨</div>
                <div className="font-semibold text-gray-900 text-xs sm:text-sm">
                  {course.bestWeather.join(', ')}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-4 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2">
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 sm:px-3 py-0.5 sm:py-1 bg-primary/10 text-primary text-xs sm:text-sm rounded-full font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Itinerary */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 lg:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-textDark mb-4 sm:mb-6 flex items-center">
            <span className="mr-2 sm:mr-3 text-xl sm:text-2xl">📍</span>
            <span>여행 일정</span>
          </h2>
          <div className="space-y-4 sm:space-y-6">
            {course.itinerary.map((item, index) => (
              <div key={index} className="flex">
                {/* Timeline */}
                <div className="flex flex-col items-center mr-2 sm:mr-3 lg:mr-4">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm sm:text-base">
                    {item.order}
                  </div>
                  {index < course.itinerary.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-6 sm:pb-8">
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                    <h3 className="font-bold text-base sm:text-lg text-textDark mb-1.5 sm:mb-2">
                      {item.location.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                      📍 {item.location.address}
                    </p>
                    <p className="text-primary font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                      {item.activity}
                    </p>
                    <p className="text-gray-700 mb-2 sm:mb-3 text-xs sm:text-sm lg:text-base">{item.description}</p>

                    <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {item.duration}
                      </div>
                      <div className="flex items-center text-primary font-semibold">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {formatPrice(item.cost)}원
                      </div>
                      {item.location.parkingInfo && (
                        <div className="flex items-center text-gray-600">
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                          </svg>
                          {item.location.parkingInfo}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Cost */}
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-base sm:text-lg font-semibold text-gray-700">총 예상 비용</span>
              <span className="text-xl sm:text-2xl font-bold text-primary">
                {formatPrice(totalCost)}원
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              * 1인 기준 예상 비용입니다. 실제 비용은 상황에 따라 달라질 수 있습니다.
            </p>
          </div>
        </div>

        {/* Restaurants */}
        {restaurants.length > 0 && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 lg:p-6 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-textDark mb-4 sm:mb-6 flex items-center">
              <span className="mr-2 sm:mr-3 text-xl sm:text-2xl">🍽️</span>
              <span>추천 맛집</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {restaurants.map((restaurant) => (
                <div key={restaurant.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-base sm:text-lg text-textDark mb-1">
                    {restaurant.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">
                    {restaurant.category} · {restaurant.priceRange}
                  </p>
                  <p className="text-xs text-gray-500 mb-2 sm:mb-3">
                    📍 {restaurant.location.address}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-2 sm:mb-3">
                    <span className="text-yellow-500 mr-1 text-sm sm:text-base">⭐</span>
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">{restaurant.rating}</span>
                    <span className="text-gray-500 text-xs sm:text-sm ml-1">
                      ({restaurant.reviewCount.toLocaleString()}개)
                    </span>
                  </div>

                  {/* Menu */}
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-gray-700">대표 메뉴:</p>
                    {restaurant.menu.slice(0, 3).map((menuItem, idx) => (
                      <div key={idx} className="flex justify-between text-xs sm:text-sm">
                        <span className="text-gray-700 truncate mr-2">{menuItem.name}</span>
                        <span className="text-primary font-medium whitespace-nowrap">
                          {formatPrice(menuItem.price)}원
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Contact */}
                  <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
                    <a
                      href={`tel:${restaurant.phone}`}
                      className="text-xs sm:text-sm text-primary hover:underline flex items-center"
                    >
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {restaurant.phone}
                    </a>
                    <p className="text-xs text-gray-500 mt-1">
                      영업시간: {restaurant.openingHours}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Accommodations */}
        {accommodations.length > 0 && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 lg:p-6 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-textDark mb-4 sm:mb-6 flex items-center">
              <span className="mr-2 sm:mr-3 text-xl sm:text-2xl">🏨</span>
              <span>추천 숙박</span>
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {accommodations.map((accommodation) => (
                <div key={accommodation.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-5 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2 sm:mb-3">
                    <div className="flex-1 min-w-0 mr-2">
                      <h3 className="font-bold text-base sm:text-lg lg:text-xl text-textDark mb-1 truncate">
                        {accommodation.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">{accommodation.type}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center mb-1">
                        <span className="text-yellow-500 mr-1 text-sm sm:text-base">⭐</span>
                        <span className="font-semibold text-gray-900 text-sm sm:text-base">{accommodation.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        ({accommodation.reviewCount.toLocaleString()})
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                    📍 {accommodation.location.address}
                  </p>

                  {/* Price */}
                  <div className="mb-2 sm:mb-3">
                    <span className="text-primary font-bold text-base sm:text-lg">
                      {formatPrice(accommodation.priceRange.min)}~{formatPrice(accommodation.priceRange.max)}원
                    </span>
                    <span className="text-gray-500 text-xs sm:text-sm ml-2">/ 1박</span>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    {accommodation.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-2 py-0.5 sm:py-1 bg-secondary/10 text-secondary text-xs rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  {/* Contact & Booking */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 pt-2 sm:pt-3 border-t border-gray-100">
                    <a
                      href={`tel:${accommodation.phone}`}
                      className="text-xs sm:text-sm text-primary hover:underline flex items-center"
                    >
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {accommodation.phone}
                    </a>
                    {accommodation.bookingUrl && (
                      <a
                        href={accommodation.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 sm:py-1.5 bg-primary text-white text-xs sm:text-sm rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        예약하기
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6">
          <h3 className="font-bold text-base sm:text-lg text-textDark mb-3 flex items-center">
            <span className="mr-2 text-lg sm:text-xl">💡</span>
            <span>여행 팁</span>
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
            <li className="flex items-start">
              <span className="mr-2 flex-shrink-0">•</span>
              <span>출발 전 실시간 교통정보를 확인하세요.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 flex-shrink-0">•</span>
              <span>맛집은 사전 예약을 추천합니다 (특히 주말).</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 flex-shrink-0">•</span>
              <span>날씨 변화에 대비한 옷을 준비하세요.</span>
            </li>
            {course.type === 'spa-overnight' && (
              <li className="flex items-start">
                <span className="mr-2 flex-shrink-0">•</span>
                <span>숙박 시설은 미리 예약하는 것이 좋습니다.</span>
              </li>
            )}
          </ul>
        </div>
      </main>
    </div>
  )
}
