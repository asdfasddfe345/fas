import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Loader2 } from 'lucide-react';

interface GradientSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const GradientSpinner: React.FC<GradientSpinnerProps> = ({
  size = 'md',
  className = '',
}) => {
  const { isChristmasMode } = useTheme();

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`${sizeClasses[size]} ${className}`}
    >
      <Loader2
        className={`w-full h-full ${
          isChristmasMode ? 'text-green-400' : 'text-emerald-400'
        }`}
      />
    </motion.div>
  );
};
