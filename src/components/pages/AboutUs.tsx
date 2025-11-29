import React from "react";
import {
  Users,
  Target,
  Award,
  Sparkles,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle,
  Zap,
  Heart,
  Globe
} from "lucide-react";
import { Card } from "../common/Card";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { AnimatedCard, GradientButton, FloatingParticles, ChristmasSnow } from "../ui";

const values = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "People First",
    description:
      "Every decision we make is centered around helping people achieve their career goals and unlock their potential."
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Innovation",
    description:
      "We continuously push the boundaries of what's possible with AI to deliver cutting-edge solutions."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Trust",
    description:
      "We maintain the highest standards of security, privacy, and reliability in everything we do."
  }
];

export const AboutUs: React.FC = () => {
  const navigate = useNavigate();
  const { isChristmasMode, colors } = useTheme();

  const stats = [
    { number: "50,000+", label: "Resumes Optimized", icon: <TrendingUp className="w-5 h-5" />, microcopy: "Trusted by 50,000+ professionals" },
    { number: "95%", label: "Success Rate", icon: <Award className="w-5 h-5" />, microcopy: "Achieved by our AI-driven approach" },
    { number: "24/7", label: "AI Support", icon: <Clock className="w-5 h-5" />, microcopy: "Instant assistance whenever you need it" },
    { number: "100+", label: "Countries Served", icon: <Globe className="w-5 h-5" />, microcopy: "Empowering careers globally" }
  ];

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Optimization",
      description: "Our advanced AI analyzes your resume against job requirements and optimizes it for maximum impact.",
      gradient: "from-blue-50 to-purple-50"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "ATS-Friendly Formatting",
      description: "Ensure your resume passes through Applicant Tracking Systems with our specialized formatting.",
      gradient: "from-green-50 to-emerald-50"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "JD-Based Projects",
      description: "Get targeted project suggestions based on your job description to make your resume more relevant.",
      gradient: "from-orange-50 to-red-50"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Results",
      description: "Get your optimized resume in seconds, not hours. Fast, efficient, and reliable.",
      gradient: "from-yellow-50 to-amber-50"
    }
  ];

  return (
    <div className={`min-h-screen relative overflow-hidden ${
      isChristmasMode
        ? 'bg-gradient-to-b from-[#1a0a0f] via-[#0f1a0f] to-[#070b14]'
        : 'bg-gradient-to-b from-[#0a1e1e] via-[#0d1a1a] to-[#070b14]'
    }`}>
      {/* Radial Glow Overlay */}
      <div className={`pointer-events-none absolute inset-0 ${
        isChristmasMode
          ? 'bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(34,197,94,0.15),transparent_50%)]'
          : 'bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.15),transparent_50%)]'
      }`} />

      {/* Floating Particles */}
      <FloatingParticles count={15} />

      {/* Christmas Snow */}
      {isChristmasMode && <ChristmasSnow count={30} />}
      {/* Hero Section */}
      <div className="relative z-10 overflow-hidden">
        <div className="container-responsive py-16 sm:py-20">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center mx-auto shadow-2xl ${
              isChristmasMode
                ? 'bg-gradient-to-br from-red-500 via-pink-500 to-rose-600 shadow-red-500/50'
                : 'bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-emerald-500/50'
            }`}>
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-bold leading-tight tracking-tight text-white">
              Empowering Careers with{' '}
              <span className={`block bg-gradient-to-r bg-clip-text text-transparent ${
                isChristmasMode
                  ? 'from-red-400 via-yellow-400 to-green-400'
                  : 'from-emerald-400 via-cyan-400 to-teal-400'
              }`}>
                AI Innovation
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
              We're on a mission to help professionals land their dream jobs through intelligent resume optimization and career guidance.
            </p>
            <div className={`inline-flex items-center justify-center backdrop-blur-sm px-5 py-3 rounded-full border ${
              isChristmasMode
                ? 'bg-green-500/10 border-green-400/30'
                : 'bg-emerald-500/10 border-emerald-400/30'
            }`}>
              <span className="text-sm sm:text-base font-semibold text-white">Trusted by 50,000+ professionals</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="relative z-10 py-12 sm:py-14">
        <div className="container-responsive">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {stats.map((stat, index) => (
              <AnimatedCard key={index} glow hoverLift={6} delay={index * 0.1} className="flex items-start gap-3 sm:gap-4 text-left p-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  isChristmasMode
                    ? 'bg-gradient-to-br from-red-500/20 to-green-500/20 text-green-400'
                    : 'bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-emerald-400'
                }`}>
                  {stat.icon}
                </div>
                <div className="space-y-1">
                  <div className="text-xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm font-semibold text-slate-300">{stat.label}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{stat.microcopy}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="relative z-10 py-14 sm:py-16">
        <div className="container-responsive max-w-6xl">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Our Story</h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Born from the frustration of being overlooked by ATS filters, PrimoBoost AI was built to make hiring fairer and faster for every serious job seeker.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-5">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                From frustration to innovation
              </h3>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                We saw skilled professionals getting filtered out because their resumes weren't tuned for modern hiring. Instead of accepting it, we built an AI that translates talent into ATS-friendly, recruiter-ready resumes.
              </p>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                Today, PrimoBoost AI delivers JD-aligned resumes, project suggestions, and outreach that convert - making opportunity about fit, not luck.
              </p>
              <Card padding="md" className="bg-white/70 backdrop-blur dark:bg-dark-100">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-dark-200 dark:text-white">
                    <Target className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">Our mission</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      Democratize career success by making professional resume optimization accessible, affordable, and effective for everyone.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <Card padding="lg" className="bg-gradient-to-br from-blue-600 to-purple-700 text-white border-none shadow-[0_18px_60px_rgba(59,130,246,0.35)]">
              <div className="space-y-4">
                {[
                  "Founded in 2025",
                  "AI-first approach",
                  "Global reach",
                  "Continuous innovation"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-200" />
                    <span className="text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-14 sm:py-16 bg-white dark:bg-dark-100">
        <div className="container-responsive max-w-6xl">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">What Makes Us Different</h2>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We combine cutting-edge AI technology with deep understanding of hiring processes to deliver unmatched results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
            {features.map((feature, index) => (
              <Card
                key={index}
                padding="lg"
                className={`h-full bg-gradient-to-br ${feature.gradient} border border-gray-100 dark:from-dark-200 dark:to-dark-300 dark:border-dark-300`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-blue-700 shadow-sm dark:bg-dark-200 dark:text-white">
                    {feature.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-[16px] font-semibold text-gray-900 dark:text-gray-100">{feature.title}</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-14 sm:py-16 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-dark-200 dark:to-dark-300">
        <div className="container-responsive max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-10">Our Core Values</h2>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {values.map((value) => (
              <Card key={value.title} padding="md" className="h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 mx-auto mb-4 dark:bg-dark-200 dark:text-white">
                  {value.icon}
                </div>
                <h3 className="text-[16px] font-semibold text-gray-900 dark:text-gray-100 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 sm:py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white dark:from-neon-cyan-500 dark:to-neon-purple-500">
        <div className="container-responsive text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold">Ready to Transform Your Career?</h2>
            <p className="text-sm sm:text-base text-blue-50/90 dark:text-gray-200 leading-relaxed">
              Join thousands of professionals who have already upgraded their resumes and landed their dream jobs.
            </p>
            <button
              onClick={() => navigate("/optimizer")}
              className="btn-primary h-12 px-6 rounded-xl text-base font-semibold"
            >
              Start Optimizing Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
