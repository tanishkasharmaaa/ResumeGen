import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, Globe, ChevronLeft, ChevronRight, Upload, RotateCcw, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { PersonalInfoForm } from '@/components/forms/PersonalInfoForm';
import { SummaryForm } from '@/components/forms/SummaryForm';
import { SkillsForm } from '@/components/forms/SkillsForm';
import { ExperienceForm } from '@/components/forms/ExperienceForm';
import { ProjectsForm } from '@/components/forms/ProjectsForm';
import { EducationForm } from '@/components/forms/EducationForm';
import { AchievementsForm } from '@/components/forms/AchievementsForm';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { ResumeSettings } from '@/components/resume/ResumeSettings';
import { FeedbackModal } from '@/components/FeedbackModal';
import { ResumeProvider, useResume } from '@/contexts/ResumeContext';
import { FORM_STEPS, FormStep } from '@/types/resume';
import { downloadResumePDF, downloadPortfolioZIP, exportResumeJSON } from '@/lib/export';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const formComponents: Record<FormStep, React.FC> = {
  personal: PersonalInfoForm,
  summary: SummaryForm,
  skills: SkillsForm,
  experience: ExperienceForm,
  projects: ProjectsForm,
  education: EducationForm,
  achievements: AchievementsForm,
};

const BuilderContent: React.FC = () => {
  const { currentStep, setCurrentStep, resumeData, resumeSettings, portfolioSettings, resetData, importData } = useResume();
  const [showPreview, setShowPreview] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentStepIndex = FORM_STEPS.findIndex(s => s.id === currentStep);
  const FormComponent = formComponents[currentStep];

  const goToNextStep = () => {
    if (currentStepIndex < FORM_STEPS.length - 1) {
      setCurrentStep(FORM_STEPS[currentStepIndex + 1].id);
    }
  };

  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(FORM_STEPS[currentStepIndex - 1].id);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      await downloadResumePDF('resume-preview', `${resumeData.personalInfo.fullName || 'resume'}.pdf`);
      toast.success('Resume downloaded successfully!');
    } catch {
      toast.error('Failed to download resume');
    }
  };

  const handleDownloadPortfolio = async () => {
    try {
      await downloadPortfolioZIP(resumeData, portfolioSettings, `${resumeData.personalInfo.fullName || 'portfolio'}-website.zip`);
      toast.success('Portfolio downloaded! Ready to deploy.');
    } catch {
      toast.error('Failed to download portfolio');
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = importData(e.target?.result as string);
          if (result) {
            toast.success('Data imported successfully!');
          } else {
            toast.error('Invalid file format');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 lg:relative lg:z-0 transition-transform lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenPreview={() => setShowPreview(true)}
          onOpenFeedback={() => setShowFeedback(true)}
        />

        <div className="flex-1 flex overflow-hidden">
          {/* Form Area */}
          <main className="flex-1 overflow-y-auto p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
              <AnimatePresence mode="wait">
                <FormComponent key={currentStep} />
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={goToPrevStep}
                  disabled={currentStepIndex === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <span className="text-sm text-muted-foreground">
                  Step {currentStepIndex + 1} of {FORM_STEPS.length}
                </span>

                {currentStepIndex < FORM_STEPS.length - 1 ? (
                  <Button onClick={goToNextStep}>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={() => setShowPreview(true)} className="gradient-primary text-primary-foreground">
                    Preview & Download
                  </Button>
                )}
              </div>
            </div>
          </main>

          {/* Desktop Preview Panel */}
          <aside className="hidden xl:flex w-[500px] border-l border-border flex-col bg-muted/30 overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-display font-semibold text-foreground">Live Preview</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
                  <FileText className="w-4 h-4 mr-2" />
                  PDF
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownloadPortfolio}>
                  <Globe className="w-4 h-4 mr-2" />
                  Portfolio
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="transform scale-[0.6] origin-top">
                <div id="resume-preview">
                  <ResumePreview data={resumeData} settings={resumeSettings} className="w-[210mm]" />
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-border">
              <ResumeSettings />
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 xl:hidden"
              onClick={() => setShowPreview(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              className="fixed inset-x-0 bottom-0 top-16 bg-card border-t border-border rounded-t-2xl z-50 xl:hidden overflow-hidden flex flex-col"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-display font-semibold">Preview & Export</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)}>Close</Button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4 mb-4">
                  <Button className="w-full gradient-primary" onClick={handleDownloadPDF}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume PDF
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleDownloadPortfolio}>
                    <Globe className="w-4 h-4 mr-2" />
                    Download Portfolio Website
                  </Button>
                </div>
                <ResumeSettings />
                <div className="mt-4 transform scale-50 origin-top">
                  <div id="resume-preview-mobile">
                    <ResumePreview data={resumeData} settings={resumeSettings} />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <FeedbackModal isOpen={showFeedback} onClose={() => setShowFeedback(false)} />
    </div>
  );
};

const Index = () => {
  return (
    <ResumeProvider>
      <BuilderContent />
    </ResumeProvider>
  );
};

export default Index;
