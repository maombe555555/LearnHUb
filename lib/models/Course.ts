import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a course title'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a course description'],
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a course price'],
    min: [0, 'Price cannot be negative'],
  },
  imageUrl: {
    type: String,
    default: '',
  },
  videoUrl: {
    type: String,
    default: '',
  },
  duration: {
    type: Number, // in minutes
    required: [true, 'Please provide course duration'],
    min: [1, 'Duration must be at least 1 minute'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Economics', 'Entrepreneurship', 'Business', 'Marketing', 'Finance'],
  },
  instructor: {
    type: String,
    required: [true, 'Please provide an instructor name'],
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Update the updatedAt field before saving
courseSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.Course || mongoose.model('Course', courseSchema) 