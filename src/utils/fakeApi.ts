import { 
  Course, 
  Instructor, 
  User, 
  LoginCredentials, 
  RegisterData, 
  Testimonial,
  CourseQuery,
  InstructorQuery,
  ApiResponse,
  PaginationInfo,
  ApiError
} from '@/types';

// Configuration for API behavior
let latency = 800; // milliseconds
let failureRate = 0.05; // 5% failure rate

// Mock data storage
let users: User[] = [
  {
    id: '1',
    email: 'demo@example.com',
    name: 'Demo User',
    avatar: '/avatars/demo.jpg',
    role: 'student',
    preferences: {
      language: 'en',
      theme: 'system'
    },
    enrolledCourses: ['1', '2'],
    createdAt: '2024-01-01T00:00:00Z'
  }
];

let currentUser: User | null = null;

// Utility functions
const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

const shouldFail = (): boolean => Math.random() < failureRate;

const createError = (message: string, status: number = 500): ApiError => ({
  message,
  code: `ERROR_${status}`,
  status,
  details: { timestamp: new Date().toISOString() }
});

const createSuccessResponse = <T>(data: T, pagination?: PaginationInfo): ApiResponse<T> => ({
  data,
  success: true,
  pagination
});

const createErrorResponse = (error: ApiError): ApiResponse<null> => ({
  data: null as any,
  success: false,
  message: error.message
});

// Mock data
const courses: Course[] = [
  {
    id: '1',
    title: 'Complete React Development Course',
    titleAr: 'دورة تطوير React الكاملة',
    description: 'Learn React from scratch with modern hooks, context, and best practices',
    descriptionAr: 'تعلم React من الصفر مع الـ hooks الحديثة والـ context وأفضل الممارسات',
    instructor: {
      id: '1',
      name: 'Ahmed Hassan',
      nameAr: 'أحمد حسن',
      bio: 'Senior React Developer with 8+ years experience',
      bioAr: 'مطور React كبير مع خبرة تزيد عن 8 سنوات',
      avatar: '/instructors/ahmed.jpg',
      rating: 4.9,
      studentCount: 1250,
      courseCount: 12,
      specialties: ['React', 'TypeScript', 'Node.js'],
      specialtiesAr: ['React', 'TypeScript', 'Node.js'],
      socialLinks: {
        github: 'https://github.com/ahmedhassan',
        linkedin: 'https://linkedin.com/in/ahmedhassan'
      }
    },
    level: 'beginner',
    duration: 40,
    price: 99,
    originalPrice: 149,
    rating: 4.8,
    reviewCount: 324,
    thumbnail: '/courses/react-course.jpg',
    tags: ['React', 'JavaScript', 'Frontend'],
    tagsAr: ['React', 'JavaScript', 'واجهة المستخدم'],
    lessons: [
      {
        id: '1-1',
        title: 'Introduction to React',
        titleAr: 'مقدمة في React',
        description: 'Understanding React basics and JSX',
        descriptionAr: 'فهم أساسيات React و JSX',
        duration: 45,
        videoUrl: '/videos/react-intro.mp4',
        resources: [],
        isPreview: true,
        order: 1
      },
      {
        id: '1-2',
        title: 'Components and Props',
        titleAr: 'المكونات والخصائص',
        description: 'Creating and using React components',
        descriptionAr: 'إنشاء واستخدام مكونات React',
        duration: 60,
        videoUrl: '/videos/react-components.mp4',
        resources: [],
        isPreview: false,
        order: 2
      }
    ],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    isPublished: true,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Advanced TypeScript Patterns',
    titleAr: 'أنماط TypeScript المتقدمة',
    description: 'Master advanced TypeScript concepts and patterns',
    descriptionAr: 'إتقان مفاهيم وأنماط TypeScript المتقدمة',
    instructor: {
      id: '2',
      name: 'Sarah Johnson',
      nameAr: 'سارة جونسون',
      bio: 'TypeScript Expert and Software Architect',
      bioAr: 'خبيرة TypeScript ومهندسة برمجيات',
      avatar: '/instructors/sarah.jpg',
      rating: 4.9,
      studentCount: 890,
      courseCount: 8,
      specialties: ['TypeScript', 'Architecture', 'Design Patterns'],
      specialtiesAr: ['TypeScript', 'الهندسة المعمارية', 'أنماط التصميم'],
      socialLinks: {
        twitter: 'https://twitter.com/sarahjohnson',
        linkedin: 'https://linkedin.com/in/sarahjohnson'
      }
    },
    level: 'advanced',
    duration: 35,
    price: 149,
    originalPrice: 199,
    rating: 4.9,
    reviewCount: 156,
    thumbnail: '/courses/typescript-course.jpg',
    tags: ['TypeScript', 'Advanced', 'Patterns'],
    tagsAr: ['TypeScript', 'متقدم', 'أنماط'],
    lessons: [
      {
        id: '2-1',
        title: 'Advanced Types',
        titleAr: 'الأنواع المتقدمة',
        description: 'Conditional types, mapped types, and template literals',
        descriptionAr: 'الأنواع الشرطية والأنواع المعينة والحروف النصية القالبية',
        duration: 90,
        videoUrl: '/videos/ts-advanced-types.mp4',
        resources: [],
        isPreview: true,
        order: 1
      }
    ],
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
    isPublished: true,
    isFeatured: false
  }
];

