# تعلم برمجة (Teach Programming)

A modern, production-like educational website built with React, TypeScript, and Tailwind CSS. This project demonstrates advanced frontend development practices including internationalization (i18n), theme management, animations, and comprehensive testing.

## 🌟 Features

### Core Functionality
- **Multi-language Support**: Full Arabic (RTL) and English (LTR) support with react-i18next
- **Theme Management**: Dark/Light mode with system preference detection and smooth transitions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Animations**: Micro-interactions and smooth transitions with Framer Motion
- **Accessibility**: Keyboard navigation, semantic HTML, and proper focus handling

### Educational Features
- **Course Management**: Browse, search, and filter courses
- **Instructor Profiles**: Detailed instructor information and social links
- **User Dashboard**: Progress tracking and course management
- **Authentication**: Login/register system with form validation
- **Course Details**: Comprehensive course information with curriculum and reviews

### Technical Features
- **Fake API**: Realistic API simulation with configurable latency and failure rates
- **State Management**: React Query for server state, Context API for app state
- **TypeScript**: Full type safety throughout the application
- **Testing**: Unit tests for utilities and integration tests for components
- **CI/CD**: GitHub Actions workflow for testing and deployment

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/teach-programming.git
   cd teach-programming
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Auth/            # Authentication components
│   ├── Courses/         # Course-related components
│   ├── Instructors/     # Instructor components
│   ├── Layout/          # Layout components (Navbar, Footer)
│   └── Testimonials/    # Testimonial components
├── contexts/            # React Context providers
│   ├── AuthContext.tsx  # Authentication state
│   ├── ThemeContext.tsx # Theme management
│   └── LanguageContext.tsx # Language management
├── data/               # Static data and mock content
├── hooks/              # Custom React hooks
├── i18n/               # Internationalization setup
│   └── locales/        # Translation files
│       ├── en.json     # English translations
│       └── ar.json     # Arabic translations
├── pages/              # Page components
├── test/               # Test setup and utilities
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
│   └── fakeApi.ts      # Mock API implementation
└── App.tsx             # Main application component
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint

## 🌐 Internationalization

The application supports both Arabic and English with full RTL support.

### Adding New Translations

1. **Add keys to translation files**:
   ```json
   // src/i18n/locales/en.json
   {
     "newSection": {
       "title": "New Section",
       "description": "Description text"
     }
   }
   ```

2. **Use in components**:
   ```tsx
   import { useTranslation } from 'react-i18next';
   
   const { t } = useTranslation();
   return <h1>{t('newSection.title')}</h1>;
   ```

### Language Switching

The language can be switched using the language toggle in the navigation bar. The preference is saved in localStorage.

## 🎨 Theme Management

The application supports three theme modes:
- **Light**: Light color scheme
- **Dark**: Dark color scheme  
- **System**: Follows system preference

### Customizing Themes

Themes are defined in `tailwind.config.js` and can be customized by modifying the color palette:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Primary color variants
      },
      secondary: {
        // Secondary color variants
      }
    }
  }
}
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Test Structure

- **Unit Tests**: Test individual functions and utilities
- **Component Tests**: Test React components in isolation
- **Integration Tests**: Test component interactions

### Adding New Tests

1. **Create test file**: `ComponentName.test.tsx`
2. **Write test cases**:
   ```tsx
   import { describe, it, expect } from 'vitest';
   import { render, screen } from '@testing-library/react';
   
   describe('ComponentName', () => {
     it('renders correctly', () => {
       render(<ComponentName />);
       expect(screen.getByText('Expected Text')).toBeInTheDocument();
     });
   });
   ```

## 🔧 Fake API Configuration

The application uses a fake API for demonstration purposes. You can configure its behavior:

### Setting Latency

```typescript
import fakeApi from '@/utils/fakeApi';

// Set 2 second delay
fakeApi.setLatency(2000);

// Get current latency
console.log(fakeApi.getLatency()); // 2000
```

### Setting Failure Rate

```typescript
// Set 10% failure rate
fakeApi.setFailureRate(0.1);

// Get current failure rate
console.log(fakeApi.getFailureRate()); // 0.1
```

### Available Endpoints

- `fakeApi.getCourses(query)` - Get courses with filtering
- `fakeApi.getCourse(id)` - Get single course
- `fakeApi.getInstructors(query)` - Get instructors
- `fakeApi.getInstructor(id)` - Get single instructor
- `fakeApi.login(credentials)` - User login
- `fakeApi.register(data)` - User registration
- `fakeApi.logout()` - User logout
- `fakeApi.getTestimonials()` - Get testimonials

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables** (if needed)
3. **Deploy automatically** on push to main branch

### Other Platforms

The application can be deployed to any static hosting service:

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 320px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up
- **Large Desktop**: 1280px and up

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant color schemes
- **Focus Management**: Visible focus indicators
- **RTL Support**: Proper right-to-left layout for Arabic

## 🎯 Performance Optimizations

- **Code Splitting**: Lazy loading of routes
- **Image Optimization**: Responsive images with proper sizing
- **Bundle Analysis**: Optimized bundle size
- **Caching**: React Query for efficient data caching
- **Animations**: Hardware-accelerated animations

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/new-feature`
3. **Make your changes**
4. **Add tests** for new functionality
5. **Run tests**: `npm run test`
6. **Commit changes**: `git commit -m 'Add new feature'`
7. **Push to branch**: `git push origin feature/new-feature`
8. **Create Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Query** - Data fetching
- **React Router** - Routing
- **react-i18next** - Internationalization
- **Vitest** - Testing framework
- **Testing Library** - Component testing

---

Made with ❤️ for learners worldwide
