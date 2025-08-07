import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Enrollment from '@/lib/models/Enrollment'
import Course from '@/lib/models/Course'
import User from '@/lib/models/User'

// POST /api/enrollments - Enroll a user in a course
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { userId, courseId } = await request.json()

    if (!userId || !courseId) {
      return NextResponse.json(
        { error: 'User ID and Course ID are required' },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await User.findById(userId)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if course exists
    const course = await Course.findById(courseId)
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      userId,
      courseId
    })

    if (existingEnrollment) {
      return NextResponse.json(
        { error: 'User is already enrolled in this course' },
        { status: 400 }
      )
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      userId,
      courseId,
      enrolledAt: new Date(),
      completed: false,
      progress: 0
    })

    // Add course to user's enrolled courses
    await User.findByIdAndUpdate(userId, {
      $addToSet: { enrolledCourses: courseId }
    })

    // Add user to course's enrolled students
    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { enrolledStudents: userId }
    })

    return NextResponse.json({
      enrollment,
      message: 'Enrolled successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Error enrolling user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/enrollments - Get user enrollments
export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const enrollments = await Enrollment.find({ userId })
      .populate('courseId', 'title description imageUrl duration instructor')
      .sort({ enrolledAt: -1 })

    return NextResponse.json({
      enrollments,
      count: enrollments.length
    })

  } catch (error) {
    console.error('Error fetching enrollments:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 