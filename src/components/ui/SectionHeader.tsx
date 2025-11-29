import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: LucideIcon;
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
  alignment = 'center',
  className = '',
}) => {
  const { getBadgeClasses, isChristmasMode, colors } = useTheme();

  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={`flex flex-col ${alignmentClasses[alignment]} space-y-4 ${className}`}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm backdrop-blur ${getBadgeClasses()}`}
        >
          {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
          <span>{badge}</span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
      >
        {title.includes('{{gradient}}') ? (
          <>
            {title.split('{{gradient}}')[0]}
            <span
              className={`block mt-2 text-transparent bg-clip-text bg-gradient-to-r ${
                isChristmasMode
                  ? 'from-red-300 via-emerald-300 to-green-400'
                  : 'from-emerald-300 via-cyan-300 to-blue-400'
              }`}
            >
              {title.split('{{gradient}}')[1]}
            </span>
          </>
        ) : (
          title
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-slate-300 max-w-3xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
