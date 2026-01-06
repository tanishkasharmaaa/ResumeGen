import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResume } from '@/contexts/ResumeContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Github,
  Briefcase
} from 'lucide-react';

export const PersonalInfoForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResume();
  const { personalInfo } = resumeData;

  const handleChange = (field: keyof typeof personalInfo, value: string) => {
    updateResumeData('personalInfo', { ...personalInfo, [field]: value });
  };

  const inputFields = [
    { id: 'fullName', label: 'Full Name', icon: User, placeholder: 'John Doe', type: 'text' },
    { id: 'title', label: 'Professional Title', icon: Briefcase, placeholder: 'Senior Software Engineer', type: 'text' },
    { id: 'email', label: 'Email', icon: Mail, placeholder: 'john@example.com', type: 'email' },
    { id: 'phone', label: 'Phone', icon: Phone, placeholder: '+1 (555) 123-4567', type: 'tel' },
    { id: 'location', label: 'Location', icon: MapPin, placeholder: 'San Francisco, CA', type: 'text' },
    { id: 'website', label: 'Website', icon: Globe, placeholder: 'https://johndoe.dev', type: 'url' },
    { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'linkedin.com/in/johndoe', type: 'url' },
    { id: 'github', label: 'GitHub', icon: Github, placeholder: 'github.com/johndoe', type: 'url' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-display font-bold text-foreground">
          Personal Information
        </h2>
        <p className="text-muted-foreground">
          Start with your basic contact details. This information will appear at the top of your resume.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {inputFields.map((field, index) => {
          const Icon = field.icon;
          return (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={field.id === 'fullName' || field.id === 'title' ? 'sm:col-span-2' : ''}
            >
              <Label htmlFor={field.id} className="text-sm font-medium mb-2 block">
                {field.label}
              </Label>
              <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={personalInfo[field.id as keyof typeof personalInfo] || ''}
                  onChange={(e) => handleChange(field.id as keyof typeof personalInfo, e.target.value)}
                  className="pl-10"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
