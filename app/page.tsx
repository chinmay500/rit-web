import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { AchievementSlideshow } from "@/components/achievement-slideshow"
// import { SiteHeader } from "@/components/site-header"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary-50 to-primary-100">
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 md:h-32 md:w-32 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          }
        >
          <HeroSection />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <AchievementsSection />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <ImportanceSection />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <RecruitersSection />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <TieUpSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

