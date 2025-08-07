"use client"

import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Startup Founder",
    content:
      "LearnHub's entrepreneurship courses helped me launch my tech startup. The practical insights were invaluable!",
    rating: 5,
    company: "TechFlow Solutions",
  },
  {
    name: "Mike Chen",
    role: "Economics Student",
    content: "The microeconomics course made complex concepts so easy to understand. Best $5 I've ever spent!",
    rating: 5,
    company: "Harvard Business School",
  },
  {
    name: "Emma Rodriguez",
    role: "Small Business Owner",
    content: "The digital marketing course tripled my online sales. These courses are pure gold for entrepreneurs.",
    rating: 5,
    company: "Rodriguez Consulting",
  },
  {
    name: "David Kim",
    role: "Investment Analyst",
    content:
      "The financial markets course gave me insights I use daily in my investment decisions. Highly recommended!",
    rating: 5,
    company: "Goldman Sachs",
  },
  {
    name: "Lisa Thompson",
    role: "Business Consultant",
    content: "I've recommended LearnHub to all my clients. The business model innovation course is a game-changer.",
    rating: 5,
    company: "Thompson Business Advisory",
  },
  {
    name: "Robert Wilson",
    role: "E-commerce Entrepreneur",
    content:
      "From economics theory to practical business application - these courses cover everything you need to succeed.",
    rating: 5,
    company: "Wilson E-commerce",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Success Stories from Our Students</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how our economics and entrepreneurship courses have transformed careers and businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                  <div className="text-sm text-blue-600">{testimonial.company}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
