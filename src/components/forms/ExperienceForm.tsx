import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, ChevronDown, Building2, Calendar, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useResume } from '@/contexts/ResumeContext';
import { Experience } from '@/types/resume';
import { cn } from '@/lib/utils';

const emptyExperience: Omit<Experience, 'id'> = {
  company: '',
  position: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
  highlights: [],
};

export const ExperienceForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResume();
  const { experience } = resumeData;
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Experience, 'id'>>(emptyExperience);
  const [highlightInput, setHighlightInput] = useState('');

  const resetForm = () => {
    setFormData(emptyExperience);
    setHighlightInput('');
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!formData.company || !formData.position) return;
    
    if (editingId) {
      updateResumeData('experience', experience.map(exp => 
        exp.id === editingId ? { ...formData, id: editingId } : exp
      ));
    } else {
      const newExp: Experience = {
        ...formData,
        id: Date.now().toString(),
      };
      updateResumeData('experience', [...experience, newExp]);
    }
    resetForm();
  };

  const handleEdit = (exp: Experience) => {
    setFormData(exp);
    setEditingId(exp.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    updateResumeData('experience', experience.filter(exp => exp.id !== id));
  };

  const addHighlight = () => {
    if (!highlightInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, highlightInput.trim()],
    }));
    setHighlightInput('');
  };

  const removeHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
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
          Work Experience
        </h2>
        <p className="text-muted-foreground">
          Add your professional experience, starting with the most recent.
        </p>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              layout
              className="bg-card border border-border rounded-lg p-4"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">{exp.position}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      {exp.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(exp)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(exp.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
              {exp.description && (
                <p className="mt-2 text-sm text-muted-foreground">{exp.description}</p>
              )}
              {exp.highlights.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

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
              {editingId ? 'Edit Experience' : 'Add New Experience'}
            </h3>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="text-xs mb-1.5 block">Position / Title</Label>
                <Input
                  placeholder="Software Engineer"
                  value={formData.position}
                  onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-xs mb-1.5 block">Company</Label>
                <Input
                  placeholder="Google"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-xs mb-1.5 block">Location</Label>
                <Input
                  placeholder="San Francisco, CA"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs mb-1.5 block">Start Date</Label>
                  <Input
                    placeholder="Jan 2020"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label className="text-xs mb-1.5 block">End Date</Label>
                  <Input
                    placeholder="Dec 2023"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    disabled={formData.current}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="current"
                checked={formData.current}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, current: !!checked }))}
              />
              <Label htmlFor="current" className="text-sm">I currently work here</Label>
            </div>

            <div>
              <Label className="text-xs mb-1.5 block">Description</Label>
              <Textarea
                placeholder="Brief description of your role and responsibilities..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs block">Key Highlights / Achievements</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Increased sales by 20%..."
                  value={highlightInput}
                  onChange={(e) => setHighlightInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addHighlight()}
                />
                <Button type="button" variant="outline" onClick={addHighlight}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {formData.highlights.length > 0 && (
                <ul className="space-y-1 mt-2">
                  {formData.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 rounded px-2 py-1">
                      <span className="flex-1">{h}</span>
                      <button onClick={() => removeHighlight(i)} className="text-destructive hover:text-destructive/80">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSubmit} disabled={!formData.company || !formData.position}>
                {editingId ? 'Update' : 'Add'} Experience
              </Button>
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Button variant="outline" onClick={() => setIsAdding(true)} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