const instructors: Instructor[] = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    nameAr: 'أحمد حسن',
    bio: 'Senior React Developer with 8+ years experience building scalable web applications',
    bioAr: 'مطور React كبير مع خبرة تزيد عن 8 سنوات في بناء تطبيقات الويب القابلة للتوسع',
    avatar: '/instructors/ahmed.jpg',
    rating: 4.9,
    studentCount: 1250,
    courseCount: 12,
    specialties: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    specialtiesAr: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    socialLinks: {
      github: 'https://github.com/ahmedhassan',
      linkedin: 'https://linkedin.com/in/ahmedhassan',
      twitter: 'https://twitter.com/ahmedhassan'
    }
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    nameAr: 'سارة جونسون',
    bio: 'TypeScript Expert and Software Architect with focus on clean code and design patterns',
    bioAr: 'خبيرة TypeScript ومهندسة برمجيات مع التركيز على الكود النظيف وأنماط التصميم',
    avatar: '/instructors/sarah.jpg',
    rating: 4.9,
    studentCount: 890,
    courseCount: 8,
    specialties: ['TypeScript', 'Architecture', 'Design Patterns', 'Clean Code'],
    specialtiesAr: ['TypeScript', 'الهندسة المعمارية', 'أنماط التصميم', 'الكود النظيف'],
    socialLinks: {
      twitter: 'https://twitter.com/sarahjohnson',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      website: 'https://sarahjohnson.dev'
    }
  }
];

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Mohammed Ali',
    nameAr: 'محمد علي',
    content: 'This course completely changed my understanding of React. The instructor explains complex concepts in a simple way.',
    contentAr: 'هذه الدورة غيرت فهمي لـ React تماماً. المدرس يشرح المفاهيم المعقدة بطريقة بسيطة.',
    rating: 5,
    avatar: '/testimonials/mohammed.jpg',
    course: 'Complete React Development Course',
    courseAr: 'دورة تطوير React الكاملة',
    createdAt: '2024-01-25T00:00:00Z'
  },
  {
    id: '2',
    name: 'Fatima Ahmed',
    nameAr: 'فاطمة أحمد',
    content: 'Excellent course! The TypeScript patterns taught here are exactly what I needed for my projects.',
    contentAr: 'دورة ممتازة! أنماط TypeScript التي تم تعليمها هنا هي بالضبط ما احتجته لمشاريعي.',
    rating: 5,
    avatar: '/testimonials/fatima.jpg',
    course: 'Advanced TypeScript Patterns',
    courseAr: 'أنماط TypeScript المتقدمة',
    createdAt: '2024-01-28T00:00:00Z'
  }
];

