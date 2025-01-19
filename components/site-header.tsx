'use client'

import { useState } from 'react'
import Link from "next/link"
import Image from 'next/image'
// import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialouge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Menu, X, MessageCircle } from 'lucide-react'
import { ContactForm } from '@/app/Contact-form'

type NavItemProps = {
  href: string
  children: React.ReactNode
}

type NavDropdownProps = {
  title: string
  items: { href: string; label: string }[]
}

const NavItem = ({ href, children }: NavItemProps) => (
  <Link href={href} className="text-sm font-medium transition-colors hover:text-primary px-3 py-2">
    {children}
  </Link>
)

const NavDropdown = ({ title, items }: NavDropdownProps) => (
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
          <Link href={item.href} className="w-full px-3 py-2">{item.label}</Link>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
)

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // const router = useRouter()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">Contact Us</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <ContactForm onSubmitSuccess={() => setOpen(false)} />
              </DialogContent>
            </Dialog>
            <Link href="/chatbot" passHref>
              <Button variant="outline" size="sm">
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat with RITP BOT
              </Button>
            </Link>
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
        <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden">
          <nav className="flex flex-col items-center gap-2 py-4">
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
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">Contact Us</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <ContactForm onSubmitSuccess={() => setOpen(false)} />
                </DialogContent>
              </Dialog>
              <Link href="/chatbot" passHref>
                <Button variant="outline" size="sm">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat with RITP BOT
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

