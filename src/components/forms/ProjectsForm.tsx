import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Github, ExternalLink, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useResume } from '@/contexts/ResumeContext';
import { Project } from '@/types/resume';

const emptyProject: Omit<Project, 'id'> = {
  name: '',
  description: '',
  technologies: [],
  githubUrl: '',
  liveUrl: '',
};

export const ProjectsForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResume();
  const { projects } = resumeData;
  
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Project, 'id'>>(emptyProject);
  const [techInput, setTechInput] = useState('');

  const resetForm = () => {
    setFormData(emptyProject);
    setTechInput('');
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!formData.name) return;
    
    if (editingId) {
      updateResumeData('projects', projects.map(proj => 
        proj.id === editingId ? { ...formData, id: editingId } : proj
      ));
    } else {
      const newProj: Project = {
        ...formData,
        id: Date.now().toString(),
      };
      updateResumeData('projects', [...projects, newProj]);
    }
    resetForm();
  };

  const handleEdit = (proj: Project) => {
    setFormData(proj);
    setEditingId(proj.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    updateResumeData('projects', projects.filter(proj => proj.id !== id));
  };

  const addTech = () => {
    if (!techInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      technologies: [...prev.technologies, techInput.trim()],
    }));
    setTechInput('');
  };

  const removeTech = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
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
          Projects
        </h2>
        <p className="text-muted-foreground">
          Showcase your personal projects, open source contributions, or side projects.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {projects.map((proj) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              layout
              className="bg-card border border-border rounded-lg p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-foreground">{proj.name}</h3>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleEdit(proj)}>
                    <Edit2 className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDelete(proj.id)}>
                    <Trash2 className="w-3.5 h-3.5 text-destructive" />
                  </Button>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2">{proj.description}</p>
              
              {proj.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {proj.technologies.map((tech, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-3 pt-1">
                {proj.githubUrl && (
                  <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" 
                     className="text-muted-foreground hover:text-foreground transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {proj.liveUrl && (
                  <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer"
                     className="text-muted-foreground hover:text-foreground transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {projects.length === 0 && !isAdding && (
        <div className="text-center py-8 text-muted-foreground">
          No projects added yet. Add your first project to showcase your work.
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
              {editingId ? 'Edit Project' : 'Add New Project'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label className="text-xs mb-1.5 block">Project Name</Label>
                <Input
                  placeholder="E-commerce Platform"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              
              <div>
                <Label className="text-xs mb-1.5 block">Description</Label>
                <Textarea
                  placeholder="A full-stack e-commerce platform with real-time inventory management..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-xs mb-1.5 block">GitHub URL</Label>
                  <Input
                    placeholder="https://github.com/username/project"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                  />
                </div>
                <div>
                  <Label className="text-xs mb-1.5 block">Live Demo URL</Label>
                  <Input
                    placeholder="https://myproject.com"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs block">Technologies Used</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="React, Node.js, MongoDB..."
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addTech()}
                  />
                  <Button type="button" variant="outline" onClick={addTech}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {formData.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {formData.technologies.map((tech, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                        {tech}
                        <button onClick={() => removeTech(i)} className="hover:text-primary/70">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSubmit} disabled={!formData.name}>
                {editingId ? 'Update' : 'Add'} Project
              </Button>
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Button variant="outline" onClick={() => setIsAdding(true)} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
