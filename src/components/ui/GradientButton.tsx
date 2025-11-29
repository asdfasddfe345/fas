import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { LucideIcon } from 'lucide-react';

interface GradientButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}) => {
  const { getButtonClasses } = useTheme();

  const sizeClasses = {
    sm: 'h-10 px-4 text-sm',
    md: 'h-14 px-8 text-lg',
    lg: 'h-16 px-10 text-xl',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: 'spring', stiffness: 400 }}
      className={`
        ${getButtonClasses(variant)}
        ${sizeClasses[size]}
        rounded-xl font-semibold
        shadow-lg hover:shadow-xl
        relative overflow-hidden
        flex items-center justify-center gap-3
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        group
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {Icon && <Icon className="w-5 h-5 relative z-10" />}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
