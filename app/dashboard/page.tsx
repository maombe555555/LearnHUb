"use client"

import { useState, useEffect } from "react"
import { BookOpen, Play, FileText, Download, CreditCard, Lock, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Sample courses data
const sampleCourses = [
  {
    id: 1,
    title: "Microeconomics Fundamentals",
    description: "Master supply and demand, market structures, and consumer behavior principles.",
    instructor: "Dr. Sarah Mitchell",
    price: 5,
    isPaid: false,
    isEnabled: false,
    videoUrl: "/placeholder-video.mp4",
    notesUrl: "/placeholder-notes.pdf",
    correctionUrl: "/placeholder-correction.pdf",
  },
  {
    id: 2,
    title: "Starting Your First Business",
    description: "Complete guide to launching a startup from idea validation to first sales.",
    instructor: "Mark Johnson, CEO",
    price: 5,
    isPaid: true,
    isEnabled: true,
    videoUrl: "/placeholder-video.mp4",
    notesUrl: "/placeholder-notes.pdf",
    correctionUrl: "/placeholder-correction.pdf",
  },
  {
    id: 3,
    title: "Macroeconomic Policy Analysis",
    description: "Understand fiscal policy, monetary policy, and their impact on business.",
    instructor: "Prof. David Chen",
    price: 5,
    isPaid: true,
    isEnabled: false,
    videoUrl: "/placeholder-video.mp4",
    notesUrl: "/placeholder-notes.pdf",
    correctionUrl: "/placeholder-correction.pdf",
  },
  {
    id: 4,
    title: "Digital Marketing for Entrepreneurs",
    description: "Build your brand and acquire customers through digital marketing strategies.",
    instructor: "Lisa Rodriguez",
    price: 5,
    isPaid: false,
    isEnabled: false,
    videoUrl: "/placeholder-video.mp4",
    notesUrl: "/placeholder-notes.pdf",
    correctionUrl: "/placeholder-correction.pdf",
  },
  {
    id: 5,
    title: "Financial Markets & Investment",
    description: "Navigate stock markets, bonds, and investment strategies for business growth.",
    instructor: "Robert Kim, CFA",
    price: 5,
    isPaid: false,
    isEnabled: false,
    videoUrl: "/placeholder-video.mp4",
    notesUrl: "/placeholder-notes.pdf",
    correctionUrl: "/placeholder-correction.pdf",
  },
  {
    id: 6,
    title: "Business Model Innovation",
    description: "Design and validate profitable business models for the modern economy.",
    instructor: "Emma Thompson",
    price: 5,
    isPaid: false,
    isEnabled: false,
    videoUrl: "/placeholder-video.mp4",
    notesUrl: "/placeholder-notes.pdf",
    correctionUrl: "/placeholder-correction.pdf",
  },
]

export default function LearnerDashboard() {
  const [user, setUser] = useState(null)
  const [courses, setCourses] = useState(sampleCourses)
  const [paymentLoading, setPaymentLoading] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "learner") {
      router.push("/login")
      return
    }

    setUser(parsedUser)
  }, [router])

  const handlePayment = async (courseId: number) => {
    setPaymentLoading(courseId)

    // Simulate payment processing
    setTimeout(() => {
      setCourses((prev) => prev.map((course) => (course.id === courseId ? { ...course, isPaid: true } : course)))
      setPaymentLoading(null)
    }, 2000)
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">LearnHub</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Business Learning Dashboard</h1>
          <p className="text-gray-600">Master economics and entrepreneurship with our expert courses</p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={course.isPaid ? "default" : "secondary"}>{course.isPaid ? "Paid" : "Unpaid"}</Badge>
                  <span className="text-lg font-bold text-blue-600">${course.price}</span>
                </div>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
                <p className="text-sm text-gray-600">By {course.instructor}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {!course.isPaid ? (
                  <div>
                    <Alert>
                      <CreditCard className="h-4 w-4" />
                      <AlertDescription>Payment required to access this course</AlertDescription>
                    </Alert>
                    <Button
                      className="w-full mt-3 bg-blue-600 hover:bg-blue-700"
                      onClick={() => handlePayment(course.id)}
                      disabled={paymentLoading === course.id}
                    >
                      {paymentLoading === course.id ? "Processing..." : `Pay $${course.price}`}
                    </Button>
                  </div>
                ) : !course.isEnabled ? (
                  <Alert>
                    <Lock className="h-4 w-4" />
                    <AlertDescription>
                      Payment received. Waiting for admin approval to access course content.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-3">
                    <Alert>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-700">
                        Course access enabled! You can now access all materials.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-2">
                      <Button className="w-full bg-transparent" variant="outline">
                        <Play className="h-4 w-4 mr-2" />
                        Watch Video
                      </Button>

                      <Button className="w-full bg-transparent" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        View Notes
                      </Button>

                      <Button className="w-full bg-transparent" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Correction PDF
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{courses.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Paid Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{courses.filter((c) => c.isPaid).length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{courses.filter((c) => c.isEnabled).length}</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
