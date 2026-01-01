import { useState, useEffect } from 'react'
import { Course } from '../types/course'
import coursesData from '../../../data/courses.json'

interface CourseListPageProps {
  type: Course['type']
  onCourseSelect: (courseId: string) => void
  onBack: () => void
}

const typeInfo = {
  'bonfire': { title: '퇴근 후 불멍 코스', icon: '🔥', color: 'text-orange-600' },
  'spa-day': { title: '당일 온천 코스', icon: '♨️', color: 'text-blue-600' },
  'spa-overnight': { title: '1박2일 온천 코스', icon: '🏨', color: 'text-purple-600' },
  'solo-drive': { title: '혼자 드라이브 코스', icon: '🚗', color: 'text-green-600' }
}

export default function CourseListPage({ type, onCourseSelect, onBack }: CourseListPageProps) {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    const filteredCourses = (coursesData as Course[]).filter(course => course.type === type)
    setCourses(filteredCourses)
  }, [type])

  const info = typeInfo[type]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-2 sm:mr-4 p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
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
            </button>
            <div className="flex-1 min-w-0">
              <h1 className={`text-lg sm:text-xl lg:text-2xl font-bold ${info.color} flex items-center`}>
                <span className="mr-1.5 sm:mr-2 text-2xl sm:text-3xl">{info.icon}</span>
                <span className="truncate">{info.title}</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
                총 {courses.length}개의 코스가 있습니다
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Course List */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => onCourseSelect(course.id)}
              className="bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden text-left group active:scale-98"
            >
              {/* Thumbnail */}
              <div className="h-36 sm:h-40 lg:h-48 relative overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 text-3xl sm:text-4xl drop-shadow-lg">
                  {info.icon}
                </div>
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold text-gray-700 shadow-lg">
                  {course.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4 lg:p-5">
                <h3 className="text-base sm:text-lg font-bold text-textDark mb-1.5 sm:mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {course.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Info Row */}
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center text-gray-600">
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {course.distance}km
                  </div>
                  <div className="font-semibold text-primary text-xs sm:text-sm">
                    {formatPrice(course.estimatedCost.min)}~{formatPrice(course.estimatedCost.max)}원
                  </div>
                </div>

                {/* View Detail Arrow */}
                <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm font-semibold text-primary">
                  상세보기
                  <svg
                    className="ml-1 w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform"
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
      </main>
    </div>
  )
}
