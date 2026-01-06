import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, GripVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useResume } from '@/contexts/ResumeContext';
import { Skill } from '@/types/resume';
import { cn } from '@/lib/utils';

const skillLevels: Skill['level'][] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const skillCategories = [
  'Programming Languages',
  'Frameworks & Libraries',
  'Tools & Platforms',
  'Soft Skills',
  'Languages',
  'Other',
];

const levelColors: Record<Skill['level'], string> = {
  Beginner: 'bg-muted text-muted-foreground',
  Intermediate: 'bg-primary/20 text-primary',
  Advanced: 'bg-success/20 text-success',
  Expert: 'bg-accent/20 text-accent',
};

export const SkillsForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResume();
  const { skills } = resumeData;
  
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Intermediate' as Skill['level'], category: '' });

  const addSkill = () => {
    if (!newSkill.name.trim()) return;
    
    const skill: Skill = {
      id: Date.now().toString(),
      ...newSkill,
    };
    
    updateResumeData('skills', [...skills, skill]);
    setNewSkill({ name: '', level: 'Intermediate', category: '' });
  };

  const removeSkill = (id: string) => {
    updateResumeData('skills', skills.filter(s => s.id !== id));
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-display font-bold text-foreground">
          Skills
        </h2>
        <p className="text-muted-foreground">
          Add your technical and soft skills with proficiency levels.
        </p>
      </div>

      {/* Add Skill Form */}
      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <h3 className="text-sm font-medium text-foreground">Add New Skill</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="skillName" className="text-xs mb-1.5 block">
              Skill Name
            </Label>
            <Input
              id="skillName"
              placeholder="React, Python, Leadership..."
              value={newSkill.name}
              onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && addSkill()}
            />
          </div>
          <div>
            <Label htmlFor="skillLevel" className="text-xs mb-1.5 block">
              Level
            </Label>
            <Select
              value={newSkill.level}
              onValueChange={(value: Skill['level']) => setNewSkill(prev => ({ ...prev, level: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {skillLevels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="skillCategory" className="text-xs mb-1.5 block">
              Category
            </Label>
            <Select
              value={newSkill.category}
              onValueChange={(value) => setNewSkill(prev => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {skillCategories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={addSkill} disabled={!newSkill.name.trim()} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {/* Skills List */}
      <div className="space-y-6">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <motion.div
            key={category}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence mode="popLayout">
                {categorySkills.map(skill => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    layout
                    className={cn(
                      "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
                      levelColors[skill.level]
                    )}
                  >
                    <span>{skill.name}</span>
                    <span className="text-xs opacity-70">• {skill.level}</span>
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="ml-1 p-0.5 rounded-full hover:bg-foreground/10 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}

        {skills.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No skills added yet. Start by adding your first skill above.
          </div>
        )}
      </div>
    </motion.div>
  );
};
