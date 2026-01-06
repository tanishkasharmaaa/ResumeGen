import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Award, Calendar, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useResume } from '@/contexts/ResumeContext';
import { Achievement } from '@/types/resume';

const emptyAchievement: Omit<Achievement, 'id'> = {
  title: '',
  issuer: '',
  date: '',
  description: '',
  url: '',
};

export const AchievementsForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResume();
  const { achievements } = resumeData;
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Achievement, 'id'>>(emptyAchievement);

  const resetForm = () => {
    setFormData(emptyAchievement);
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!formData.title) return;
    
    if (editingId) {
      updateResumeData('achievements', achievements.map(ach => 
        ach.id === editingId ? { ...formData, id: editingId } : ach
      ));
    } else {
      const newAch: Achievement = {
        ...formData,
        id: Date.now().toString(),
      };
      updateResumeData('achievements', [...achievements, newAch]);
    }
    resetForm();
  };

  const handleEdit = (ach: Achievement) => {
    setFormData(ach);
    setEditingId(ach.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    updateResumeData('achievements', achievements.filter(ach => ach.id !== id));
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
          Achievements & Certifications
        </h2>
        <p className="text-muted-foreground">
          Add your certifications, awards, publications, or other notable achievements.
        </p>
      </div>

      {/* Achievements List */}
      <div className="grid gap-4 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {achievements.map((ach) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              layout
              className="bg-card border border-border rounded-lg p-4 space-y-2"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{ach.title}</h3>
                    <p className="text-xs text-muted-foreground">{ach.issuer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleEdit(ach)}>
                    <Edit2 className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDelete(ach.id)}>
                    <Trash2 className="w-3.5 h-3.5 text-destructive" />
                  </Button>
                </div>
              </div>
              
              {ach.description && (
                <p className="text-sm text-muted-foreground pl-[52px]">{ach.description}</p>
              )}
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground pl-[52px]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {ach.date}
                </span>
                {ach.url && (
                  <a 
                    href={ach.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {achievements.length === 0 && !isAdding && (
        <div className="text-center py-8 text-muted-foreground">
          No achievements added yet. Add your certifications and awards.
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
              {editingId ? 'Edit Achievement' : 'Add New Achievement'}
            </h3>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label className="text-xs mb-1.5 block">Title</Label>
                <Input
                  placeholder="AWS Certified Solutions Architect"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-xs mb-1.5 block">Issuer</Label>
                <Input
                  placeholder="Amazon Web Services"
                  value={formData.issuer}
                  onChange={(e) => setFormData(prev => ({ ...prev, issuer: e.target.value }))}
                />
              </div>
              <div>
                <Label className="text-xs mb-1.5 block">Date</Label>
                <Input
                  placeholder="March 2023"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div className="sm:col-span-2">
                <Label className="text-xs mb-1.5 block">Description (Optional)</Label>
                <Textarea
                  placeholder="Brief description of the achievement..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
                />
              </div>
              <div className="sm:col-span-2">
                <Label className="text-xs mb-1.5 block">URL (Optional)</Label>
                <Input
                  placeholder="https://credential.url"
                  value={formData.url || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSubmit} disabled={!formData.title}>
                {editingId ? 'Update' : 'Add'} Achievement
              </Button>
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Button variant="outline" onClick={() => setIsAdding(true)} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Achievement
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
