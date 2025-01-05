'use client'

import { useState } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Menu, X, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialouge"
import { AdmissionForm } from '@/app/admission-form'
import { Chatbot } from '@/components/Chatbot'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [chatbotOpen, setChatbotOpen] = useState(false)

  const NavItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} className="text-sm font-medium transition-colors hover:text-primary">
      {children}
    </Link>
  )

  const NavDropdown = ({ title, items }: { title: string; items: { href: string; label: string }[] }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 px-3">
          {title}
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {items.map((item, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link href={item.href} className="w-full">{item.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logorit.png"
            alt="RITP Logo"
            width={45}
            height={45}
            className="h-11 w-11"
            priority
          />
          <span className="text-xl font-bold">RITP</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
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
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Contact Us</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <AdmissionForm onSubmitSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
          <Dialog open={chatbotOpen} onOpenChange={setChatbotOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat with RITPal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <Chatbot />
            </DialogContent>
          </Dialog>
        </nav>

        <Button
          variant="ghost"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center gap-4 py-4">
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
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Contact Us</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <AdmissionForm onSubmitSuccess={() => setOpen(false)} />
              </DialogContent>
            </Dialog>
            <Dialog open={chatbotOpen} onOpenChange={setChatbotOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat with RITP
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <Chatbot />
              </DialogContent>
            </Dialog>
          </nav>
        </div>
      )}
    </header>
  )
}

