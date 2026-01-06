import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Globe,
  Download,
  Sparkles,
  Users,
  Zap,
  CheckCircle2,
  ArrowRight,
  Star,
  Heart,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Trust-based user count - update this periodically based on analytics
const BASE_USER_COUNT = 5247;
const DOWNLOADS_COUNT = 12500;

const features = [
  {
    icon: FileText,
    title: "Professional Resume Builder",
    description:
      "Create stunning resumes with our multi-step form and real-time preview.",
  },
  {
    icon: Globe,
    title: "Portfolio Generator",
    description:
      "Automatically generate a deploy-ready portfolio website from your resume.",
  },
  {
    icon: Download,
    title: "Export Anywhere",
    description:
      "Download as PDF or get a complete website ZIP ready for Netlify/Vercel.",
  },
  {
    icon: Zap,
    title: "No Sign-up Required",
    description:
      "Start building immediately. Your data is saved locally in your browser.",
  },
];

const templates = [
  { name: "Minimal", description: "Clean and simple", color: "bg-slate-100" },
  {
    name: "Modern",
    description: "Contemporary design",
    color: "bg-primary/10",
  },
  {
    name: "Creative",
    description: "Bold sidebar layout",
    color: "bg-accent/10",
  },
];

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(BASE_USER_COUNT);
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Track unique visitors in localStorage
    const storedVisitors = localStorage.getItem("ResumeGen_visitors");
    const visitors = storedVisitors ? parseInt(storedVisitors, 10) : 0;

    // Check if this is a new visitor
    const hasVisited = localStorage.getItem("ResumeGen_visited");
    if (!hasVisited) {
      localStorage.setItem("ResumeGen_visited", "true");
      localStorage.setItem("ResumeGen_visitors", String(visitors + 1));
      setVisitorCount(visitors + 1);
    } else {
      setVisitorCount(visitors);
    }

    // Animate user count on load
    const targetCount = BASE_USER_COUNT + visitors;
    let current = targetCount - 100;
    const interval = setInterval(() => {
      current += Math.ceil((targetCount - current) / 10);
      if (current >= targetCount) {
        current = targetCount;
        clearInterval(interval);
      }
      setUserCount(current);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl gradient-text">
                ResumeGen
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span className="font-medium">
                  {userCount.toLocaleString()}+ users
                </span>
              </div>
              <Button onClick={() => navigate("/builder")} size="sm">
                Get Started
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              100% Free • No Sign-up Required
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6">
              Build Your Perfect{" "}
              <span className="gradient-text">Resume & Portfolio</span> in
              Minutes
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create professional resumes and stunning portfolio websites. No
              account needed. Download as PDF or deploy-ready code.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Button
                size="lg"
                className="gradient-primary text-primary-foreground px-8 py-6 text-lg shadow-glow"
                onClick={() => navigate("/builder")}
              >
                Start Building Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                View Templates
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-8 text-center"
            >
              <div className="px-6 py-3 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-2 text-2xl font-bold text-foreground">
                  <Users className="w-5 h-5 text-primary" />
                  {userCount.toLocaleString()}+
                </div>
                <div className="text-sm text-muted-foreground">
                  Active Users
                </div>
              </div>
              <div className="px-6 py-3 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-2 text-2xl font-bold text-foreground">
                  <Download className="w-5 h-5 text-primary" />
                  {DOWNLOADS_COUNT.toLocaleString()}+
                </div>
                <div className="text-sm text-muted-foreground">Downloads</div>
              </div>
              <div className="px-6 py-3 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-2 text-2xl font-bold text-foreground">
                  <Star className="w-5 h-5 text-accent fill-accent" />
                  4.9/5
                </div>
                <div className="text-sm text-muted-foreground">User Rating</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful features to create professional resumes and portfolios
              without any hassle.
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-card-hover transition-all group"
              >
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Beautiful Templates
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our professionally designed templates. Switch anytime
              without losing data.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
            {templates.map((template, index) => (
              <motion.div
                key={template.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-card border border-border rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => navigate("/builder")}
              >
                <div
                  className={`h-48 ${template.color} flex items-center justify-center`}
                >
                  <div className="w-32 h-40 bg-white rounded shadow-lg transform group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground">
                    {template.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto gradient-primary rounded-2xl p-8 sm:p-12 text-center text-primary-foreground"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Ready to Build Your Future?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Join {userCount.toLocaleString()}+ professionals who've created
            their resume with ResumeGen.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg"
            onClick={() => navigate("/builder")}
          >
            Get Started Now — It's Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded gradient-primary flex items-center justify-center">
              <FileText className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold gradient-text">
              ResumeGen
            </span>
          </div>

          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-accent fill-accent" /> for
            developers & professionals
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
