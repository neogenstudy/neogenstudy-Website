# NeoGenStudy - Complete Educational Platform

A comprehensive React-based educational platform designed for competitive exam preparation (NEET, JEE, CUET, GATE) with modern UI/UX and gamification features.

## 🚀 Features

### 📚 Core Educational Features
- **Smart Study Plans**: Personalized 100-day roadmaps for different competitive exams
- **Topics & Resources**: Comprehensive subject-wise content with videos, PDFs, and practice materials
- **Mock Tests**: Full-featured testing system with timer, navigation, and detailed analytics
- **Doubt Solver**: AI-powered chat interface for instant question resolution
- **Study Groups**: Peer collaboration with real-time messaging
- **Progress Analytics**: Detailed performance tracking with charts and insights

### 🎮 Gamification
- **Points System**: Earn points for completing topics, tests, and activities
- **Streak Tracking**: Daily study streak monitoring with rewards
- **Leaderboards**: Competitive rankings among peers
- **Achievements**: Badges and milestones for motivation
- **Referral System**: Invite friends and earn rewards

### 👨‍💼 Admin Features
- **User Management**: Complete CRUD operations for users
- **Course Management**: Create and manage educational content
- **Analytics Dashboard**: Platform-wide statistics and insights
- **Content Moderation**: Manage questions, resources, and discussions

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Context + Hooks

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── Layout.tsx
│   ├── ProtectedRoute.tsx
│   ├── NotificationBell.tsx
│   ├── LoadingSpinner.tsx
│   └── ProgressRing.tsx
├── pages/              # Page components
│   ├── Homepage.tsx
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── Dashboard.tsx
│   ├── StudyPlan.tsx
│   ├── Topics.tsx
│   ├── DoubtChat.tsx
│   ├── StudyGroups.tsx
│   ├── Analytics.tsx
│   ├── MockTest.tsx
│   ├── Referral.tsx
│   └── admin/
│       └── AdminDashboard.tsx
├── context/            # React Context providers
│   ├── AuthContext.tsx
│   └── UserContext.tsx
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.ts
│   └── useDebounce.ts
├── utils/              # Utility functions
│   ├── constants.ts
│   └── helpers.ts
└── App.tsx            # Main app component
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Secondary**: Purple (#8B5CF6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Neutral**: Gray shades

### Typography
- **Headings**: Font weights 600-800
- **Body**: Font weight 400-500
- **Line Heights**: 120% for headings, 150% for body text

### Components
- **Rounded Corners**: Consistent use of `rounded-xl` (12px)
- **Shadows**: Subtle `shadow-md` for cards
- **Spacing**: 8px grid system
- **Responsive**: Mobile-first approach with Tailwind breakpoints

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/neogenstudy.git
cd neogenstudy
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

## 🔐 Authentication

Currently uses mock authentication for development. Features include:
- Email-based passwordless login simulation
- Protected routes with role-based access
- Admin panel access control
- Persistent login state

## 📊 Analytics & Tracking

- **Progress Tracking**: Topic completion, study hours, test scores
- **Performance Charts**: Line charts, bar charts, pie charts using Recharts
- **Gamification Metrics**: Points, streaks, rankings
- **Subject-wise Analysis**: Detailed breakdown by subjects

## 🎯 Key Features Implemented

### ✅ Authentication System
- Login/Signup with email verification simulation
- Protected routes and role-based access
- Persistent user sessions

### ✅ Dashboard
- Comprehensive overview with stats and quick actions
- Recent activity feed
- Progress visualization
- Motivational elements

### ✅ Study Management
- 100-day study plan with progress tracking
- Subject-wise topic organization
- Resource management (videos, PDFs, links)
- Completion tracking with gamification

### ✅ Testing System
- Full-featured mock test interface
- Question navigation panel
- Timer functionality
- Detailed results with explanations
- Subject-wise performance analysis

### ✅ Social Features
- Study groups with chat functionality
- Doubt-solving community
- Referral system with rewards
- Leaderboards and competitions

### ✅ Analytics
- Performance tracking with multiple chart types
- Progress visualization
- Goal setting and tracking
- Comparative analysis

### ✅ Admin Panel
- User management interface
- Course and content management
- Platform analytics
- Administrative controls

## 🔧 Customization

### Adding New Exams
1. Update `EXAM_TYPES` in `src/utils/constants.ts`
2. Add subjects mapping in `SUBJECTS` constant
3. Update study plan generation logic
4. Add exam-specific content

### Theming
The application uses Tailwind CSS for styling. To customize:
1. Modify `tailwind.config.js` for theme changes
2. Update color constants in components
3. Adjust spacing and typography scales

### Adding Features
1. Create new components in `src/components/`
2. Add pages in `src/pages/`
3. Update routing in `App.tsx`
4. Add navigation items in `Sidebar.tsx`

## 🚀 Deployment

The application is ready for deployment on platforms like:
- **Vercel** (Recommended)
- **Netlify**
- **AWS Amplify**
- **GitHub Pages**

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure build settings (auto-detected for Vite)
3. Set environment variables if needed
4. Deploy!

## 📈 Performance Optimizations

- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: Responsive images with proper sizing
- **Bundle Optimization**: Vite's built-in optimizations
- **CSS Purging**: Tailwind's JIT mode removes unused styles
- **Caching**: Browser caching for static assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icons
- **Recharts** for the charting library
- **Vite** for the fast build tool

## 📞 Support

For support, email support@neogenstudy.com or join our Discord community.

---

**NeoGenStudy** - Empowering students to excel in competitive exams! 🎓