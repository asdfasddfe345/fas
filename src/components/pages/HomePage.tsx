// src/components/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  PlusCircle,
  Target,
  ArrowRight,
  Sparkles,
  CheckCircle,
  TrendingUp,
  Star,
  Users,
  Zap,
  Award,
  Crown,
  Instagram,
  Linkedin,
  MessageCircle,
  Check,
  Plus,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Globe,
  Gamepad2
} from 'lucide-react';
import { Card } from "../common/Card";
// Assuming these imports exist in the user's project
// import { paymentService } from '../../services/paymentService';

// Mocking the imported functions and types for a self-contained example.
// In a real application, these would be external.
const paymentService = {
  // A mock service for payment-related functions
};

// Define the type for a feature object for clarity and type-safety
interface Feature {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  requiresAuth: boolean;
  highlight?: boolean; // Added highlight property
  gradient: string; // Added gradient property
  accent: 'teal' | 'mint' | 'amber' | 'gold' | 'violet' | 'rose';
  tag?: string;
}

interface HomePageProps {
  // REMOVED: onPageChange: (page: string) => void;
  isAuthenticated: boolean;
  onShowAuth: () => void;
  onShowSubscriptionPlans: (featureId?: string, expandAddons?: boolean) => void;
  onShowSubscriptionPlansDirectly: () => void; // NEW PROP
  userSubscription: any; // New prop for user's subscription status
}

import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../../contexts/AuthContext'; // ADDED: Import useAuth
import { authService } from '../../services/authService'; // ADDED: Import authService

// Inline WhatsApp brand icon (lucide-react has no brand icons)
const WhatsappIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.11 17.37c-.26-.13-1.52-.75-1.75-.84-.23-.09-.4-.13-.57.13s-.66.84-.81 1.01c-.15.17-.3.19-.56.06-.26-.13-1.08-.4-2.06-1.27-.76-.67-1.27-1.49-1.42-1.75-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.88-.2-.48-.4-.41-.57-.42l-.49-.01c-.17 0-.45.06-.69.32-.23.26-.91.89-.91 2.17s.94 2.52 1.07 2.7c.13.17 1.85 2.83 4.49 3.97.63.27 1.12.43 1.5.55.63.2 1.21.17 1.66.1.51-.08 1.52-.62 1.73-1.21.21-.59.21-1.09.15-1.21-.06-.12-.24-.19-.5-.32z" />
    <path d="M26.72 5.28A13.5 13.5 0 0 0 4.47 21.06L3 29l8.11-1.42A13.49 13.49 0 1 0 26.72 5.28zM16.5 27A10.47 10.47 0 0 1 8.3 24.3l-.29-.18-4.91.85.84-4.8-.19-.31A10.5 10.5 0 1 1 16.5 27z" />
  </svg>
);

