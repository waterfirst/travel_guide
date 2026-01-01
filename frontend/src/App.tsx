import { useState } from 'react'
import HomePage from './pages/HomePage'
import CourseListPage from './pages/CourseListPage'
import CourseDetailPage from './pages/CourseDetailPage'
import { Course } from './types/course'

type Page = 'home' | 'list' | 'detail'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [selectedType, setSelectedType] = useState<Course['type'] | null>(null)
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)

  const handleTypeSelect = (type: Course['type']) => {
    setSelectedType(type)
    setCurrentPage('list')
  }

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId)
    setCurrentPage('detail')
  }

  const handleBackToHome = () => {
    setCurrentPage('home')
    setSelectedType(null)
    setSelectedCourseId(null)
  }

  const handleBackToList = () => {
    setCurrentPage('list')
    setSelectedCourseId(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {currentPage === 'home' && (
        <HomePage onTypeSelect={handleTypeSelect} />
      )}
      {currentPage === 'list' && selectedType && (
        <CourseListPage
          type={selectedType}
          onCourseSelect={handleCourseSelect}
          onBack={handleBackToHome}
        />
      )}
      {currentPage === 'detail' && selectedCourseId && (
        <CourseDetailPage
          courseId={selectedCourseId}
          onBack={handleBackToList}
        />
      )}
    </div>
  )
}

export default App
