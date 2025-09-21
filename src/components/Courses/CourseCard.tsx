import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Clock, 
  Star, 
  Users, 
  Play, 
  Bookmark, 
  BookOpen,
  Award,
  DollarSign
} from 'lucide-react';
import { Course } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import clsx from 'clsx';

interface CourseCardProps {
  course: Course;
  showInstructor?: boolean;
  className?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  showInstructor = true,
  className 
}) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const discountPercentage = course.originalPrice 
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={clsx(
        'group bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden',
        className
      )}
    >
      {/* Course Image */}
      <div className="relative overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
          <BookOpen className="w-16 h-16 text-primary-500 dark:text-primary-400" />
        </div>
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 rtl:right-3 rtl:left-auto">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              -{discountPercentage}%
            </span>
          </div>
        )}

        {/* Featured Badge */}
        {course.isFeatured && (
          <div className="absolute top-3 right-3 rtl:left-3 rtl:right-auto">
            <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              {t('common.featured')}
            </span>
          </div>
        )}

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg"
          >
            <Play className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </motion.div>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Level Badge */}
        <div className="mb-3">
          <span className={clsx(
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            getLevelColor(course.level)
          )}>
            {t(`levels.${course.level}`)}
          </span>
        </div>

        {/* Course Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {isRTL ? course.titleAr : course.title}
        </h3>

        {/* Course Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {isRTL ? course.descriptionAr : course.description}
        </p>

        {/* Instructor */}
        {showInstructor && (
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                {course.instructor.name.charAt(0)}
              </span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {isRTL ? course.instructor.nameAr : course.instructor.name}
            </span>
          </div>
        )}

        {/* Course Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <Clock className="w-4 h-4" />
              <span>{course.duration}h</span>
            </div>
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <Users className="w-4 h-4" />
              <span>{course.reviewCount}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{course.rating}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {course.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded-full"
            >
              {isRTL ? course.tagsAr[index] || tag : tag}
            </span>
          ))}
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {course.price === 0 ? (
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                {t('common.free')}
              </span>
            ) : (
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatPrice(course.price)}
                </span>
                {course.originalPrice && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                    {formatPrice(course.originalPrice)}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
            >
              <Bookmark className="w-5 h-5" />
            </motion.button>
            <Link
              to={`/courses/${course.id}`}
              className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              <Play className="w-4 h-4 ml-1 rtl:mr-1" />
              {t('courses.preview')}
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
