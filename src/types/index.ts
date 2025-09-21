// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Course Types
export interface Course {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  instructor: Instructor;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in hours
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  thumbnail: string;
  tags: string[];
  tagsAr: string[];
  lessons: Lesson[];
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  isFeatured: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  duration: number; // in minutes
  videoUrl?: string;
  resources: Resource[];
  isPreview: boolean;
  order: number;
}

export interface Resource {
  id: string;
  title: string;
  titleAr: string;
  type: 'pdf' | 'code' | 'video' | 'link';
  url: string;
}

// Instructor Types
export interface Instructor {
  id: string;
  name: string;
  nameAr: string;
  bio: string;
  bioAr: string;
  avatar: string;
  rating: number;
  studentCount: number;
  courseCount: number;
  specialties: string[];
  specialtiesAr: string[];
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
  preferences: {
    language: 'en' | 'ar';
    theme: 'light' | 'dark' | 'system';
  };
  enrolledCourses: string[];
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  nameAr: string;
  content: string;
  contentAr: string;
  rating: number;
  avatar: string;
  course: string;
  courseAr: string;
  createdAt: string;
}

// API Query Types
export interface CourseQuery {
  page?: number;
  limit?: number;
  search?: string;
  level?: string;
  instructor?: string;
  tags?: string[];
  sortBy?: 'newest' | 'oldest' | 'rating' | 'price' | 'duration';
  sortOrder?: 'asc' | 'desc';
}

export interface InstructorQuery {
  page?: number;
  limit?: number;
  search?: string;
  specialties?: string[];
}

// Theme Types
export type Theme = 'light' | 'dark' | 'system';

// Language Types
export type Language = 'en' | 'ar';

// UI State Types
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface ModalState {
  isOpen: boolean;
  type?: 'auth' | 'course' | 'instructor';
  data?: any;
}

// Navigation Types
export interface NavItem {
  label: string;
  labelAr: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

// Animation Types
export interface AnimationVariants {
  hidden: any;
  visible: any;
  exit?: any;
}

// Error Types
export interface ApiError {
  message: string;
  code: string;
  status: number;
  details?: any;
}
