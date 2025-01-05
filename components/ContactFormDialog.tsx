import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialouge"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/app/Contact-form"

export function ContactFormDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Contact Us</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Us</DialogTitle>
          <DialogDescription>
            Fill out the form below to send us a message. We&apos;ll get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>
        <ContactForm />
      </DialogContent>
    </Dialog>
  )
}

