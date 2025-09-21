import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CourseCard from '../Courses/CourseCard';
import { Course } from '@/types';

// Mock course data
const mockCourse: Course = {
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
    }
  ],
  createdAt: '2024-01-15T00:00:00Z',
  updatedAt: '2024-01-15T00:00:00Z',
  isPublished: true,
  isFeatured: true
};

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('CourseCard', () => {
  it('renders course information correctly', () => {
    render(
      <TestWrapper>
        <CourseCard course={mockCourse} />
      </TestWrapper>
    );

    expect(screen.getByText('Complete React Development Course')).toBeInTheDocument();
    expect(screen.getByText('Learn React from scratch with modern hooks, context, and best practices')).toBeInTheDocument();
    expect(screen.getByText('Ahmed Hassan')).toBeInTheDocument();
    expect(screen.getByText('40h')).toBeInTheDocument();
    expect(screen.getByText('4.8')).toBeInTheDocument();
    expect(screen.getByText('$99')).toBeInTheDocument();
  });

  it('displays discount badge when original price is higher', () => {
    render(
      <TestWrapper>
        <CourseCard course={mockCourse} />
      </TestWrapper>
    );

    expect(screen.getByText('-$33%')).toBeInTheDocument();
    expect(screen.getByText('$149')).toBeInTheDocument();
  });

  it('shows featured badge for featured courses', () => {
    render(
      <TestWrapper>
        <CourseCard course={mockCourse} />
      </TestWrapper>
    );

    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('displays level badge with correct styling', () => {
    render(
      <TestWrapper>
        <CourseCard course={mockCourse} />
      </TestWrapper>
    );

    expect(screen.getByText('Beginner')).toBeInTheDocument();
  });

  it('shows course tags', () => {
    render(
      <TestWrapper>
        <CourseCard course={mockCourse} />
      </TestWrapper>
    );

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
  });

  it('renders preview button with correct link', () => {
    render(
      <TestWrapper>
        <CourseCard course={mockCourse} />
      </TestWrapper>
    );

    const previewButton = screen.getByText('Preview Course');
    expect(previewButton).toBeInTheDocument();
    expect(previewButton.closest('a')).toHaveAttribute('href', '/courses/1');
  });

  it('hides instructor when showInstructor is false', () => {
    render(
      <TestWrapper>
        <CourseCard course={mockCourse} showInstructor={false} />
      </TestWrapper>
    );

    expect(screen.queryByText('Ahmed Hassan')).not.toBeInTheDocument();
  });

  it('displays free course correctly', () => {
    const freeCourse = { ...mockCourse, price: 0, originalPrice: undefined };
    
    render(
      <TestWrapper>
        <CourseCard course={freeCourse} />
      </TestWrapper>
    );

    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.queryByText('$99')).not.toBeInTheDocument();
  });
});
