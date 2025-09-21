import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Star, 
  Users, 
  BookOpen, 
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Globe
} from 'lucide-react';
import { Instructor } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import clsx from 'clsx';

interface InstructorCardProps {
  instructor: Instructor;
  className?: string;
}

const InstructorCard: React.FC<InstructorCardProps> = ({ 
  instructor, 
  className 
}) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'github':
        return Github;
      case 'linkedin':
        return Linkedin;
      case 'twitter':
        return Twitter;
      case 'website':
        return Globe;
      default:
        return ExternalLink;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={clsx(
        'group bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden',
        className
      )}
    >
      {/* Instructor Avatar */}
      <div className="relative p-6 text-center">
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {instructor.name.charAt(0)}
            </span>
          </div>
          
          {/* Online Status Indicator */}
          <div className="absolute bottom-6 right-6 rtl:left-6 rtl:right-auto w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
        </div>

        {/* Instructor Name */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {isRTL ? instructor.nameAr : instructor.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse mb-4">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {instructor.rating}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({instructor.studentCount} {t('common.students')})
          </span>
        </div>
      </div>

      {/* Instructor Bio */}
      <div className="px-6 pb-4">
        <p className="text-gray-600 dark:text-gray-300 text-sm text-center line-clamp-3 mb-4">
          {isRTL ? instructor.bioAr : instructor.bio}
        </p>

        {/* Specialties */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            {t('instructors.specialties')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {instructor.specialties.slice(0, 3).map((specialty, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full"
              >
                {isRTL ? instructor.specialtiesAr[index] || specialty : specialty}
              </span>
            ))}
            {instructor.specialties.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                +{instructor.specialties.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <BookOpen className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {instructor.courseCount}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {t('common.courses')}
            </div>
          </div>
          <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <Users className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {instructor.studentCount.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {t('common.students')}
            </div>
          </div>
        </div>

        {/* Social Links */}
        {Object.keys(instructor.socialLinks).length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              {t('instructors.socialLinks')}
            </h4>
            <div className="flex justify-center space-x-2 rtl:space-x-reverse">
              {Object.entries(instructor.socialLinks).map(([platform, url]) => {
                if (!url) return null;
                const Icon = getSocialIcon(platform);
                return (
                  <motion.a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                    aria-label={`${instructor.name} ${platform}`}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-6 pb-6">
        <div className="flex space-x-2 rtl:space-x-reverse">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-4 py-2 border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 text-sm font-medium rounded-lg transition-colors duration-200"
          >
            {t('instructors.follow')}
          </motion.button>
          <Link
            to={`/instructors/${instructor.id}`}
            className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 text-center"
          >
            {t('instructors.contact')}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default InstructorCard;
