import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  BookOpen, 
  Clock, 
  Award, 
  Play,
  CheckCircle,
  Star,
  Download,
  Eye
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import CourseCard from '@/components/Courses/CourseCard';
import fakeApi from '@/utils/fakeApi';

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { user } = useAuth();

  const { data: coursesData, isLoading: coursesLoading } = useQuery({
    queryKey: ['courses', { enrolled: true }],
    queryFn: () => fakeApi.getCourses({ limit: 6 }),
  });

  const { data: recommendationsData, isLoading: recommendationsLoading } = useQuery({
    queryKey: ['courses', { recommendations: true }],
    queryFn: () => fakeApi.getCourses({ limit: 4, sortBy: 'rating', sortOrder: 'desc' }),
  });

  const mockProgress = [
    { course: 'Complete React Development Course', progress: 75, lastAccessed: '2 days ago' },
    { course: 'Advanced TypeScript Patterns', progress: 45, lastAccessed: '1 week ago' },
    { course: 'Node.js Backend Development', progress: 20, lastAccessed: '3 days ago' },
  ];

  const mockCertificates = [
    { name: 'JavaScript Fundamentals', date: '2024-01-15', course: 'JavaScript Basics' },
    { name: 'React Development', date: '2024-02-20', course: 'Complete React Course' },
  ];

  const stats = [
    { label: t('dashboard.myCourses'), value: '12', icon: BookOpen, color: 'text-blue-600 dark:text-blue-400' },
    { label: t('dashboard.completed'), value: '8', icon: CheckCircle, color: 'text-green-600 dark:text-green-400' },
    { label: t('dashboard.myCertificates'), value: '5', icon: Award, color: 'text-yellow-600 dark:text-yellow-400' },
    { label: 'Study Hours', value: '156', icon: Clock, color: 'text-purple-600 dark:text-purple-400' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('dashboard.welcome')}, {user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Here's your learning progress and recommended courses
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -2 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                {t('dashboard.continueLearning')}
              </h2>
              
              <div className="space-y-4">
                {mockProgress.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900 dark:text-white">{item.course}</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{item.lastAccessed}</span>
                    </div>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {item.progress}%
                      </span>
                    </div>
                    <div className="mt-3 flex items-center space-x-2 rtl:space-x-reverse">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-1 rtl:space-x-reverse px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded-lg transition-colors duration-200"
                      >
                        <Play className="w-4 h-4" />
                        <span>{t('dashboard.resumeCourse')}</span>
                      </motion.button>
                      <button className="flex items-center space-x-1 rtl:space-x-reverse px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm rounded-lg transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* My Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('dashboard.myCourses')}
                </h2>
                <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
                  View All
                </button>
              </div>

              {coursesLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {coursesData?.data?.slice(0, 4).map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('dashboard.recentActivity')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">Completed lesson: React Hooks</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">Started new course: TypeScript</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">Earned certificate: JavaScript</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">3 days ago</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Certificates */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('dashboard.myCertificates')}
              </h3>
              <div className="space-y-3">
                {mockCertificates.map((cert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{cert.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{cert.course}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors duration-200"
                    >
                      <Download className="w-4 h-4" />
                    </motion.button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('dashboard.recommendations')}
              </h3>
              {recommendationsLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {recommendationsData?.data?.slice(0, 3).map((course) => (
                    <div key={course.id} className="flex items-center space-x-3 rtl:space-x-reverse p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow duration-200">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {isRTL ? course.titleAr : course.title}
                        </p>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1">
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">{course.rating}</span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{course.duration}h</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
