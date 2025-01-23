import React from 'react'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface MobileHeaderProps {
  onBack: () => void
  onRefresh: () => void
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ onBack, onRefresh }) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-background z-50 flex items-center justify-between px-4 md:hidden">
      <Button variant="ghost" size="icon" onClick={onBack}>
        <ArrowLeft className="h-6 w-6" />
      </Button>
      <h1 className="text-lg font-semibold">RITP BOT</h1>
      <Button variant="ghost" size="icon" onClick={onRefresh}>
        <RotateCcw className="h-6 w-6" />
      </Button>
    </div>
  )
}
