import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hoverLift?: number;
  delay?: number;
  onClick?: () => void;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  glow = true,
  hoverLift = 8,
  delay = 0,
  onClick,
}) => {
  const { getCardClasses } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -hoverLift, transition: { duration: 0.3 } }}
      className={`${getCardClasses(glow)} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};
