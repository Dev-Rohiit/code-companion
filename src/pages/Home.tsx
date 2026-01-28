import { motion } from "framer-motion";
import { 
  Code2, 
  Zap, 
  Users, 
  Trophy, 
  Brain, 
  Rocket, 
  CheckCircle2,
  ArrowRight,
  Flame,
  Star,
  ChevronRight,
  Play,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const languages = [
  { name: "JavaScript", icon: "🟨", color: "from-yellow-500 to-yellow-600" },
  { name: "Python", icon: "🐍", color: "from-blue-500 to-green-500" },
  { name: "TypeScript", icon: "🔷", color: "from-blue-500 to-blue-600" },
  { name: "C++", icon: "⚡", color: "from-blue-600 to-purple-600" },
  { name: "Java", icon: "☕", color: "from-red-500 to-orange-500" },
  { name: "Rust", icon: "🦀", color: "from-orange-600 to-red-600" },
  { name: "Go", icon: "🐹", color: "from-cyan-500 to-blue-500" },
  { name: "Ruby", icon: "💎", color: "from-red-500 to-pink-500" },
];

const features = [
  {
    icon: Brain,
    title: "AI-Powered Suggestions",
    description: "Get intelligent code completions and real-time diagnostics powered by LSP",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "Run your code and see results immediately with our lightning-fast compiler",
  },
  {
    icon: Trophy,
    title: "Gamified Learning",
    description: "Earn XP, maintain streaks, unlock badges, and compete on leaderboards",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Learn alongside thousands of developers, share solutions, get help",
  },
  {
    icon: Rocket,
    title: "Project-Based",
    description: "Build real projects from day one, not just theory and syntax drills",
  },
  {
    icon: Code2,
    title: "Industry Ready",
    description: "Curriculum designed with hiring managers to prepare you for real jobs",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer @ Google",
    avatar: "SC",
    content: "CodeCraft helped me land my dream job. The practice problems are incredibly relevant to real interviews.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "CS Student",
    avatar: "MJ",
    content: "The gamification keeps me motivated. I've maintained a 60-day streak and my coding skills have improved dramatically.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Career Switcher",
    avatar: "ER",
    content: "As someone with no tech background, CodeCraft made learning accessible. The instant feedback is a game-changer.",
    rating: 5,
  },
];

const faqs = [
  {
    question: "Is CodeCraft suitable for absolute beginners?",
    answer: "Yes! We have structured learning paths starting from zero programming knowledge, with step-by-step guidance and instant feedback.",
  },
  {
    question: "What languages can I learn?",
    answer: "We support JavaScript, TypeScript, Python, C, C++, Java, Rust, Go, and Ruby with full LSP integration for intelligent suggestions.",
  },
  {
    question: "How does the streak system work?",
    answer: "Complete at least one lesson or practice problem each day to maintain your streak. Streaks unlock special badges and XP multipliers!",
  },
  {
    question: "Can I use CodeCraft on mobile?",
    answer: "Yes! Our platform is fully responsive. While the coding playground works best on larger screens, lessons and theory are mobile-optimized.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen hero-gradient">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="outline" className="mb-6 px-4 py-1.5 border-primary/30 bg-primary/5">
                <Flame className="w-3 h-3 mr-1 text-streak" />
                Over 10,000+ students learning daily
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Learn Coding with{" "}
              <span className="gradient-text">Practice</span>
              <br />+ <span className="gradient-text-accent">Instant Feedback</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Master programming with hands-on projects, AI-powered suggestions, 
              and a gamified experience that makes learning addictive.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/playground">
                <Button variant="hero" size="xl">
                  <Play className="w-5 h-5" />
                  Start Coding
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="heroOutline" size="xl">
                  Browse Courses
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
            
            {/* Quick Stats */}
            <motion.div 
              variants={fadeInUp}
              className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
            >
              {[
                { value: "50K+", label: "Students" },
                { value: "200+", label: "Lessons" },
                { value: "8", label: "Languages" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-16 px-4 border-y border-border/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              8 Languages, <span className="gradient-text">One Platform</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Full LSP support with intelligent autocomplete, real-time diagnostics, and more.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {languages.map((lang, index) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="glass-card rounded-xl p-4 text-center cursor-pointer group"
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${lang.color} flex items-center justify-center text-2xl shadow-lg group-hover:shadow-xl transition-shadow`}>
                  {lang.icon}
                </div>
                <p className="font-semibold">{lang.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Master Coding</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our platform combines the best learning tools with gamification to keep you engaged.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by <span className="gradient-text">Thousands</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Join our community of learners who have transformed their careers.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-xp text-xp" />
                  ))}
                </div>
                <p className="text-foreground/90 mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, <span className="gradient-text">Student-Friendly</span> Pricing
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Start free, upgrade when you're ready. No hidden fees.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                period: "forever",
                features: ["5 languages", "Basic problems", "Community access", "Streak tracking"],
                cta: "Get Started",
                popular: false,
              },
              {
                name: "Pro",
                price: "$9",
                period: "/month",
                features: ["All 8 languages", "All problems", "LSP features", "Priority support", "No ads"],
                cta: "Start Pro",
                popular: true,
              },
              {
                name: "Team",
                price: "$29",
                period: "/month",
                features: ["Everything in Pro", "Team dashboard", "Admin controls", "API access", "Custom tracks"],
                cta: "Contact Sales",
                popular: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`glass-card rounded-2xl p-6 relative ${plan.popular ? 'border-primary glow-primary' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/pricing">
                  <Button 
                    variant={plan.popular ? "hero" : "outline"} 
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </motion.div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-xl p-6"
              >
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your <span className="gradient-text">Coding Journey?</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Join 50,000+ students who are already mastering programming with CodeCraft.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/signup">
                  <Button variant="hero" size="xl">
                    Create Free Account
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg gradient-text">CodeCraft</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 CodeCraft. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
