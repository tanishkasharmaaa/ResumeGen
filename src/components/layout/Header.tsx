import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Download, Eye, MessageSquare, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useResume } from '@/contexts/ResumeContext';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onToggleSidebar?: () => void;
  onOpenPreview?: () => void;
  onOpenFeedback?: () => void;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  onOpenPreview,
  onOpenFeedback,
  className,
}) => {
  const { isDarkMode, toggleDarkMode } = useResume();

  return (
    <header className={cn(
      "h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6",
      className
    )}>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onToggleSidebar}
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-soft" />
            Auto-saving
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenPreview}
            className="hidden sm:flex gap-2"
          >
            <Eye className="w-4 h-4" />
            Preview
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenFeedback}
            className="hidden sm:flex gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Feedback
          </Button>
        </motion.div>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="text-muted-foreground hover:text-foreground"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>
      </div>
    </header>
  );
};
