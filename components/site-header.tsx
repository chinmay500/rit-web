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
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialouge"
import { AdmissionForm } from '@/app/admission-form'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

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
        
        <nav className="flex items-center gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 px-3">
                HOME
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/" className="w-full">Homepage</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            ABOUT US
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 px-3">
                COURSES
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/departments/mechanical" className="w-full">Mechanical Engineering</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/departments/aiml" className="w-full">AIML Engineering</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/departments/civil" className="w-full">Civil Engineering</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/departments/computer" className="w-full">Computer Engineering</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 px-3">
                EVENTS
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/events" className="w-full"> Events</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link href="/blog" className="text-sm font-medium transition-colors hover:text-primary">
            BLOG
          </Link>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Contact Us</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <AdmissionForm onSubmitSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </nav>
      </div>
    </header>
  )
}

