import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { LucideIcon } from 'lucide-react';

interface GlowBadgeProps {
  text: string;
  icon?: LucideIcon | string;
  variant?: 'default' | 'success' | 'warning' | 'info';
  pulse?: boolean;
  className?: string;
}

export const GlowBadge: React.FC<GlowBadgeProps> = ({
  text,
  icon,
  variant = 'default',
  pulse = false,
  className = '',
}) => {
  const { getBadgeClasses, isChristmasMode } = useTheme();

  const variantClasses = {
    default: getBadgeClasses(),
    success: isChristmasMode
      ? 'bg-green-500/10 border border-green-400/30 text-green-300'
      : 'bg-emerald-500/10 border border-emerald-400/30 text-emerald-300',
    warning: 'bg-amber-500/10 border border-amber-400/30 text-amber-300',
    info: 'bg-cyan-500/10 border border-cyan-400/30 text-cyan-300',
  };

  const Icon = typeof icon === 'string' ? null : icon;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium backdrop-blur ${variantClasses[variant]} ${className}`}
    >
      {pulse && (
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`w-2 h-2 rounded-full ${
            variant === 'success'
              ? isChristmasMode
                ? 'bg-green-400'
                : 'bg-emerald-400'
              : variant === 'warning'
              ? 'bg-amber-400'
              : variant === 'info'
              ? 'bg-cyan-400'
              : isChristmasMode
              ? 'bg-red-400'
              : 'bg-emerald-400'
          }`}
        />
      )}
      {typeof icon === 'string' ? (
        <span className="text-base">{icon}</span>
      ) : (
        Icon && <Icon className="w-4 h-4" />
      )}
      <span>{text}</span>
    </motion.div>
  );
};
