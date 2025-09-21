import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Testimonial } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  testimonial, 
  className 
}) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? 'text-yellow-500 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  const content = isRTL ? testimonial.contentAr : testimonial.content;
  const name = isRTL ? testimonial.nameAr : testimonial.name;
  const course = isRTL ? testimonial.courseAr : testimonial.course;

  const shouldShowReadMore = content.length > 150;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -4 }}
      className={`bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-start space-x-4 rtl:space-x-reverse mb-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center">
            <span className="text-lg font-semibold text-primary-600 dark:text-primary-400">
              {name.charAt(0)}
            </span>
          </div>
        </div>

        {/* Name and Rating */}
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            {name}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {course}
          </p>
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {renderStars(testimonial.rating)}
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2 rtl:mr-2">
              {testimonial.rating}/5
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {isExpanded ? content : content.substring(0, 150)}
          {shouldShowReadMore && !isExpanded && '...'}
        </p>
        
        {shouldShowReadMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-1 rtl:space-x-reverse text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium mt-2 transition-colors duration-200"
          >
            <span>
              {isExpanded ? t('testimonials.readLess') : t('testimonials.readMore')}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>
          {new Date(testimonial.createdAt).toLocaleDateString()}
        </span>
        <div className="flex items-center space-x-1 rtl:space-x-reverse">
          <span>{t('testimonials.rating')}:</span>
          <span className="font-semibold">{testimonial.rating}</span>
          <span>{t('testimonials.stars')}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
