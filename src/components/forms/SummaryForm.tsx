import React from 'react';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useResume } from '@/contexts/ResumeContext';

export const SummaryForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResume();
  const { professionalSummary } = resumeData;

  const handleChange = (value: string) => {
    updateResumeData('professionalSummary', { summary: value });
  };

  const characterCount = professionalSummary.summary.length;
  const maxChars = 500;
  const isNearLimit = characterCount > maxChars * 0.8;
  const isOverLimit = characterCount > maxChars;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-display font-bold text-foreground">
          Professional Summary
        </h2>
        <p className="text-muted-foreground">
          Write a compelling 2-4 sentence summary that highlights your experience, skills, and career goals.
        </p>
      </div>

      <div className="space-y-3">
        <Label htmlFor="summary" className="text-sm font-medium">
          Summary
        </Label>
        <Textarea
          id="summary"
          placeholder="Experienced software engineer with 5+ years of expertise in building scalable web applications. Passionate about clean code, user experience, and mentoring junior developers..."
          value={professionalSummary.summary}
          onChange={(e) => handleChange(e.target.value)}
          rows={6}
          className="resize-none"
        />
        <div className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            Tips: Focus on your unique value proposition and quantifiable achievements.
          </div>
          <div className={`text-xs font-medium ${
            isOverLimit ? 'text-destructive' : 
            isNearLimit ? 'text-accent' : 
            'text-muted-foreground'
          }`}>
            {characterCount}/{maxChars}
          </div>
        </div>
      </div>

      <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
        <h3 className="text-sm font-medium text-foreground">Example Summaries</h3>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => handleChange("Results-driven software engineer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies. Led a team that increased platform performance by 40% and reduced deployment time by 60%.")}
            className="w-full text-left p-3 rounded-md bg-card hover:bg-card/80 border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            💻 Software Engineer
          </button>
          <button
            type="button"
            onClick={() => handleChange("Creative product designer with 4+ years of experience crafting intuitive digital experiences. Skilled in user research, prototyping, and design systems. Successfully redesigned flagship product resulting in 25% increase in user engagement.")}
            className="w-full text-left p-3 rounded-md bg-card hover:bg-card/80 border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            🎨 Product Designer
          </button>
          <button
            type="button"
            onClick={() => handleChange("Data analyst with expertise in transforming complex datasets into actionable business insights. Proficient in Python, SQL, and Tableau. Developed predictive models that saved the company $2M annually in operational costs.")}
            className="w-full text-left p-3 rounded-md bg-card hover:bg-card/80 border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            📊 Data Analyst
          </button>
        </div>
      </div>
    </motion.div>
  );
};
