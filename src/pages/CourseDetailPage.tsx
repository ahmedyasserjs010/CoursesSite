import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  Share2,
  Bookmark,
  CheckCircle,
  Lock
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import CourseCard from '@/components/Courses/CourseCard';
import fakeApi from '@/utils/fakeApi';
import clsx from 'clsx';

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'instructor' | 'reviews'>('overview');

  const { data: courseData, isLoading, error } = useQuery({
    queryKey: ['course', id],
    queryFn: () => fakeApi.getCourse(id!),
    enabled: !!id,
  });

  const { data: relatedCoursesData } = useQuery({
    queryKey: ['courses', { related: true, limit: 3 }],
    queryFn: () => fakeApi.getCourses({ limit: 3, sortBy: 'rating', sortOrder: 'desc' }),
  });

  const course = courseData?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Course Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/courses"
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200"
          >
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const discountPercentage = course.originalPrice 
    ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
    : 0;

  const tabs = [
    { id: 'overview', label: t('courses.description'), icon: BookOpen },
    { id: 'curriculum', label: t('courses.curriculum'), icon: BookOpen },
    { id: 'instructor', label: t('courses.instructor'), icon: Users },
    { id: 'reviews', label: t('courses.reviews'), icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-500 dark:text-gray-400">
            <li><Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">Home</Link></li>
            <li>/</li>
            <li><Link to="/courses" className="hover:text-primary-600 dark:hover:text-primary-400">Courses</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white">{isRTL ? course.titleAr : course.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {isRTL ? course.titleAr : course.title}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    {isRTL ? course.descriptionAr : course.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse ml-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    <Bookmark className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Course Stats */}
              <div className="flex items-center space-x-6 rtl:space-x-reverse text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{course.rating}</span>
                  <span>({course.reviewCount} {t('common.reviews')})</span>
                </div>
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <Users className="w-4 h-4" />
                  <span>{course.reviewCount} {t('common.students')}</span>
                </div>
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration} {t('courses.hours')}</span>
                </div>
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.lessons.length} {t('courses.lessons')}</span>
                </div>
              </div>
            </motion.div>

            {/* Course Video */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
            >
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg"
                >
                  <Play className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </motion.button>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm"
            >
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-8 rtl:space-x-reverse">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={clsx(
                          'flex items-center space-x-2 rtl:space-x-reverse py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
                          activeTab === tab.id
                            ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        {t('courses.whatYouWillLearn')}
                      </h3>
                      <ul className="space-y-2">
                        {course.lessons.slice(0, 5).map((lesson) => (
                          <li key={lesson.id} className="flex items-start space-x-3 rtl:space-x-reverse">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {isRTL ? lesson.titleAr : lesson.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        {t('courses.requirements')}
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-3 rtl:space-x-reverse">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">Basic computer skills</span>
                        </li>
                        <li className="flex items-start space-x-3 rtl:space-x-reverse">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">No prior programming experience required</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div className="space-y-4">
                    {course.lessons.map((lesson, index) => (
                      <div key={lesson.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                              {index + 1}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {isRTL ? lesson.titleAr : lesson.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {isRTL ? lesson.descriptionAr : lesson.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {lesson.duration} min
                          </span>
                          {lesson.isPreview ? (
                            <Play className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                          ) : (
                            <Lock className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'instructor' && (
                  <div className="flex items-start space-x-6 rtl:space-x-reverse">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {course.instructor.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {isRTL ? course.instructor.nameAr : course.instructor.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {isRTL ? course.instructor.bioAr : course.instructor.bio}
                      </p>
                      <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500 dark:text-gray-400">
                        <span>{course.instructor.courseCount} {t('common.courses')}</span>
                        <span>{course.instructor.studentCount.toLocaleString()} {t('common.students')}</span>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{course.instructor.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        {course.rating}
                      </div>
                      <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse mb-2">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(course.rating)
                                ? 'text-yellow-500 fill-current'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        Based on {course.reviewCount} reviews
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500 dark:text-gray-400">
                        Reviews will be displayed here
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-8"
            >
              <div className="text-center mb-6">
                {course.price === 0 ? (
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {t('common.free')}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {formatPrice(course.price)}
                    </div>
                    {course.originalPrice && (
                      <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                        <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                          {formatPrice(course.originalPrice)}
                        </span>
                        <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 px-2 py-1 rounded-full text-sm font-semibold">
                          -{discountPercentage}%
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  {isAuthenticated ? t('courses.enroll') : t('common.login')}
                </motion.button>

                <button className="w-full py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold rounded-lg transition-colors duration-200">
                  {t('courses.preview')}
                </button>
              </div>

              <div className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-between">
                  <span>{t('courses.duration')}</span>
                  <span>{course.duration} {t('courses.hours')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t('courses.lessons')}</span>
                  <span>{course.lessons.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t('courses.level')}</span>
                  <span>{t(`levels.${course.level}`)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{t('courses.certificate')}</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
              </div>
            </motion.div>

            {/* Related Courses */}
            {relatedCoursesData?.data && relatedCoursesData.data.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t('courses.relatedCourses')}
                </h3>
                <div className="space-y-4">
                  {relatedCoursesData.data.slice(0, 3).map((relatedCourse) => (
                    <CourseCard
                      key={relatedCourse.id}
                      course={relatedCourse}
                      showInstructor={false}
                      className="shadow-none border border-gray-200 dark:border-gray-700"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
