"use client"

import { useState, useEffect } from "react"
import { Search, BookOpen, Clock, Users, Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample course data
const sampleCourses = [
  {
    id: 1,
    title: "Microeconomics Fundamentals",
    description: "Master supply and demand, market structures, and consumer behavior principles.",
    instructor: "Dr. Sarah Mitchell",
    duration: "12 hours",
    students: 2847,
    rating: 4.9,
    level: "Beginner",
    price: 5,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Starting Your First Business",
    description: "Complete guide to launching a startup from idea validation to first sales.",
    instructor: "Mark Johnson, CEO",
    duration: "15 hours",
    students: 1923,
    rating: 4.8,
    level: "Beginner",
    price: 5,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Macroeconomic Policy Analysis",
    description: "Understand fiscal policy, monetary policy, and their impact on business.",
    instructor: "Prof. David Chen",
    duration: "10 hours",
    students: 1456,
    rating: 4.7,
    level: "Intermediate",
    price: 5,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Digital Marketing for Entrepreneurs",
    description: "Build your brand and acquire customers through digital marketing strategies.",
    instructor: "Lisa Rodriguez",
    duration: "8 hours",
    students: 3241,
    rating: 4.9,
    level: "Beginner",
    price: 5,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Financial Markets & Investment",
    description: "Navigate stock markets, bonds, and investment strategies for business growth.",
    instructor: "Robert Kim, CFA",
    duration: "14 hours",
    students: 1789,
    rating: 4.8,
    level: "Advanced",
    price: 5,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Business Model Innovation",
    description: "Design and validate profitable business models for the modern economy.",
    instructor: "Emma Thompson",
    duration: "11 hours",
    students: 2156,
    rating: 4.7,
    level: "Intermediate",
    price: 5,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 7,
    title: "International Trade Economics",
    description: "Explore global trade patterns, tariffs, and international business opportunities.",
    instructor: "Dr. Ahmed Hassan",
    duration: "9 hours",
    students: 987,
    rating: 4.6,
    level: "Intermediate",
    price: 5,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 8,
    title: "Venture Capital & Fundraising",
    description: "Learn how to raise capital and pitch to investors for your startup.",
    instructor: "Jennifer Park, VC",
    duration: "7 hours",
    students: 1634,
    rating: 4.8,
    level: "Advanced",
    price: 5,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 9,
    title: "Behavioral Economics",
    description: "Understand how psychology influences economic decisions and consumer behavior.",
    instructor: "Dr. Michael Brown",
    duration: "6 hours",
    students: 1245,
    rating: 4.7,
    level: "Intermediate",
    price: 5,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function CoursesPage() {
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setCourses(sampleCourses)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">LearnHub</span>
              </Link>

              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
                <Link href="/courses" className="text-gray-900 font-medium">
                  Courses
                </Link>
                <Link href="/login" className="text-gray-600 hover:text-gray-900">
                  My Learning
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gray-900 hover:bg-gray-800">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Economics & Entrepreneurship Courses</h1>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
            <p className="text-gray-600">Loading courses...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{course.level}</Badge>
                    <span className="text-lg font-bold text-blue-600">${course.price}</span>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>By {course.instructor}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <Link href="/register">
                    <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">Enroll for $5</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredCourses.length === 0 && searchQuery && (
          <div className="text-center py-16">
            <p className="text-gray-600">No courses found matching "{searchQuery}"</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-gray-900">LearnHub</span>
            </div>
            <p className="text-gray-600 text-sm">© 2025 LearnHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
