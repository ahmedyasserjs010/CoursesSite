import { describe, it, expect, beforeEach, vi } from 'vitest';
import fakeApi from '../fakeApi';
import { LoginCredentials, RegisterData } from '@/types';

describe('fakeApi', () => {
  beforeEach(() => {
    fakeApi.reset();
  });

  describe('configuration', () => {
    it('should set and get latency', () => {
      fakeApi.setLatency(1000);
      expect(fakeApi.getLatency()).toBe(1000);
    });

    it('should set and get failure rate', () => {
      fakeApi.setFailureRate(0.1);
      expect(fakeApi.getFailureRate()).toBe(0.1);
    });

    it('should clamp failure rate between 0 and 1', () => {
      fakeApi.setFailureRate(1.5);
      expect(fakeApi.getFailureRate()).toBe(1);
      
      fakeApi.setFailureRate(-0.5);
      expect(fakeApi.getFailureRate()).toBe(0);
    });
  });

  describe('authentication', () => {
    it('should login with valid credentials', async () => {
      const credentials: LoginCredentials = {
        email: 'demo@example.com',
        password: 'password123'
      };

      const result = await fakeApi.login(credentials);
      
      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('user');
      expect(result.data).toHaveProperty('token');
      expect(result.data?.user.email).toBe('demo@example.com');
    });

    it('should fail login with invalid credentials', async () => {
      const credentials: LoginCredentials = {
        email: 'invalid@example.com',
        password: 'wrongpassword'
      };

      await expect(fakeApi.login(credentials)).rejects.toThrow('User not found');
    });

    it('should register new user', async () => {
      const userData: RegisterData = {
        name: 'New User',
        email: 'newuser@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      };

      const result = await fakeApi.register(userData);
      
      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('user');
      expect(result.data).toHaveProperty('token');
      expect(result.data?.user.email).toBe('newuser@example.com');
    });

    it('should fail registration with existing email', async () => {
      const userData: RegisterData = {
        name: 'Existing User',
        email: 'demo@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      };

      await expect(fakeApi.register(userData)).rejects.toThrow('User already exists');
    });

    it('should logout successfully', async () => {
      // First login
      const credentials: LoginCredentials = {
        email: 'demo@example.com',
        password: 'password123'
      };
      await fakeApi.login(credentials);

      // Then logout
      const result = await fakeApi.logout();
      expect(result.success).toBe(true);
    });
  });

  describe('courses', () => {
    it('should get courses with default parameters', async () => {
      const result = await fakeApi.getCourses();
      
      expect(result.success).toBe(true);
      expect(result.data).toBeInstanceOf(Array);
      expect(result.pagination).toBeDefined();
      expect(result.pagination?.page).toBe(1);
      expect(result.pagination?.limit).toBe(10);
    });

    it('should get courses with custom parameters', async () => {
      const result = await fakeApi.getCourses({
        page: 2,
        limit: 5,
        level: 'beginner',
        sortBy: 'rating',
        sortOrder: 'desc'
      });
      
      expect(result.success).toBe(true);
      expect(result.data).toBeInstanceOf(Array);
      expect(result.pagination?.page).toBe(2);
      expect(result.pagination?.limit).toBe(5);
    });

    it('should search courses', async () => {
      const result = await fakeApi.getCourses({
        search: 'React'
      });
      
      expect(result.success).toBe(true);
      expect(result.data).toBeInstanceOf(Array);
      // Should find courses with 'React' in title or description
      expect(result.data?.length).toBeGreaterThan(0);
    });

    it('should get course by id', async () => {
      const result = await fakeApi.getCourse('1');
      
      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('id', '1');
      expect(result.data).toHaveProperty('title');
      expect(result.data).toHaveProperty('instructor');
    });

    it('should fail to get non-existent course', async () => {
      await expect(fakeApi.getCourse('999')).rejects.toThrow('Course not found');
    });
  });

  describe('instructors', () => {
    it('should get instructors with default parameters', async () => {
      const result = await fakeApi.getInstructors();
      
      expect(result.success).toBe(true);
      expect(result.data).toBeInstanceOf(Array);
      expect(result.pagination).toBeDefined();
    });

    it('should get instructor by id', async () => {
      const result = await fakeApi.getInstructor('1');
      
      expect(result.success).toBe(true);
      expect(result.data).toHaveProperty('id', '1');
      expect(result.data).toHaveProperty('name');
      expect(result.data).toHaveProperty('specialties');
    });

    it('should fail to get non-existent instructor', async () => {
      await expect(fakeApi.getInstructor('999')).rejects.toThrow('Instructor not found');
    });
  });

  describe('testimonials', () => {
    it('should get testimonials', async () => {
      const result = await fakeApi.getTestimonials();
      
      expect(result.success).toBe(true);
      expect(result.data).toBeInstanceOf(Array);
      expect(result.data?.length).toBeGreaterThan(0);
    });
  });

  describe('error handling', () => {
    it('should handle network errors when failure rate is set', async () => {
      fakeApi.setFailureRate(1); // 100% failure rate
      
      await expect(fakeApi.getCourses()).rejects.toThrow();
    });

    it('should handle timeouts with high latency', async () => {
      fakeApi.setLatency(10000); // 10 seconds
      
      const startTime = Date.now();
      await fakeApi.getCourses();
      const endTime = Date.now();
      
      expect(endTime - startTime).toBeGreaterThanOrEqual(10000);
    });
  });
});
