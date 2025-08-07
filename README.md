# LearnHub - Fullstack Learning Platform

A modern fullstack learning platform built with Next.js, MongoDB, and TypeScript for economics and entrepreneurship education.

## 🚀 Features

- **User Authentication**: JWT-based authentication with registration and login
- **Course Management**: CRUD operations for courses with MongoDB
- **User Enrollment**: Track user course enrollments and progress
- **Responsive Design**: Modern UI with Tailwind CSS and Radix UI components
- **Real-time Updates**: Dynamic course loading and user state management
- **Admin Dashboard**: Course management for administrators

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form handling and validation

### Backend
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Next.js API Routes** - Serverless API endpoints

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/maombe555555/LearnHUb.git
   cd LearnHUb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

### User Model
```typescript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (USER/ADMIN),
  enrolledCourses: [Course IDs],
  createdAt: Date,
  updatedAt: Date
}
```

### Course Model
```typescript
{
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  videoUrl: String,
  duration: Number (minutes),
  category: String,
  instructor: String,
  isPublished: Boolean,
  enrolledStudents: [User IDs],
  createdAt: Date,
  updatedAt: Date
}
```

### Enrollment Model
```typescript
{
  userId: ObjectId,
  courseId: ObjectId,
  enrolledAt: Date,
  completed: Boolean,
  progress: Number (percentage),
  lastAccessed: Date
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Courses
- `GET /api/courses` - Get all published courses
- `GET /api/courses/[id]` - Get specific course
- `POST /api/courses` - Create new course (admin)
- `PUT /api/courses/[id]` - Update course (admin)
- `DELETE /api/courses/[id]` - Delete course (admin)

### Enrollments
- `POST /api/enrollments` - Enroll user in course
- `GET /api/enrollments?userId=id` - Get user enrollments

### User Profile
- `GET /api/user/profile` - Get user profile (authenticated)
- `PUT /api/user/profile` - Update user profile (authenticated)

## 🎨 UI Components

The application uses a modern component library built with:
- **Radix UI** for accessible primitives
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Custom components** for specific functionality

## 🔐 Authentication Flow

1. **Registration**: Users can create accounts with email/password
2. **Login**: JWT token-based authentication
3. **Protected Routes**: API endpoints require valid JWT tokens
4. **State Management**: React Context for auth state

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### MongoDB Atlas
1. Create a MongoDB Atlas cluster
2. Get your connection string
3. Add to environment variables

## 📝 Environment Variables

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/learnhub
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/maombe555555/LearnHUb/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

---

**Built with ❤️ using Next.js, MongoDB, and TypeScript**