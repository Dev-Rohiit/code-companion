import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Zap,
  Users,
  Building2,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: "$0",
    period: "forever",
    icon: Zap,
    features: [
      "5 programming languages",
      "50 practice problems",
      "Basic code editor",
      "Community forum access",
      "Streak tracking",
      "Basic leaderboard",
    ],
    limitations: [
      "Limited daily submissions",
      "No LSP features",
      "Ads displayed",
    ],
    cta: "Start Free",
    popular: false,
    href: "/signup",
  },
  {
    name: "Pro",
    description: "For serious learners",
    price: "$9",
    period: "/month",
    yearlyPrice: "$90",
    icon: Sparkles,
    features: [
      "All 8 programming languages",
      "500+ practice problems",
      "Full LSP support (autocomplete, diagnostics)",
      "Priority support",
      "No ads",
      "Advanced analytics",
      "Solution explanations",
      "Mock interviews",
      "Certificates",
    ],
    limitations: [],
    cta: "Start Pro Trial",
    popular: true,
    href: "/signup?plan=pro",
  },
  {
    name: "Team",
    description: "For organizations & classrooms",
    price: "$29",
    period: "/user/month",
    yearlyPrice: "$290",
    icon: Users,
    features: [
      "Everything in Pro",
      "Team dashboard",
      "Admin controls",
      "Custom learning paths",
      "Progress reports",
      "API access",
      "SSO integration",
      "Dedicated support",
      "Custom branding",
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false,
    href: "/contact",
  },
];

const faqs = [
  {
    question: "Can I switch plans at any time?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll have immediate access to new features. When downgrading, you'll keep your current features until the end of your billing period.",
  },
  {
    question: "Is there a student discount?",
    answer: "Yes! Students with a valid .edu email address get 50% off Pro plans. Just sign up with your student email to automatically receive the discount.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and in some regions, local payment methods. All payments are processed securely through Stripe.",
  },
  {
    question: "Can I get a refund?",
    answer: "We offer a 14-day money-back guarantee for Pro plans. If you're not satisfied, contact our support team within 14 days of your purchase for a full refund.",
  },
  {
    question: "Do you offer enterprise pricing?",
    answer: "Yes! For organizations with 50+ users, we offer custom enterprise plans with volume discounts, dedicated support, and additional features. Contact our sales team for details.",
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 pb-24 lg:pb-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1.5 border-primary/30 bg-primary/5">
            Student-Friendly Pricing
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Start free and upgrade when you're ready. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <span className="text-sm text-muted-foreground">Monthly</span>
          <div className="w-12 h-6 rounded-full bg-secondary p-1 cursor-pointer">
            <div className="w-4 h-4 rounded-full bg-primary transition-transform" />
          </div>
          <span className="text-sm text-muted-foreground">
            Yearly <Badge variant="outline" className="ml-1 text-success border-success/30">Save 17%</Badge>
          </span>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className={`glass-card rounded-2xl p-6 relative flex flex-col ${
                plan.popular ? 'border-primary glow-primary' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}
              
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    plan.popular ? 'bg-primary/20' : 'bg-secondary'
                  }`}>
                    <plan.icon className={`w-5 h-5 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
                {plan.yearlyPrice && (
                  <p className="text-sm text-muted-foreground mt-1">
                    or {plan.yearlyPrice}/year
                  </p>
                )}
              </div>
              
              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.limitations.map((limitation) => (
                  <li key={limitation} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-4 h-4 flex-shrink-0 mt-0.5 text-center">−</span>
                    <span>{limitation}</span>
                  </li>
                ))}
              </ul>
              
              <Link to={plan.href}>
                <Button 
                  variant={plan.popular ? "hero" : "outline"} 
                  className="w-full"
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Enterprise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-8 mb-16"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Building2 className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Enterprise</h3>
                <p className="text-muted-foreground">
                  Need a custom solution for your organization? Let's talk.
                </p>
              </div>
            </div>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contact Sales
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
}
