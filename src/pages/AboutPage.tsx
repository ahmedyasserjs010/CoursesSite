import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  BookOpen, 
  Award, 
  Globe, 
  Target, 
  Heart,
  Code,
  GraduationCap,
  Lightbulb,
  Shield,
  Clock
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutPage: React.FC = () => {
  const { isRTL } = useLanguage();

  const stats = [
    { label: 'Students Enrolled', value: '50,000+', icon: Users },
    { label: 'Courses Available', value: '500+', icon: BookOpen },
    { label: 'Expert Instructors', value: '100+', icon: Award },
    { label: 'Countries Reached', value: '120+', icon: Globe },
  ];

  const values = [
    {
      icon: Code,
      title: 'Quality Education',
      titleAr: 'التعليم عالي الجودة',
      description: 'We provide top-notch programming education with industry best practices and real-world projects.',
      descriptionAr: 'نقدم تعليماً برمجياً عالي الجودة مع أفضل الممارسات الصناعية ومشاريع حقيقية.'
    },
    {
      icon: GraduationCap,
      title: 'Expert Instructors',
      titleAr: 'مدربون خبراء',
      description: 'Learn from industry professionals with years of experience in top tech companies.',
      descriptionAr: 'تعلم من المحترفين في الصناعة مع سنوات من الخبرة في أفضل شركات التكنولوجيا.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      titleAr: 'الابتكار',
      description: 'Stay ahead with cutting-edge technologies and modern development practices.',
      descriptionAr: 'ابق في المقدمة مع أحدث التقنيات وممارسات التطوير الحديثة.'
    },
    {
      icon: Shield,
      title: 'Support',
      titleAr: 'الدعم',
      description: 'Get 24/7 support from our community and dedicated support team.',
      descriptionAr: 'احصل على دعم على مدار الساعة من مجتمعنا وفريق الدعم المخصص.'
    }
  ];

  const team = [
    {
      name: 'Ahmed Hassan',
      nameAr: 'أحمد حسن',
      role: 'Founder & CEO',
      roleAr: 'المؤسس والرئيس التنفيذي',
      bio: 'Former Google engineer with 10+ years of experience in web development.',
      bioAr: 'مهندس سابق في جوجل مع أكثر من 10 سنوات من الخبرة في تطوير الويب.',
      image: '/team/ahmed.jpg'
    },
    {
      name: 'Sarah Johnson',
      nameAr: 'سارة جونسون',
      role: 'Head of Education',
      roleAr: 'رئيسة التعليم',
      bio: 'Education specialist with expertise in curriculum development and learning methodologies.',
      bioAr: 'أخصائية تعليم مع خبرة في تطوير المناهج ومنهجيات التعلم.',
      image: '/team/sarah.jpg'
    },
    {
      name: 'Mohammed Ali',
      nameAr: 'محمد علي',
      role: 'Lead Instructor',
      roleAr: 'المدرب الرئيسي',
      bio: 'Full-stack developer and passionate educator with 8+ years of teaching experience.',
      bioAr: 'مطور full-stack ومعلم متحمس مع أكثر من 8 سنوات من الخبرة في التدريس.',
      image: '/team/mohammed.jpg'
    }
  ];

  const milestones = [
    { year: '2020', title: 'Founded', titleAr: 'تأسيس', description: 'Started with a vision to make programming education accessible to everyone.' },
    { year: '2021', title: 'First 1000 Students', titleAr: 'أول 1000 طالب', description: 'Reached our first milestone of 1000 enrolled students.' },
    { year: '2022', title: 'International Expansion', titleAr: 'التوسع الدولي', description: 'Expanded to serve students in 50+ countries worldwide.' },
    { year: '2023', title: 'AI Integration', titleAr: 'دمج الذكاء الاصطناعي', description: 'Introduced AI-powered learning tools and personalized curricula.' },
    { year: '2024', title: '50K+ Students', titleAr: 'أكثر من 50 ألف طالب', description: 'Celebrated reaching over 50,000 students globally.' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About تعلم برمجة
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We are passionate about making programming education accessible, engaging, and effective for learners worldwide. 
              Our mission is to empower the next generation of developers with the skills they need to succeed in the digital age.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                      <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                To democratize programming education by providing high-quality, accessible, and engaging learning experiences 
                that prepare students for successful careers in technology, regardless of their background or location.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Target className="w-6 h-6 text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Accessible Education</h3>
                    <p className="text-gray-600 dark:text-gray-300">Making quality programming education available to everyone, everywhere.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Heart className="w-6 h-6 text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Student Success</h3>
                    <p className="text-gray-600 dark:text-gray-300">Committed to helping every student achieve their learning goals.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Globe className="w-6 h-6 text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Global Impact</h3>
                    <p className="text-gray-600 dark:text-gray-300">Building a worldwide community of skilled developers.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Code className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Since 2020
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Empowering developers worldwide
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">50K+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Students</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">500+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Courses</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                      <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {isRTL ? value.titleAr : value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {isRTL ? value.descriptionAr : value.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The passionate educators and industry experts behind our success
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {isRTL ? member.nameAr : member.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                  {isRTL ? member.roleAr : member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {isRTL ? member.bioAr : member.bio}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Key milestones in our mission to democratize programming education
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200 dark:bg-primary-800"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right rtl:text-left rtl:pr-0 rtl:pl-8' : 'pl-8 text-left rtl:text-right rtl:pl-0 rtl:pr-8'}`}>
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {isRTL ? milestone.titleAr : milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-primary-600 dark:text-primary-400 rounded-full border-4 border-white dark:border-gray-800 z-10"></div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Start Your Programming Journey?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Join thousands of students who have already transformed their careers with our comprehensive programming courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Browse Courses
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
