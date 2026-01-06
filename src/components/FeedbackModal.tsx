import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";


interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
 console.log(import.meta.env.VITE_EMAILJS_TEMPLATE_ID)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setIsSubmitting(true);

    try {
      // EmailJS configuration - users need to set up their own service
      // For demo purposes, we'll just show a success message
      // In production, configure EmailJS with your service ID, template ID, and public key

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name || 'Anonymous',
          from_email: formData.email || 'not provided',
          message: formData.message,
          rating: formData.rating || 'not rated',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Thank you for your feedback! 💖");
      setFormData({ name: "", email: "", message: "", rating: 0 });
      onClose();
    } catch (error) {
      console.log(error)
      toast.error("Failed to send feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card border border-border rounded-xl shadow-xl z-50 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-accent" />
                <h2 className="text-lg font-display font-semibold text-foreground">
                  Send Feedback
                </h2>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Rating */}
              <div className="space-y-2">
                <Label className="text-sm">
                  How's your experience? (Optional)
                </Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, rating: star }))
                      }
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          star <= formData.rating
                            ? "fill-accent text-accent"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name" className="text-sm mb-1.5 block">
                    Name (Optional)
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm mb-1.5 block">
                    Email (Optional)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-sm mb-1.5 block">
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us what you think, report a bug, or suggest a feature..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  rows={4}
                  className="resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full gradient-coral text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Feedback
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Your feedback helps us improve ResumeGen for everyone!
              </p>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
