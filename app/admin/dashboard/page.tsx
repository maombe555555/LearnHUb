"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { BookOpen, Plus, Check, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, UserPlus, UsersIcon } from "lucide-react"

// Sample data
const initialCourses = [
  {
    id: 1,
    title: "Microeconomics Fundamentals",
    description: "Master supply and demand, market structures, and consumer behavior principles.",
    instructor: "Dr. Sarah Mitchell",
    price: 5,
    students: [
      { id: 1, name: "John Doe", email: "john@example.com", isPaid: true, isEnabled: false },
      { id: 2, name: "Jane Smith", email: "jane@example.com", isPaid: true, isEnabled: true },
    ],
  },
  {
    id: 2,
    title: "Starting Your First Business",
    description: "Complete guide to launching a startup from idea validation to first sales.",
    instructor: "Mark Johnson, CEO",
    price: 5,
    students: [
      { id: 3, name: "Bob Wilson", email: "bob@example.com", isPaid: true, isEnabled: true },
      { id: 4, name: "Alice Brown", email: "alice@example.com", isPaid: true, isEnabled: false },
    ],
  },
  {
    id: 3,
    title: "Digital Marketing for Entrepreneurs",
    description: "Build your brand and acquire customers through digital marketing strategies.",
    instructor: "Lisa Rodriguez",
    price: 5,
    students: [{ id: 5, name: "Charlie Davis", email: "charlie@example.com", isPaid: true, isEnabled: true }],
  },
]

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [courses, setCourses] = useState(initialCourses)
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false)
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    instructor: "",
    videoFile: null,
    notesFile: null,
    correctionFile: null,
  })
  const [users, setUsers] = useState([
    { id: 1, name: "Admin User", email: "learnhub@gmail.com", role: "admin", createdAt: "2025-01-01" },
    { id: 2, name: "John Doe", email: "john@example.com", role: "learner", createdAt: "2025-01-15" },
    { id: 3, name: "Jane Smith", email: "jane@example.com", role: "learner", createdAt: "2025-01-20" },
  ])
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "learner",
  })
  const [activeTab, setActiveTab] = useState("courses")
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "admin") {
      router.push("/login")
      return
    }

    setUser(parsedUser)
  }, [router])

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault()

    const course = {
      id: courses.length + 1,
      title: newCourse.title,
      description: newCourse.description,
      instructor: newCourse.instructor,
      price: 5,
      students: [],
    }

    setCourses((prev) => [...prev, course])
    setNewCourse({
      title: "",
      description: "",
      instructor: "",
      videoFile: null,
      notesFile: null,
      correctionFile: null,
    })
    setIsAddCourseOpen(false)
  }

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()

    const user = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setUsers((prev) => [...prev, user])
    setNewUser({
      name: "",
      email: "",
      password: "",
      role: "learner",
    })
    setIsAddUserOpen(false)
  }

  const handleDeleteUser = (userId: number) => {
    if (userId === 1) return // Prevent deleting main admin
    setUsers((prev) => prev.filter((user) => user.id !== userId))
  }

  const handleRoleChange = (userId: number, newRole: string) => {
    if (userId === 1) return // Prevent changing main admin role
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))
  }

  const toggleStudentAccess = (courseId: number, studentId: number) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId
          ? {
              ...course,
              students: course.students.map((student) =>
                student.id === studentId ? { ...student, isEnabled: !student.isEnabled } : student,
              ),
            }
          : course,
      ),
    )
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) {
    return <div>Loading...</div>
  }

  const totalStudents = courses.reduce((acc, course) => acc + course.students.length, 0)
  const totalRevenue = courses.reduce(
    (acc, course) => acc + course.students.filter((s) => s.isPaid).length * course.price,
    0,
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">LearnHub Admin</span>
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Economics & Entrepreneurship Admin</h1>
            <p className="text-gray-600">Manage business education courses, users, and student access</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="courses">Course Management</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-end">
              <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Course
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Course</DialogTitle>
                    <DialogDescription>Create a new course with video, notes, and correction PDF</DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleAddCourse} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Course Title</Label>
                      <Input
                        id="title"
                        value={newCourse.title}
                        onChange={(e) => setNewCourse((prev) => ({ ...prev, title: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newCourse.description}
                        onChange={(e) => setNewCourse((prev) => ({ ...prev, description: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="instructor">Instructor Name</Label>
                      <Input
                        id="instructor"
                        value={newCourse.instructor}
                        onChange={(e) => setNewCourse((prev) => ({ ...prev, instructor: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="video">Video File</Label>
                      <Input
                        id="video"
                        type="file"
                        accept="video/*"
                        onChange={(e) => setNewCourse((prev) => ({ ...prev, videoFile: e.target.files[0] }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="notes">Notes PDF</Label>
                      <Input
                        id="notes"
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setNewCourse((prev) => ({ ...prev, notesFile: e.target.files[0] }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="correction">Correction PDF</Label>
                      <Input
                        id="correction"
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setNewCourse((prev) => ({ ...prev, correctionFile: e.target.files[0] }))}
                        required
                      />
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsAddCourseOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                        Create Course
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <CardTitle className="text-lg">Total Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{totalStudents}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">${totalRevenue}</div>
                </CardContent>
              </Card>
            </div>

            {/* Existing courses management content */}
            <div className="space-y-6">
              {courses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription>{course.description}</CardDescription>
                        <p className="text-sm text-gray-600 mt-1">By {course.instructor}</p>
                      </div>
                      <Badge variant="outline">${course.price}</Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Students ({course.students.length})</h4>
                      {course.students.length === 0 ? (
                        <p className="text-gray-500 text-sm">No students enrolled yet</p>
                      ) : (
                        <div className="space-y-2">
                          {course.students.map((student) => (
                            <div
                              key={student.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                              <div>
                                <p className="font-medium">{student.name}</p>
                                <p className="text-sm text-gray-600">{student.email}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant={student.isPaid ? "default" : "secondary"}>
                                  {student.isPaid ? "Paid" : "Unpaid"}
                                </Badge>
                                {student.isPaid && (
                                  <Button
                                    size="sm"
                                    variant={student.isEnabled ? "destructive" : "default"}
                                    onClick={() => toggleStudentAccess(course.id, student.id)}
                                  >
                                    {student.isEnabled ? (
                                      <>
                                        <X className="h-4 w-4 mr-1" />
                                        Disable
                                      </>
                                    ) : (
                                      <>
                                        <Check className="h-4 w-4 mr-1" />
                                        Enable
                                      </>
                                    )}
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-end">
              <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add New User
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>Create a new user account with specific role</DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleAddUser} className="space-y-4">
                    <div>
                      <Label htmlFor="userName">Full Name</Label>
                      <Input
                        id="userName"
                        value={newUser.name}
                        onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="userEmail">Email Address</Label>
                      <Input
                        id="userEmail"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="userPassword">Password</Label>
                      <Input
                        id="userPassword"
                        type="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser((prev) => ({ ...prev, password: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="userRole">Role</Label>
                      <Select
                        value={newUser.role}
                        onValueChange={(value) => setNewUser((prev) => ({ ...prev, role: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="learner">Learner</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="instructor">Instructor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsAddUserOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                        Create User
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">{users.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Admins</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">
                    {users.filter((u) => u.role === "admin").length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Learners</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {users.filter((u) => u.role === "learner").length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UsersIcon className="h-5 w-5 mr-2" />
                  User Management
                </CardTitle>
                <CardDescription>Manage user accounts and roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <p className="text-xs text-gray-500">Created: {user.createdAt}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Select
                          value={user.role}
                          onValueChange={(value) => handleRoleChange(user.id, value)}
                          disabled={user.id === 1}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="learner">Learner</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="instructor">Instructor</SelectItem>
                          </SelectContent>
                        </Select>

                        <Badge
                          variant={
                            user.role === "admin" ? "destructive" : user.role === "instructor" ? "default" : "secondary"
                          }
                        >
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>

                        {user.id !== 1 && (
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteUser(user.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
