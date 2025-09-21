import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Star, 
  Users, 
  BookOpen, 
  Github,
  Linkedin,
  Twitter,
  Globe,
  ExternalLink,
  Mail,
  Calendar,
  Award
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import CourseCard from '@/components/Courses/CourseCard';
import fakeApi from '@/utils/fakeApi';
import clsx from 'clsx';

const InstructorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const { data: instructorData, isLoading, error } = useQuery({
    queryKey: ['instructor', id],
    queryFn: () => fakeApi.getInstructor(id!),
    enabled: !!id,
  });

  const { data: coursesData } = useQuery({
    queryKey: ['courses', { instructor: id, limit: 6 }],
    queryFn: () => fakeApi.getCourses({ instructor: id, limit: 6 }),
    enabled: !!id,
  });

  const instructor = instructorData?.data;

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

  if (error || !instructor) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Instructor Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The instructor you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/instructors"
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200"
          >
            Browse All Instructors
          </Link>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-500 dark:text-gray-400">
            <li><Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">Home</Link></li>
            <li>/</li>
            <li><Link to="/instructors" className="hover:text-primary-600 dark:hover:text-primary-400">Instructors</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white">{isRTL ? instructor.nameAr : instructor.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Instructor Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6 rtl:md:space-x-reverse">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                      {instructor.name.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {isRTL ? instructor.nameAr : instructor.name}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    {isRTL ? instructor.bioAr : instructor.bio}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Star className="w-5 h-5 text-yellow-500" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {instructor.rating}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {t('common.rating')}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <BookOpen className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {instructor.courseCount}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {t('common.courses')}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {instructor.studentCount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {t('common.students')}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Award className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        5+
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Years
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('instructors.bio')}
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {isRTL ? instructor.bioAr : instructor.bio}
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  With over 5 years of experience in software development and teaching, 
                  {instructor.name} has helped thousands of students master programming concepts 
                  and build real-world applications. Their expertise spans multiple technologies 
                  and they are passionate about making complex topics accessible to learners of all levels.
                </p>
              </div>
            </motion.div>

            {/* Specialties */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('instructors.specialties')}
              </h2>
              <div className="flex flex-wrap gap-3">
                {instructor.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full font-medium"
                  >
                    {isRTL ? instructor.specialtiesAr[index] || specialty : specialty}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Courses */}
            {coursesData?.data && coursesData.data.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t('common.courses')} by {isRTL ? instructor.nameAr : instructor.name}
                  </h2>
                  <Link
                    to={`/courses?instructor=${instructor.id}`}
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                  >
                    View All
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {coursesData.data.slice(0, 4).map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      showInstructor={false}
                      className="shadow-none border border-gray-200 dark:border-gray-700"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('instructors.contact')}
              </h3>

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                  {t('instructors.follow')}
                </motion.button>

                <button className="w-full py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold rounded-lg transition-colors duration-200">
                  Send Message
                </button>
              </div>

              {/* Social Links */}
              {Object.keys(instructor.socialLinks).length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                    {t('instructors.socialLinks')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
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
                          <Icon className="w-5 h-5" />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Teaching Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Students</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {instructor.studentCount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Courses Created</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {instructor.courseCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Average Rating</span>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {instructor.rating}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Experience</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    5+ Years
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDetailPage;
