import * as React from "react"
import { ToasterProps as SonnerToasterProps, Toast as SonnerToast } from "sonner"

export interface ToasterProps extends Omit<SonnerToasterProps, 'theme'> {
  theme?: 'system' | 'light' | 'dark'
}

export interface Toast extends SonnerToast {
  id: string | number
  title?: React.ReactNode
  description?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
}

