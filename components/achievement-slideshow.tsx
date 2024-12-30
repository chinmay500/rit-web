'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const achievements = [
  {
    id: 1,
    title: 'T.Y computer Engineering for getting Second Prize in logic Leap 2k24 at Dr.D.Y.Patil polytechnic pune',
    description: 'T.Y computer Engineering for getting Second Prize in logic Leap 2k24 at Dr.D.Y.Patil polytechnic pune.',
    image: '/ac1.jpeg',
  },
  {
    id: 2,
    title: 'First Prize in inter diploma sport in KHO-KHO ',
    description: 'First Prize in inter diploma sport in KHO-KHO.',
    image: '/ac2.jpeg',
  },
  {
    id: 3,
    title: 'Logic Leap 2k24 at D.Y. Patil College',
    description: 'AIML Students won prizes at Logic Leap 2k24 at D.Y. Patil College.',
    image: '/ac3.jpeg',
  },
]

export function AchievementSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % achievements.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative aspect-video bg-gray-200 overflow-hidden rounded-lg">
      {achievements.map((achievement, index) => (
        <div
          key={achievement.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={achievement.image}
            alt={`${achievement.title} - ${achievement.description}`}
            fill
            style={{ objectFit: 'contain' }}
          />
          <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 text-white p-4 rounded">
            <h3 className="text-2xl font-bold mb-2">{achievement.title}</h3>
            <p>{achievement.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

