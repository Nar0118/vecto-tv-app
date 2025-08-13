# Vecto TV App

A modern, responsive React-based TV streaming application with a beautiful UI and smooth animations. Built with TypeScript, Redux Toolkit, and Framer Motion for an exceptional user experience.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-green?style=for-the-badge&logo=vercel)](https://vecto-tv-app.vercel.app/)
![Vecto TV App](https://img.shields.io/badge/React-19.1.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.2-purple?style=for-the-badge&logo=vite)

## 🎬 Features

- **Featured Video Section**: Prominently displays the main featured content with detailed information
- **Trending Now**: Horizontal scrollable list of trending videos with smart sorting
- **Interactive Sidebar**: Collapsible navigation menu with smooth animations
- **Video Player**: Integrated video playback functionality
- **Responsive Design**: Optimized for various screen sizes and devices
- **State Management**: Redux Toolkit for efficient state management
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Session Persistence**: Remembers user interactions and video preferences
- **Modern UI/UX**: Clean, intuitive interface with hover effects and visual feedback

## 🚀 Quick Start

### 🌐 Live Demo

**Try the application live:** [https://vecto-tv-app.vercel.app/](https://vecto-tv-app.vercel.app/)

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nar0118/vecto-tv-app.git
   cd vecto-tv-app
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
   Navigate to `http://localhost:5173` to view the application

## 📁 Project Structure

```
vecto-tv-app/
├── src/
│   ├── components/
│   │   ├── FeaturedVideo/     # Featured video component
│   │   ├── HomePage/          # Main homepage component
│   │   ├── Sidebar/           # Navigation sidebar
│   │   └── TrendingNow/       # Trending videos list
│   ├── store/
│   │   ├── appSlice.ts        # Redux slice for app state
│   │   └── index.ts           # Redux store configuration
│   ├── types/
│   │   └── index.ts           # TypeScript type definitions
│   ├── utils/
│   │   └── index.ts           # Utility functions
│   ├── App.tsx                # Main app component
│   └── main.tsx               # Application entry point
├── assets/                    # Static assets and images
├── data.json                  # Sample video data
└── package.json               # Project dependencies and scripts
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🎯 Key Components

### HomePage
The main application component that orchestrates the layout and data flow. It loads video data, manages state, and renders the sidebar, featured video, and trending sections.

### Sidebar
A collapsible navigation menu that expands on hover, featuring:
- User profile section
- Navigation menu items (Search, Home, TV Shows, Movies, Genres, Watch Later)
- Smooth animations and transitions

### FeaturedVideo
Displays the main featured content with:
- Video cover image and title
- Metadata (release year, rating, duration, category)
- Description
- Play functionality

### TrendingNow
Horizontal scrollable list of trending videos with:
- Smart sorting based on user interaction history
- Video thumbnails and metadata
- Click tracking for personalized experience

## 🔧 Technology Stack

- **Frontend Framework**: React 19.1.1
- **Language**: TypeScript 5.8.3
- **Build Tool**: Vite 7.1.2
- **State Management**: Redux Toolkit 2.8.2
- **Routing**: React Router DOM 7.8.0
- **Animations**: Framer Motion 12.23.12
- **Styling**: CSS with custom animations
- **Code Quality**: ESLint, Prettier, Husky

## 📊 Data Structure

The application uses a JSON-based data structure for video content:

```typescript
interface Video {
  Id: string;
  Title: string;
  CoverImage: string;
  TitleImage: string;
  Date: string;
  ReleaseYear: string;
  MpaRating: string;
  Category: string;
  Duration: string;
  VideoUrl?: string;
  Description: string;
}
```

## 🎨 UI/UX Features

- **Smooth Animations**: All interactions feature smooth transitions
- **Hover Effects**: Interactive elements respond to user hover
- **Responsive Layout**: Adapts to different screen sizes
- **Visual Feedback**: Clear indication of user interactions
- **Accessibility**: Keyboard navigation and screen reader support

## 🔄 State Management

The application uses Redux Toolkit for state management with the following state structure:

```typescript
interface AppState {
  featuredVideo: Video | null;
  trendingVideos: Video[];
  isMenuOpen: boolean;
  lastClickedVideoId: string | null;
  isVideoPlaying: boolean;
}
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern streaming platforms
- Icons and assets provided in the project
- Sample video data for demonstration purposes

---

**Built with ❤️ using React and TypeScript**
