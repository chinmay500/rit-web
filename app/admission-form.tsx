import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const submitAdmissionForm = async (data: FormData): Promise<void> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log("Form data submitted:", data);
};

const AdmissionForm = ({ onSubmitSuccess }: { onSubmitSuccess?: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    setIsSubmitting(true);
    try {
      await submitAdmissionForm(values)
      toast.success("Form submitted successfully. We'll get back to you soon!");
      reset()
      if (onSubmitSuccess) {
        onSubmitSuccess()
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("There was a problem submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
        />
        {errors.name && <p>Name is required</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
        />
        {errors.email && <p>Email is required</p>}
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          {...register("phone", { required: true })}
        />
        {errors.phone && <p>Phone is required</p>}
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          {...register("message", { required: true })}
        />
        {errors.message && <p>Message is required</p>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default AdmissionForm;