// API Functions
export const fakeApi = {
  // Configuration
  setLatency: (ms: number) => { latency = ms; },
  setFailureRate: (rate: number) => { failureRate = Math.max(0, Math.min(1, rate)); },
  getLatency: () => latency,
  getFailureRate: () => failureRate,

  // Auth
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    await delay(latency);
    
    if (shouldFail()) {
      throw createError('Login failed. Please check your credentials.', 401);
    }

    const user = users.find(u => u.email === credentials.email);
    if (!user) {
      throw createError('User not found', 404);
    }

    currentUser = user;
    const token = `fake-token-${Date.now()}`;
    
    return createSuccessResponse({ user, token });
  },

  async register(data: RegisterData): Promise<ApiResponse<{ user: User; token: string }>> {
    await delay(latency);
    
    if (shouldFail()) {
      throw createError('Registration failed. Please try again.', 400);
    }

    if (users.find(u => u.email === data.email)) {
      throw createError('User already exists', 409);
    }

    const newUser: User = {
      id: (users.length + 1).toString(),
      email: data.email,
      name: data.name,
      role: 'student',
      preferences: {
        language: 'en',
        theme: 'system'
      },
      enrolledCourses: [],
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    currentUser = newUser;
    const token = `fake-token-${Date.now()}`;
    
    return createSuccessResponse({ user: newUser, token });
  },

  async logout(): Promise<ApiResponse<null>> {
    await delay(latency);
    currentUser = null;
    return createSuccessResponse(null);
  },

  async getCurrentUser(): Promise<ApiResponse<User | null>> {
    await delay(latency);
    
    if (shouldFail()) {
      throw createError('Failed to get user data', 500);
    }

    return createSuccessResponse(currentUser);
  },

  // Courses
  async getCourses(query: CourseQuery = {}): Promise<ApiResponse<Course[]>> {
    await delay(latency);
    
    if (shouldFail()) {
      throw createError('Failed to fetch courses', 500);
    }

    let filteredCourses = [...courses];

    // Apply filters
    if (query.search) {
      const searchLower = query.search.toLowerCase();
      filteredCourses = filteredCourses.filter(course => 
        course.title.toLowerCase().includes(searchLower) ||
        course.titleAr.includes(query.search) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.descriptionAr.includes(query.search)
      );
    }

    if (query.level) {
      filteredCourses = filteredCourses.filter(course => course.level === query.level);
    }

    if (query.instructor) {
      filteredCourses = filteredCourses.filter(course => course.instructor.id === query.instructor);
    }

    if (query.tags && query.tags.length > 0) {
      filteredCourses = filteredCourses.filter(course => 
        query.tags!.some(tag => course.tags.includes(tag))
      );
    }

    // Apply sorting
    if (query.sortBy) {
      filteredCourses.sort((a, b) => {
        let aValue: any, bValue: any;
        
        switch (query.sortBy) {
          case 'newest':
            aValue = new Date(a.createdAt).getTime();
            bValue = new Date(b.createdAt).getTime();
            break;
          case 'oldest':
            aValue = new Date(a.createdAt).getTime();
            bValue = new Date(b.createdAt).getTime();
            break;
          case 'rating':
            aValue = a.rating;
            bValue = b.rating;
            break;
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'duration':
            aValue = a.duration;
            bValue = b.duration;
            break;
          default:
            return 0;
        }

        if (query.sortOrder === 'desc') {
          return bValue > aValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
    }

    // Apply pagination
    const page = query.page || 1;
    const limit = query.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

    const pagination: PaginationInfo = {
      page,
      limit,
      total: filteredCourses.length,
      totalPages: Math.ceil(filteredCourses.length / limit),
      hasNext: endIndex < filteredCourses.length,
      hasPrev: page > 1
    };

    return createSuccessResponse(paginatedCourses, pagination);
  },

  async getCourse(id: string): Promise<ApiResponse<Course>> {
    await delay(latency);
    
    if (shouldFail()) {
      throw createError('Failed to fetch course', 500);
    }

    const course = courses.find(c => c.id === id);
    if (!course) {
      throw createError('Course not found', 404);
    }

    return createSuccessResponse(course);
  },

  // Instructors
  async getInstructors(query: InstructorQuery = {}): Promise<ApiResponse<Instructor[]>> {
    await delay(latency);
    
    if (shouldFail()) {
      throw createError('Failed to fetch instructors', 500);
    }

    let filteredInstructors = [...instructors];

    if (query.search) {
      const searchLower = query.search.toLowerCase();
      filteredInstructors = filteredInstructors.filter(instructor => 
        instructor.name.toLowerCase().includes(searchLower) ||
        instructor.nameAr.includes(query.search) ||
        instructor.bio.toLowerCase().includes(searchLower) ||
        instructor.bioAr.includes(query.search)
      );
    }

    if (query.specialties && query.specialties.length > 0) {
      filteredInstructors = filteredInstructors.filter(instructor => 
        query.specialties!.some(specialty => instructor.specialties.includes(specialty))
      );
    }

    const page = query.page || 1;
    const limit = query.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedInstructors = filteredInstructors.slice(startIndex, endIndex);

    const pagination: PaginationInfo = {
      page,
      limit,
      total: filteredInstructors.length,
      totalPages: Math.ceil(filteredInstructors.length / limit),
      hasNext: endIndex < filteredInstructors.length,
      hasPrev: page > 1
    };

    return createSuccessResponse(paginatedInstructors, pagination);
  },

  async getInstructor(id: string): Promise<ApiResponse<Instructor>> {
    await delay(latency);
    
    if (shouldFail()) {
      throw createError('Failed to fetch instructor', 500);
    }

    const instructor = instructors.find(i => i.id === id);
    if (!instructor) {
      throw createError('Instructor not found', 404);
    }

    return createSuccessResponse(instructor);
  },

  // Testimonials
  async getTestimonials(): Promise<ApiResponse<Testimonial[]>> {
    await delay(latency);
    
    if (shouldFail()) {
      throw createError('Failed to fetch testimonials', 500);
    }

    return createSuccessResponse(testimonials);
  },

  // Utility functions for testing
  reset: () => {
    users = [
      {
        id: '1',
        email: 'demo@example.com',
        name: 'Demo User',
        avatar: '/avatars/demo.jpg',
        role: 'student',
        preferences: {
          language: 'en',
          theme: 'system'
        },
        enrolledCourses: ['1', '2'],
        createdAt: '2024-01-01T00:00:00Z'
      }
    ];
    currentUser = null;
    latency = 800;
    failureRate = 0.05;
  }
};

export default fakeApi;
