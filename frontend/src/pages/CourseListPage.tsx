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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-600"
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
            <div>
              <h1 className={`text-2xl font-bold ${info.color} flex items-center`}>
                <span className="mr-2 text-3xl">{info.icon}</span>
                {info.title}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                총 {courses.length}개의 코스가 있습니다
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Course List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => onCourseSelect(course.id)}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden text-left group"
            >
              {/* Thumbnail */}
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                  {info.icon}
                </div>
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                  {course.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-textDark mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Info Row */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <svg
                      className="w-4 h-4 mr-1"
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
                  <div className="font-semibold text-primary">
                    {formatPrice(course.estimatedCost.min)}~{formatPrice(course.estimatedCost.max)}원
                  </div>
                </div>

                {/* View Detail Arrow */}
                <div className="mt-4 flex items-center text-sm font-semibold text-primary">
                  상세보기
                  <svg
                    className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform"
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
