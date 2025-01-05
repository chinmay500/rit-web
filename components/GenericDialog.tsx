import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialouge"

interface GenericDialogProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function GenericDialog({ title, description, children }: GenericDialogProps) {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

