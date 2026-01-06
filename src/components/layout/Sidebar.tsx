import React from "react";
import { motion } from "framer-motion";
import {
  User,
  FileText,
  Zap,
  Briefcase,
  FolderOpen,
  GraduationCap,
  Award,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useResume } from "@/contexts/ResumeContext";
import { FormStep, FORM_STEPS } from "@/types/resume";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  User,
  FileText,
  Zap,
  Briefcase,
  FolderOpen,
  GraduationCap,
  Award,
};

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { currentStep, setCurrentStep, resumeData } = useResume();

  const getStepStatus = (
    stepId: FormStep
  ): "complete" | "current" | "incomplete" => {
    if (stepId === currentStep) return "current";

    switch (stepId) {
      case "personal":
        return resumeData.personalInfo.fullName ? "complete" : "incomplete";
      case "summary":
        return resumeData.professionalSummary.summary
          ? "complete"
          : "incomplete";
      case "skills":
        return resumeData.skills.length > 0 ? "complete" : "incomplete";
      case "experience":
        return resumeData.experience.length > 0 ? "complete" : "incomplete";
      case "projects":
        return resumeData.projects.length > 0 ? "complete" : "incomplete";
      case "education":
        return resumeData.education.length > 0 ? "complete" : "incomplete";
      case "achievements":
        return resumeData.achievements.length > 0 ? "complete" : "incomplete";
      default:
        return "incomplete";
    }
  };

  return (
    <aside
      className={cn(
        "w-64 bg-card border-r border-border flex flex-col h-full",
        className
      )}
    >
      <div className="p-6 border-b border-border">
        <h1 className="font-display text-xl font-bold gradient-text">
          ResumeGen
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Build your future</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {FORM_STEPS.map((step, index) => {
          const Icon = iconMap[step.icon];
          const status = getStepStatus(step.id);

          return (
            <motion.button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all",
                status === "current" &&
                  "bg-primary/10 text-primary border border-primary/20",
                status === "complete" && "text-foreground hover:bg-secondary",
                status === "incomplete" &&
                  "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                  status === "current" &&
                    "gradient-primary text-primary-foreground",
                  status === "complete" && "bg-success text-success-foreground",
                  status === "incomplete" && "bg-muted text-muted-foreground"
                )}
              >
                {status === "complete" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium block">{step.label}</span>
                <span className="text-xs text-muted-foreground">
                  Step {index + 1} of {FORM_STEPS.length}
                </span>
              </div>
            </motion.button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          Auto-saved locally
        </div>
      </div>
    </aside>
  );
};
