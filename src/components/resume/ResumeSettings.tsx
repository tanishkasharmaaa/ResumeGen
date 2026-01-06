import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useResume } from '@/contexts/ResumeContext';
import { Palette, Type, Maximize2 } from 'lucide-react';

const templates = [
  { id: 'minimal', name: 'Minimal', description: 'Clean and simple' },
  { id: 'modern', name: 'Modern', description: 'Contemporary design' },
  { id: 'creative', name: 'Creative', description: 'Bold sidebar layout' },
] as const;

const colorPresets = [
  { name: 'Cyan', value: '#0891b2' },
  { name: 'Blue', value: '#2563eb' },
  { name: 'Purple', value: '#7c3aed' },
  { name: 'Rose', value: '#e11d48' },
  { name: 'Orange', value: '#ea580c' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Slate', value: '#475569' },
];

const fontOptions = [
  'Inter',
  'Georgia',
  'Times New Roman',
  'Arial',
  'Roboto',
];

export const ResumeSettings: React.FC = () => {
  const { resumeSettings, updateResumeSettings } = useResume();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-card border border-border rounded-lg p-4 space-y-5"
    >
      <h3 className="font-display font-semibold text-foreground">Customize Resume</h3>

      {/* Template Selection */}
      <div className="space-y-2">
        <Label className="text-xs flex items-center gap-2">
          <Maximize2 className="w-3.5 h-3.5" />
          Template
        </Label>
        <div className="grid grid-cols-3 gap-2">
          {templates.map(template => (
            <button
              key={template.id}
              onClick={() => updateResumeSettings('template', template.id)}
              className={`p-3 rounded-lg border text-center transition-all ${
                resumeSettings.template === template.id
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <span className="text-xs font-medium block">{template.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div className="space-y-2">
        <Label className="text-xs flex items-center gap-2">
          <Palette className="w-3.5 h-3.5" />
          Primary Color
        </Label>
        <div className="flex flex-wrap gap-2">
          {colorPresets.map(color => (
            <button
              key={color.value}
              onClick={() => updateResumeSettings('primaryColor', color.value)}
              className={`w-7 h-7 rounded-full transition-all ${
                resumeSettings.primaryColor === color.value
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-card scale-110'
                  : 'hover:scale-105'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
          <Input
            type="color"
            value={resumeSettings.primaryColor}
            onChange={(e) => updateResumeSettings('primaryColor', e.target.value)}
            className="w-7 h-7 p-0 border-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Font Selection */}
      <div className="space-y-2">
        <Label className="text-xs flex items-center gap-2">
          <Type className="w-3.5 h-3.5" />
          Font Family
        </Label>
        <Select
          value={resumeSettings.fontFamily}
          onValueChange={(value) => updateResumeSettings('fontFamily', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            {fontOptions.map(font => (
              <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Font Size */}
      <div className="space-y-2">
        <Label className="text-xs">Font Size</Label>
        <Select
          value={resumeSettings.fontSize}
          onValueChange={(value: 'small' | 'medium' | 'large') => updateResumeSettings('fontSize', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
};
