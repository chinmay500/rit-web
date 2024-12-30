import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000

// Using enum for better type safety
export enum ToastActionType {
  ADD_TOAST = "ADD_TOAST",
  UPDATE_TOAST = "UPDATE_TOAST",
  DISMISS_TOAST = "DISMISS_TOAST",
  REMOVE_TOAST = "REMOVE_TOAST",
}

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

type Action =
  | {
      type: ToastActionType.ADD_TOAST
      toast: ToasterToast
    }
  | {
      type: ToastActionType.UPDATE_TOAST
      toast: Partial<ToasterToast>
    }
  | {
      type: ToastActionType.DISMISS_TOAST
      toastId?: ToasterToast["id"]
    }
  | {
      type: ToastActionType.REMOVE_TOAST
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

// Using WeakMap for better garbage collection
const toastTimeouts = new WeakMap<ToasterToast, ReturnType<typeof setTimeout>>()

let count = 0

function genId(): string {
  count = (count + 1) % Number.MAX_VALUE
  return `toast-${count}`
}

const addToRemoveQueue = (toast: ToasterToast) => {
  if (toastTimeouts.has(toast)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toast)
    dispatch({
      type: ToastActionType.REMOVE_TOAST,
      toastId: toast.id,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toast, timeout)
}

const clearToastTimeout = (toast: ToasterToast) => {
  const timeout = toastTimeouts.get(toast)
  if (timeout) {
    clearTimeout(timeout)
    toastTimeouts.delete(toast)
  }
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ToastActionType.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case ToastActionType.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case ToastActionType.DISMISS_TOAST: {
      const { toastId } = action

      if (toastId) {
        const toast = state.toasts.find((t) => t.id === toastId)
        if (toast) {
          addToRemoveQueue(toast)
        }
      } else {
        state.toasts.forEach(addToRemoveQueue)
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case ToastActionType.REMOVE_TOAST:
      if (action.toastId === undefined) {
        // Clean up all timeouts when removing all toasts
        state.toasts.forEach(clearToastTimeout)
        return {
          ...state,
          toasts: [],
        }
      }
      // Clean up specific toast timeout
      const toastToRemove = state.toasts.find((t) => t.id === action.toastId)
      if (toastToRemove) {
        clearToastTimeout(toastToRemove)
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Set<(state: State) => void> = new Set()

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: ToastActionType.UPDATE_TOAST,
      toast: { ...props, id },
    })

  const dismiss = () => dispatch({ type: ToastActionType.DISMISS_TOAST, toastId: id })

  dispatch({
    type: ToastActionType.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
        props.onOpenChange?.(open)
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.add(setState)
    return () => {
      listeners.delete(setState)
    }
  }, [])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: ToastActionType.DISMISS_TOAST, toastId }),
  }
}

export { useToast, toast }

