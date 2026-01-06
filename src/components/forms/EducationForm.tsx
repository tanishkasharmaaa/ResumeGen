import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, GraduationCap, MapPin, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useResume } from '@/contexts/ResumeContext';
import { Education } from '@/types/resume';

const emptyEducation: Omit<Education, 'id'> = {
  institution: '',
  degree: '',
  field: '',
  location: '',
  startDate: '',
  endDate: '',
  gpa: '',
  achievements: [],
};

export const EducationForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResume();
  const { education } = resumeData;
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Education, 'id'>>(emptyEducation);
  const [achievementInput, setAchievementInput] = useState('');

  const resetForm = () => {
    setFormData(emptyEducation);
    setAchievementInput('');
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!formData.institution || !formData.degree) return;
    
    if (editingId) {
      updateResumeData('education', education.map(edu => 
        edu.id === editingId ? { ...formData, id: editingId } : edu
      ));
    } else {
      const newEdu: Education = {
        ...formData,
        id: Date.now().toString(),
      };
      updateResumeData('education', [...education, newEdu]);
    }
    resetForm();
  };

  const handleEdit = (edu: Education) => {
    setFormData(edu);
    setEditingId(edu.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    updateResumeData('education', education.filter(edu => edu.id !== id));
  };

  const addAchievement = () => {
    if (!achievementInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      achievements: [...prev.achievements, achievementInput.trim()],
    }));
    setAchievementInput('');
  };

  const removeAchievement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-display font-bold text-foreground">
          Education
        </h2>
        <p className="text-muted-foreground">
          Add your educational background, degrees, and certifications.
        </p>
      </div>

      {/* Education List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {education.map((edu) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              layout
              className="bg-card border border-border rounded-lg p-4"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">
                    {edu.degree} in {edu.field}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5" />
                      {edu.institution}
                    </span>
                    {edu.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {edu.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  {edu.gpa && (
                    <span className="text-sm text-primary font-medium">GPA: {edu.gpa}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(edu)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(edu.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
              {edu.achievements.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {edu.achievements.map((achievement, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {education.length === 0 && !isAdding && (
        <div className="text-center py-8 text-muted-foreground">
          No education added yet. Add your educational background.
        </div>
      )}

      {/* Add/Edit Form */}
      <AnimatePresence mode="wait">
        {isAdding ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-card border border-primary/20 rounded-lg p-4 space-y-4"
          >
            <h3 className="font-medium text-foreground">
              {editingId ? 'Edit Education' : 'Add New Education'}
            </h3>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label className="text-xs mb-1.5 block">Institution</Label>
                <Input
                  placeholder="Stanford University"
                  value={formData.institution}
                  onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-xs mb-1.5 block">Degree</Label>
                <Input
                  placeholder="Bachelor of Science"
                  value={formData.degree}
                  onChange={(e) => setFormData(prev => ({ ...prev, degree: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-xs mb-1.5 block">Field of Study</Label>
                <Input
                  placeholder="Computer Science"
                  value={formData.field}
                  onChange={(e) => setFormData(prev => ({ ...prev, field: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-xs mb-1.5 block">Location</Label>
                <Input
                  placeholder="Stanford, CA"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-xs mb-1.5 block">GPA (Optional)</Label>
                <Input
                  placeholder="3.9/4.0"
                  value={formData.gpa || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, gpa: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-xs mb-1.5 block">Start Date</Label>
                <Input
                  placeholder="Sep 2018"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-xs mb-1.5 block">End Date</Label>
                <Input
                  placeholder="May 2022"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs block">Achievements / Activities (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Dean's List, Student Government..."
                  value={achievementInput}
                  onChange={(e) => setAchievementInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addAchievement()}
                />
                <Button type="button" variant="outline" onClick={addAchievement}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {formData.achievements.length > 0 && (
                <ul className="space-y-1 mt-2">
                  {formData.achievements.map((a, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 rounded px-2 py-1">
                      <span className="flex-1">{a}</span>
                      <button onClick={() => removeAchievement(i)} className="text-destructive hover:text-destructive/80">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSubmit} disabled={!formData.institution || !formData.degree}>
                {editingId ? 'Update' : 'Add'} Education
              </Button>
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Button variant="outline" onClick={() => setIsAdding(true)} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
