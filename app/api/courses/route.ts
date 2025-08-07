import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Course from '@/lib/models/Course'

// GET /api/courses - Get all published courses
export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    let query: any = { isPublished: true }

    if (category) {
      query.category = category
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { instructor: { $regex: search, $options: 'i' } }
      ]
    }

    const courses = await Course.find(query).sort({ createdAt: -1 })

    return NextResponse.json({
      courses,
      count: courses.length
    })

  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/courses - Create a new course (admin only)
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const { title, description, price, category, instructor, duration, imageUrl, videoUrl } = body

    // Validate required fields
    if (!title || !description || !price || !category || !instructor || !duration) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const course = await Course.create({
      title,
      description,
      price,
      category,
      instructor,
      duration,
      imageUrl: imageUrl || '',
      videoUrl: videoUrl || '',
      isPublished: false
    })

    return NextResponse.json({
      course,
      message: 'Course created successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating course:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 