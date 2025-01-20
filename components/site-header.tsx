'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialouge"
import { ChevronDown, Menu, X, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { ContactForm } from '@/app/Contact-form'

export function SiteHeader() {
  const [contactOpen, setContactOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const router = useRouter()

  const NavItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} className="text-sm font-medium transition-colors hover:text-primary px-3 py-2" onClick={() => setMobileMenuOpen(false)}>
      {children}
    </Link>
  )

  const NavDropdown = ({ title, items }: { title: string; items: { href: string; label: string }[] }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-9 px-3 py-2 text-sm font-medium">
          {title}
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {items.map((item, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link href={item.href} className="w-full px-3 py-2" onClick={() => setMobileMenuOpen(false)}>{item.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  const handleChatClick = () => {
    const currentPath = window.location.pathname
    router.push(`/chatbot?returnTo=${encodeURIComponent(currentPath)}`)
    setMobileMenuOpen(false)
  }

  const controlNavbar = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
        setIsVisible(false)
      } else { // if scroll up show the navbar
        setIsVisible(true)
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY)
    }
  }, [lastScrollY])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar)

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar)
      }
    }
  }, [controlNavbar])

  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logorit.png"
            alt="RITP Logo"
            width={40}
            height={40}
            className="h-10 w-10"
            priority
          />
          <span className="text-lg font-bold">RITP</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <NavItem href="/">HOME</NavItem>
          <NavItem href="/about-us">ABOUT US</NavItem>
          
          <NavDropdown 
            title="COURSES" 
            items={[
              { href: "/departments/mechanical", label: "Mechanical Engineering" },
              { href: "/departments/aiml", label: "AIML Engineering" },
              { href: "/departments/civil", label: "Civil Engineering" },
              { href: "/departments/computer", label: "Computer Engineering" },
            ]} 
          />
          
          <NavDropdown 
            title="EVENTS" 
            items={[
              { href: "/events", label: "Events" },
            ]} 
          />
          
          <NavItem href="/blog">BLOG</NavItem>
          
          <div className="flex items-center space-x-4">
            <Dialog open={contactOpen} onOpenChange={setContactOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">Contact Us</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <ContactForm onSubmitSuccess={() => setContactOpen(false)} />
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm" onClick={handleChatClick}>
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat with RITP BOT
            </Button>
          </div>
        </nav>

        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center gap-2 py-4 bg-background border-b">
            <NavItem href="/">HOME</NavItem>
            <NavItem href="/about-us">ABOUT US</NavItem>
            <NavDropdown 
              title="COURSES" 
              items={[
                { href: "/departments/mechanical", label: "Mechanical Engineering" },
                { href: "/departments/aiml", label: "AIML Engineering" },
                { href: "/departments/civil", label: "Civil Engineering" },
                { href: "/departments/computer", label: "Computer Engineering" },
              ]} 
            />
            <NavDropdown 
              title="EVENTS" 
              items={[
                { href: "/events", label: "Events" },
              ]} 
            />
            <NavItem href="/blog">BLOG</NavItem>
            <div className="flex flex-col items-center gap-2 mt-2">
              <Dialog open={contactOpen} onOpenChange={setContactOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">Contact Us</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <ContactForm onSubmitSuccess={() => {
                    setContactOpen(false)
                    setMobileMenuOpen(false)
                  }} />
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="sm" onClick={handleChatClick}>
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat with RITP BOT
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