export const HomePage: React.FC<HomePageProps> = ({
  // REMOVED: onPageChange,
  isAuthenticated,
  onShowAuth,
  onShowSubscriptionPlans,
  onShowSubscriptionPlansDirectly, // NEW PROP
  userSubscription // Destructure new prop
}) => {
  const [showOptimizationDropdown, setShowOptimizationDropdown] = React.useState(false);
  const [showPlanDetails, setShowPlanDetails] = React.useState(false); // New state for the dropdown
  const navigate = useNavigate(); // Initialize useNavigate
  const { user } = useAuth(); // ADDED: Access user from AuthContext
  const [globalResumesCreated, setGlobalResumesCreated] = useState<number>(60070);
  const [scoreChecksCompleted, setScoreChecksCompleted] = useState<number>(500070);

  // Fetch global resumes created count on component mount
  useEffect(() => {
    const fetchGlobalCount = async () => {
      try {
        const count = await authService.getGlobalResumesCreatedCount();
        setGlobalResumesCreated(count);
      } catch (error) {
        console.error('HomePage: Error fetching global resumes count:', error);
        // Keep default value of 50000 if fetch fails
      }
    };

    fetchGlobalCount();
  }, []);

  // Load and listen for local resume score check count (base 500 + user increments)
  useEffect(() => {
    const base = 500070;
    const hydrateCount = () => {
      const stored = parseInt(localStorage.getItem('scoreCheckCount') || '0', 10);
      const safeStored = isNaN(stored) ? 0 : stored;
      setScoreChecksCompleted(base + safeStored);
    };

    hydrateCount();

    const handleScoreCheckEvent = (event: Event) => {
      const detail = (event as CustomEvent<{ total?: number }>).detail;
      const total = typeof detail?.total === 'number' ? detail.total : null;
      if (total !== null) {
        setScoreChecksCompleted(base + total);
      } else {
        hydrateCount();
      }
    };

    window.addEventListener('score-check-completed', handleScoreCheckEvent);
    return () => window.removeEventListener('score-check-completed', handleScoreCheckEvent);
  }, []);

  // Helper function to get plan icon based on icon string
  const getPlanIcon = (iconType: string) => {
    switch (iconType) {
      case 'crown': return <Crown className="w-6 h-6" />;
      case 'zap': return <Zap className="w-6 h-6" />;
      case 'rocket': return <Award className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  // Helper function to check if a feature is available based on subscription
 const isFeatureAvailable = (featureId: string) => {
  // Free features - always available for authenticated users
  if (featureId === 'linkedin-generator' || featureId === 'mock-interview' || featureId === 'portfolio-builder' || featureId === '/gaming') {
    return true;
  }

  if (!isAuthenticated) return false;
  if (!userSubscription) return false;

  switch (featureId) {
    case 'optimizer':
      return userSubscription.optimizationsTotal > userSubscription.optimizationsUsed;
    case 'score-checker':
      return userSubscription.scoreChecksTotal > userSubscription.scoreChecksUsed;
    case 'guided-builder':
      return userSubscription.guidedBuildsTotal > userSubscription.guidedBuildsUsed;
    default:
      return false;
  }
};




 const handleFeatureClick = (feature: Feature) => {
  console.log('Feature clicked:', feature.id);

  if (!isAuthenticated && feature.requiresAuth) {
    onShowAuth();
    return;
  }

  // Free features - skip subscription check
  const freeFeatures = ['linkedin-generator', 'mock-interview', 'portfolio-builder', '/gaming'];
  const isFreeFeature = freeFeatures.includes(feature.id);

  if (isAuthenticated && feature.requiresAuth && !isFreeFeature && !isFeatureAvailable(feature.id)) {
    onShowSubscriptionPlans(feature.id);
    return;
  }

  if (isAuthenticated || !feature.requiresAuth) {
    navigate(feature.id);
  }
};




  const features: Feature[] = [
    {
      id: 'optimizer',
      title: 'JD-Based Optimizer',
      description: 'Upload your resume and a job description to get a perfectly tailored resume.',
      icon: <Target className="w-6 h-6" />,
      requiresAuth: false,
      highlight: true, // Highlight this feature
      gradient: 'from-emerald-500/15 via-emerald-500/5 to-cyan-500/10',
      accent: 'teal',
      tag: 'Recommended',
    },
    {
      id: 'score-checker',
      title: 'Resume Score Check',
      description: 'Get an instant ATS score with detailed analysis and improvement suggestions.',
      icon: <TrendingUp className="w-6 h-6" />,
      requiresAuth: false,
      gradient: 'from-emerald-400/12 via-teal-400/4 to-emerald-500/10',
      accent: 'mint',
    },
    {
      id: 'guided-builder',
      title: 'Guided Resume Builder',
      description: 'Create a professional resume from scratch with our step-by-step AI-powered builder.',
      icon: <PlusCircle className="w-6 h-6" />,
      requiresAuth: false,
      gradient: 'from-amber-400/15 via-orange-400/6 to-amber-500/10',
      accent: 'amber',
    },
   
    {
      id: 'linkedin-generator',
      // MODIFIED LINE 100: Changed title
      title: 'Outreach Message Generator',
      // MODIFIED LINE 101: Changed description
      description: 'Generate personalized messages for networking, referrals, and cold outreach.',
      icon: <MessageCircle className="w-6 h-6" />,
      requiresAuth: true,
      gradient: 'from-yellow-400/15 via-amber-300/8 to-orange-300/10',
      accent: 'gold',
    },
    {
      id: 'mock-interview',
      title: 'AI Mock Interview (Beta)',
      description: 'Practice interviews with AI-powered feedback in a realistic meet-style environment.',
      icon: <Sparkles className="w-6 h-6" />,
      requiresAuth: true,
      highlight: true,
      gradient: 'from-indigo-500/15 via-purple-500/6 to-indigo-500/12',
      accent: 'violet',
      tag: 'Recommended',
    },
    {
      id: '/gaming',
      title: 'Gaming Aptitude',
      description: 'Test your problem-solving skills with Path Finder games for top consulting companies.',
      icon: <Gamepad2 className="w-6 h-6" />,
      requiresAuth: true,
      highlight: false,
      gradient: 'from-pink-500/15 via-rose-500/6 to-fuchsia-500/12',
      accent: 'rose',
    }

  ];

  const accentStyles: Record<Feature['accent'], {
    bg: string;
    overlay: string;
    border: string;
    shadow: string;
    iconBg: string;
    iconColor: string;
    badge: string;
    arrow: string;
  }> = {
    teal: {
      bg: 'bg-slate-900/80',
      overlay: 'bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.22),transparent_35%),radial-gradient(circle_at_85%_0%,rgba(6,182,212,0.18),transparent_32%)]',
      border: 'border border-emerald-400/40 hover:border-emerald-300/70',
      shadow: 'shadow-[0_25px_80px_rgba(16,185,129,0.25)]',
      iconBg: 'bg-emerald-500/15 border border-emerald-400/40',
      iconColor: 'text-emerald-100',
      badge: 'bg-emerald-500 text-emerald-50',
      arrow: 'text-emerald-200 bg-emerald-500/10'
    },
    mint: {
      bg: 'bg-slate-900/80',
      overlay: 'bg-[radial-gradient(circle_at_10%_10%,rgba(45,212,191,0.18),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(74,222,128,0.15),transparent_32%)]',
      border: 'border border-emerald-300/40 hover:border-emerald-200/70',
      shadow: 'shadow-[0_25px_80px_rgba(16,185,129,0.18)]',
      iconBg: 'bg-emerald-400/15 border border-emerald-300/40',
      iconColor: 'text-emerald-50',
      badge: 'bg-emerald-400 text-slate-900',
      arrow: 'text-emerald-100 bg-emerald-400/15'
    },
    amber: {
      bg: 'bg-slate-900/80',
      overlay: 'bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.18),transparent_34%),radial-gradient(circle_at_85%_0%,rgba(251,146,60,0.16),transparent_32%)]',
      border: 'border border-amber-400/45 hover:border-amber-300/70',
      shadow: 'shadow-[0_25px_80px_rgba(251,191,36,0.18)]',
      iconBg: 'bg-amber-500/15 border border-amber-400/40',
      iconColor: 'text-amber-50',
      badge: 'bg-amber-400 text-slate-900',
      arrow: 'text-amber-100 bg-amber-400/15'
    },
    gold: {
      bg: 'bg-slate-900/80',
      overlay: 'bg-[radial-gradient(circle_at_25%_15%,rgba(234,179,8,0.2),transparent_35%),radial-gradient(circle_at_90%_5%,rgba(250,204,21,0.16),transparent_32%)]',
      border: 'border border-yellow-400/45 hover:border-yellow-300/70',
      shadow: 'shadow-[0_25px_80px_rgba(234,179,8,0.18)]',
      iconBg: 'bg-yellow-400/15 border border-yellow-300/50',
      iconColor: 'text-yellow-50',
      badge: 'bg-yellow-400 text-slate-900',
      arrow: 'text-yellow-100 bg-yellow-400/15'
    },
    violet: {
      bg: 'bg-slate-900/80',
      overlay: 'bg-[radial-gradient(circle_at_15%_25%,rgba(129,140,248,0.18),transparent_34%),radial-gradient(circle_at_85%_5%,rgba(236,72,153,0.12),transparent_32%)]',
      border: 'border border-indigo-400/50 hover:border-indigo-300/70',
      shadow: 'shadow-[0_25px_80px_rgba(79,70,229,0.22)]',
      iconBg: 'bg-indigo-500/20 border border-indigo-400/50',
      iconColor: 'text-indigo-50',
      badge: 'bg-indigo-500 text-indigo-50',
      arrow: 'text-indigo-100 bg-indigo-500/15'
    },
    rose: {
      bg: 'bg-slate-900/80',
      overlay: 'bg-[radial-gradient(circle_at_20%_20%,rgba(244,63,94,0.18),transparent_34%),radial-gradient(circle_at_90%_10%,rgba(236,72,153,0.16),transparent_32%)]',
      border: 'border border-pink-400/50 hover:border-pink-300/70',
      shadow: 'shadow-[0_25px_80px_rgba(244,63,94,0.22)]',
      iconBg: 'bg-pink-500/15 border border-pink-400/50',
      iconColor: 'text-pink-50',
      badge: 'bg-pink-500 text-pink-50',
      arrow: 'text-pink-100 bg-pink-500/15'
    }
  };

  const stats = [
    {
      number: scoreChecksCompleted.toLocaleString(),
      label: 'Resume Score Checks',
      icon: <TrendingUp className="w-5 h-5" />,
      microcopy: 'Completed by members to optimize their resumes',
      accentBg: 'from-emerald-500/10 to-cyan-500/10',
      accentRing: 'border-emerald-400/40',
      accentText: 'text-emerald-200'
    },
    {
      number: globalResumesCreated.toLocaleString(),
      label: 'Resumes Created', 
      icon: <FileText className="w-5 h-5" />, 
      microcopy: 'Trusted by thousands of job seekers worldwide',
      accentBg: 'from-sky-500/10 to-indigo-500/10',
      accentRing: 'border-sky-400/40',
      accentText: 'text-sky-200'
    },
    {
      number: '95%',
      label: 'Success Rate',
      icon: <TrendingUp className="w-5 h-5" />,
      microcopy: 'Achieved by our AI-driven approach',
      accentBg: 'from-emerald-500/10 to-lime-500/10',
      accentRing: 'border-emerald-300/50',
      accentText: 'text-lime-200'
    },
    {
      number: '4.9/5',
      label: 'User Rating',
      icon: <Star className="w-5 h-5" />,
      microcopy: 'From satisfied professionals worldwide',
      accentBg: 'from-fuchsia-500/10 to-indigo-500/10',
      accentRing: 'border-fuchsia-400/50',
      accentText: 'text-fuchsia-200'
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#070b14] text-slate-100 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.12),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(236,72,153,0.1),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04),transparent_35%,rgba(59,130,246,0.06)_65%,transparent)]" />

      <div className="relative">
        {/* Hero Section */}
        <div className="container-responsive pt-12 pb-10 sm:pt-16 sm:pb-14">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-200 backdrop-blur">
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Night mode experience, built to match the new UI</span>
            </div>

            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-xl ring-2 ring-emerald-500/30">
                <img
                  src="https://res.cloudinary.com/dlkovvlud/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1751536902/a-modern-logo-design-featuring-primoboos_XhhkS8E_Q5iOwxbAXB4CqQ_HnpCsJn4S1yrhb826jmMDw_nmycqj.jpg"
                  alt="PrimoBoost AI Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h1 className="text-[22px] sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  PrimoBoost AI
                </h1>
                <p className="text-sm sm:text-base text-slate-400">Resume Intelligence</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-[28px] sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                Choose Your Resume Journey
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400">
                  Built for the night mode experience
                </span>
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
                Pick a starting point and flow through AI-powered tools that match the new dark interface. Optimise for a JD, check your ATS score, build from scratch, or warm up with interviews and games.
              </p>
            </div>

            <motion.div
              className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.button
                onClick={() => navigate('/optimizer')}
                className="btn-primary h-12 px-6 sm:px-7 rounded-xl text-base sm:text-lg font-semibold gap-2 shadow-lg hover:shadow-xl hover:shadow-emerald-500/50 relative overflow-hidden group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Sparkles className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative z-10">Start Optimizing</span>
              </motion.button>
              <motion.button
                onClick={() => navigate('/jobs')}
                className="btn-secondary h-12 px-6 sm:px-7 rounded-xl text-base sm:text-lg font-semibold gap-2 border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10 hover:border-emerald-400/50 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Briefcase className="w-5 h-5" />
                Explore Jobs
              </motion.button>
            </motion.div>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <Card
                  padding="lg"
                  className="card-surface text-left flex items-start gap-3 sm:gap-4 bg-slate-900/70 border border-slate-800/70 shadow-[0_20px_80px_rgba(0,0,0,0.55)] hover:bg-slate-900/90 hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <motion.div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-b ${stat.accentBg} ${stat.accentRing} ring-1 ring-inset`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {React.cloneElement(stat.icon, { className: `w-5 h-5 ${stat.accentText} transition-transform duration-300 group-hover:scale-110` })}
                </motion.div>
                <div className="space-y-1">
                  <div className="text-xl font-bold text-white leading-tight">
                    {stat.number}
                  </div>
                  <div className="text-sm font-semibold text-slate-200 leading-snug">
                    {stat.label}
                  </div>
                  {stat.microcopy && (
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {stat.microcopy}
                    </p>
                  )}
                </div>
              </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Features Section - Now with a consolidated frame */}
      <section className="relative container-responsive py-10 sm:py-14">
        <div className="absolute inset-0 -z-10 bg-[#0a0f1c] rounded-[32px] blur-3xl opacity-80" />
        <div className="relative">
          <div className="text-center mb-8 space-y-2">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Journeys</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Choose Your Resume Journey</h3>
            <p className="text-slate-400 max-w-3xl mx-auto">Night-mode friendly cards with soft glows and clear calls to action.</p>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {features.map((feature, index) => {
            let remainingCount: number | null = null;
            if (isAuthenticated && userSubscription) {
              switch (feature.id) {
                case 'optimizer':
                  remainingCount = userSubscription.optimizationsTotal - userSubscription.optimizationsUsed;
                  break;
                case 'score-checker':
                  remainingCount = userSubscription.scoreChecksTotal - userSubscription.scoreChecksUsed;
                  break;
                default:
                  remainingCount = null;
              }
            }
            const accent = accentStyles[feature.accent];

            return (
              <Card
                as={motion.button}
                key={feature.id}
                onClick={() => handleFeatureClick(feature)}
                padding="lg"
                className={`group relative overflow-hidden text-left transition-all duration-500 ${accent.bg} ${accent.border} ${accent.shadow} backdrop-blur-xl ${
                  feature.requiresAuth && !isAuthenticated ? 'opacity-60 cursor-not-allowed' : 'hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20'
                } ${feature.highlight ? 'ring-2 ring-emerald-400/60 ring-offset-0 overflow-visible animate-pulse-slow' : ''}`}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={feature.requiresAuth && !isAuthenticated ? undefined : {
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`absolute inset-0 ${accent.overlay} transition-opacity duration-300 group-hover:opacity-80`} />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
                {feature.highlight && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent shimmer-effect" />
                )}
                {feature.tag && (
                  <div className="absolute -top-3 left-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-lg ${accent.badge}`}>
                      <Check className="w-3 h-3 mr-1" />
                      {feature.tag}
                    </span>
                  </div>
                )}
                <div className="relative flex items-start gap-4">
                  <motion.div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accent.iconBg} ${accent.iconColor} transition-all duration-300`}
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {React.cloneElement(feature.icon, {
                      className: `w-6 h-6 ${accent.iconColor} transition-transform duration-300 group-hover:scale-110`
                    })}
                  </motion.div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[16px] font-semibold text-white leading-snug group-hover:text-emerald-300 transition-colors duration-300">
                        {feature.title}
                      </span>
                      {feature.requiresAuth && !isAuthenticated && (
                        <span className="text-[11px] uppercase tracking-wide text-amber-200 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-200/30 animate-pulse">
                          Sign in
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                      {feature.description}
                    </p>
                    {isAuthenticated && userSubscription && remainingCount !== null && remainingCount > 0 && (
                      <p className="text-xs font-medium text-emerald-200 animate-pulse">
                        {remainingCount} remaining
                      </p>
                    )}
                  </div>
                  <motion.div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${accent.arrow} border border-white/10`}
                    whileHover={{ x: 4, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowRight
                      className={`w-4 h-4 transition-all duration-300 group-hover:text-emerald-300 ${feature.requiresAuth && !isAuthenticated ? 'opacity-60' : ''}`}
                    />
                  </motion.div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>

      {/* Companies Marquee Section (with illustrated background) */}
      <section className="relative isolate overflow-hidden py-12 sm:py-14 bg-[#0a0f1c] border-y border-slate-800/60">
        <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-400/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-purple-400/20 to-indigo-400/10 blur-3xl" />
        <style>{`
          @keyframes marqueeX { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .marquee-track { animation: marqueeX 28s linear infinite; }
          .marquee-track.fast { animation-duration: 22s; }
          .marquee:hover .marquee-track { animation-play-state: paused; }
        `}</style>
        <div className="container-responsive">
          <div className="text-center mb-6">
            <h4 className="text-lg sm:text-xl font-semibold text-white">Top Companies Our Users Apply To</h4>
            <p className="text-sm text-slate-400">Trusted by candidates interviewing at leading global brands</p>
          </div>

          {(() => {
            const companies = [
              'Google','Microsoft','Amazon','Meta','Netflix','Apple','NVIDIA','OpenAI','Uber','Airbnb',
              'Stripe','Coinbase','Salesforce','Adobe','Oracle','IBM','Intel','Samsung','Dell','HP',
              'Accenture','Infosys','TCS','Wipro','Capgemini','Zoho','Flipkart','Paytm','Swiggy','Zomato'
            ];
            const chip = (name: string, i: number) => (
              <span
                key={name + i}
                className="mx-2 my-2 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-slate-200 shadow-sm border border-white/10 backdrop-blur"
              >
                <Briefcase className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium">{name}</span>
              </span>
            );
            return (
              <div className="space-y-4">
                {/* Row 1 */}
                <div className="marquee overflow-hidden">
                  <div className="marquee-track whitespace-nowrap flex items-center">
                    {[...companies, ...companies].map((c, i) => chip(c, i))}
                  </div>
                </div>
                {/* Row 2 (faster) */}
                <div className="marquee overflow-hidden">
                  <div className="marquee-track fast whitespace-nowrap flex items-center">
                    {[...companies.slice(10), ...companies.slice(10)].map((c, i) => chip(c, i))}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Explore Jobs CTA under marquee */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            className="mt-8"
          >
            <div className="max-w-4xl mx-auto rounded-2xl p-5 sm:p-6 bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
              <div className="text-center sm:text-left">
                <h5 className="text-base sm:text-lg font-semibold text-white">Explore Job Openings</h5>
                <p className="text-sm text-slate-400">Find roles at top companies and apply with your optimized resume.</p>
              </div>
              <button
                onClick={() => navigate('/jobs')}
                className="inline-flex items-center px-5 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg hover:shadow-xl hover:from-emerald-400 hover:to-cyan-400 transition-all"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Explore Jobs
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Plans Section */}
      {isAuthenticated && (
        <div className="bg-[#080c15] py-12 sm:py-14 border-b border-slate-800/60">
          <div className="container-responsive">
            <div className="max-w-2xl mx-auto mb-10">
              <div className="relative inline-block text-left w-full">
                <button
                  onClick={() => setShowPlanDetails(!showPlanDetails)}
                  className="w-full bg-white/5 text-slate-100 font-semibold py-3 px-6 rounded-xl flex items-center justify-between shadow-sm border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <span className="flex items-center">
                    <Sparkles className="w-5 h-5 text-emerald-300 mr-2" />
                    {userSubscription ? (
                      <span>
                        Optimizations Left:{' '}
                        <span className="font-bold">
                          {userSubscription.optimizationsTotal - userSubscription.optimizationsUsed}
                        </span>
                      </span>
                    ) : (
                      <span>No Active Plan. Upgrade to use all features.</span>
                    )}
                  </span>
                  {showPlanDetails ? <ChevronUp className="w-5 h-5 ml-2" /> : <ChevronDown className="w-5 h-5 ml-2" />}
                </button>
                {showPlanDetails && (
                  <div className="absolute z-10 mt-2 w-full origin-top-right rounded-md bg-[#0c111b] shadow-2xl border border-white/10 focus:outline-none">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      {userSubscription ? (
                        <>
                          <div className="block px-4 py-2 text-sm text-slate-200">
                            <p className="font-semibold">{userSubscription.name} Plan</p>
                            <p className="text-xs text-slate-400">Details for your current subscription.</p>
                          </div>
                          <hr className="my-1 border-white/10" />
                          <div className="px-4 py-2 text-sm text-slate-200 space-y-1">
                            <div className="flex justify-between items-center">
                              <span>Optimizations:</span>
                              <span className="font-medium">{userSubscription.optimizationsTotal - userSubscription.optimizationsUsed} / {userSubscription.optimizationsTotal}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Score Checks:</span>
                              <span className="font-medium">{userSubscription.scoreChecksTotal - userSubscription.scoreChecksUsed} / {userSubscription.scoreChecksTotal}</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="block px-4 py-2 text-sm text-slate-200">
                          You currently don't have an active subscription.
                        </div>
                      )}
                      <div className="p-4 border-t border-white/10">
                        <button
                          onClick={() => onShowSubscriptionPlans(undefined, true)}
                          className="w-full btn-primary py-2"
                        >
                          {userSubscription ? 'Upgrade Plan' : 'Choose Your Plan'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center mt-12">
              <button
                onClick={onShowSubscriptionPlansDirectly}
                className="btn-secondary px-8 py-3 border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
              >
                View All Plans & Add-ons
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Additional Features Teaser - animated and responsive */}
      <div className="relative overflow-hidden text-white py-16 sm:py-20 px-4 sm:px-0 bg-gradient-to-br from-[#0b0f1a] via-[#0c1322] to-[#0a0f18]">
        {/* subtle animated gradient orbs */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 9, repeat: Infinity }}
        />

        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
              Powered by Advanced AI Technology
            </h3>
            <p className="text-base sm:text-lg text-slate-300">
              Our intelligent system understands ATS requirements, job market trends, and recruiter preferences to give you the competitive edge.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-12">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="text-center rounded-2xl p-6 backdrop-blur-sm bg-white/5 border border-white/10 shadow-xl"
            >
              <div className="relative mx-auto mb-5">
                <div className="relative w-20 h-20 rounded-full mx-auto flex items-center justify-center bg-cyan-500/15">
                  <Zap className="w-8 h-8 text-yellow-300" />
                </div>
              </div>
              <h4 className="font-semibold mb-2 text-lg text-yellow-300">AI-Powered Analysis</h4>
              <p className="text-slate-300 leading-relaxed">Advanced algorithms analyze and optimize your resume</p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="text-center rounded-2xl p-6 backdrop-blur-sm bg-white/5 border border-white/10 shadow-xl"
            >
              <div className="relative mx-auto mb-5">
                <div className="relative w-20 h-20 rounded-full mx-auto flex items-center justify-center bg-indigo-500/15">
                  <Award className="w-8 h-8 text-green-300" />
                </div>
              </div>
              <h4 className="font-semibold mb-2 text-lg text-emerald-300">ATS Optimization</h4>
              <p className="text-slate-300 leading-relaxed">Ensure your resume passes all screening systems</p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="text-center rounded-2xl p-6 backdrop-blur-sm bg-white/5 border border-white/10 shadow-xl"
            >
              <div className="relative mx-auto mb-5">
                <div className="relative w-20 h-20 rounded-full mx-auto flex items-center justify-center bg-fuchsia-500/15">
                  <Users className="w-8 h-8 text-fuchsia-300" />
                </div>
              </div>
              <h4 className="font-semibold mb-2 text-lg text-fuchsia-300">Expert Approved</h4>
              <p className="text-slate-300 leading-relaxed">Formats trusted by recruiters worldwide</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}

      {/* Footer */}
      <footer className="mt-8 sm:mt-14 bg-[#080c15]/90 backdrop-blur border-t border-slate-800/60">
        {/* gradient accent line */}
        <div className="h-0.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500" />
        <div className="container-responsive pt-6 pb-8 sm:py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden shadow ring-1 ring-white/10">
                <img
                  src="https://res.cloudinary.com/dlkovvlud/image/upload/w_200,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1751536902/a-modern-logo-design-featuring-primoboos_XhhkS8E_Q5iOwxbAXB4CqQ_HnpCsJn4S1yrhb826jmMDw_nmycqj.jpg"
                  alt="PrimoBoost AI"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">PrimoBoost AI</p>
                <p className="text-xs text-slate-400">Resume Intelligence</p>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-sm text-slate-400 text-center md:text-left">
              (c) {new Date().getFullYear()} PrimoBoost AI. All rights reserved.
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/primoboostai"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-pink-300 bg-white/5 hover:bg-white/10 hover:ring-2 hover:ring-pink-300/40 transition-all"
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/primoboost-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-cyan-300 bg-white/5 hover:bg-white/10 hover:ring-2 hover:ring-cyan-300/40 transition-all"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/0000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-emerald-300 bg-white/5 hover:bg-white/10 hover:ring-2 hover:ring-emerald-300/40 transition-all"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <WhatsappIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};




