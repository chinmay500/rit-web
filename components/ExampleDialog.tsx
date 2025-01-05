import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialouge"

export function ExampleDialog() {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Example Dialog</DialogTitle>
          <DialogDescription>
            This is an example dialog with proper accessibility attributes.
          </DialogDescription>
        </DialogHeader>
        {/* Dialog content goes here */}
      </DialogContent>
    </Dialog>
  )
}

