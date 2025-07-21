# UniFeed Dashboard

A comprehensive full-stack analytics dashboard built with Next.js, TypeScript, Redux Toolkit, and RTK Query. This dashboard provides real-time insights from weather, finance, and news APIs with a beautiful, responsive interface.

## 🚀 Features

- **Real-time Data**: Live updates from weather, finance, and news APIs
- **Redux Toolkit**: Efficient state management with RTK Query for API calls
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Mode**: Built-in dark theme support
- **SCSS Support**: Advanced styling capabilities with Sass
- **Modern UI**: Clean, professional interface with smooth animations
- **Modular Architecture**: Clean separation between frontend and backend

## 📁 Project Structure

```
pgagi-unifeed-dashboard/
├── frontend/                    # Next.js Frontend Application
│   ├── app/                    # Next.js 13 App Router
│   │   ├── api/               # API route handlers (proxy to backend)
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── providers.tsx     # Redux provider
│   ├── components/            # React components
│   │   ├── dashboard/        # Dashboard-specific components
│   │   ├── layout/           # Layout components
│   │   └── ui/              # Reusable UI components (shadcn/ui)
│   ├── store/                # Redux store configuration
│   │   ├── api/             # RTK Query API slices
│   │   ├── slices/          # Redux slices
│   │   └── index.ts         # Store configuration
│   ├── types/                # TypeScript type definitions
│   ├── styles/               # SCSS styles
│   ├── lib/                  # Utility functions
│   ├── hooks/                # Custom React hooks
│   └── package.json          # Frontend dependencies
├── backend/                   # Express.js Backend API
│   ├── controllers/          # Route controllers
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── utils/               # Utility functions
│   ├── server.js            # Express server
│   └── package.json         # Backend dependencies
├── package.json              # Root package.json with workspace scripts
└── README.md
```

## 🛠️ Technologies Used

### Frontend
- **Next.js 13**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type safety
- **Redux Toolkit**: State management
- **RTK Query**: Data fetching and caching
- **Tailwind CSS**: Utility-first CSS framework
- **SCSS**: Advanced styling capabilities
- **shadcn/ui**: Modern UI components
- **Recharts**: Data visualization
- **Lucide React**: Icon library

### Backend
- **Express.js**: Web framework
- **Node.js**: Runtime environment
- **CORS**: Cross-origin resource sharing
- **Helmet**: Security middleware
- **Morgan**: HTTP request logger
- **Axios**: HTTP client for external APIs

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pgagi-unifeed-dashboard
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   # Backend
   cd backend
   cp .env.example .env
   # Edit .env with your API keys and configuration
   ```

4. **Start development servers**
   ```bash
   # From root directory - starts both frontend and backend
   npm run dev
   
   # Or start individually
   npm run dev:frontend  # Frontend on http://localhost:3000
   npm run dev:backend   # Backend on http://localhost:8000
   ```

### Production Build

```bash
# Build both frontend and backend
npm run build

# Start production servers
npm run start
```

## 📊 API Endpoints

### Weather API
- `GET /api/weather` - Get weather data by location
- `GET /api/weather/current` - Get current weather

### Finance API
- `GET /api/finance` - Get stock data by symbols
- `GET /api/finance/overview` - Get market overview

### News API
- `GET /api/news` - Get latest news by category
- `GET /api/news/search` - Search news articles

## 🎨 UI Components

- **Weather Widget**: Real-time weather conditions and forecasts
- **Finance Widget**: Stock prices, market trends, and financial indicators
- **News Widget**: Latest news articles with sentiment analysis
- **Analytics Chart**: Interactive data visualizations using Recharts
- **Responsive Layout**: Sidebar navigation with mobile support
- **Dark Mode**: Seamless theme switching

## 🔧 Configuration

### Frontend Configuration
- **Next.js**: Configured for static export
- **Tailwind CSS**: Custom design system with CSS variables
- **TypeScript**: Strict type checking enabled
- **Redux**: Configured with RTK Query for efficient data fetching

### Backend Configuration
- **Express**: RESTful API with proper error handling
- **CORS**: Configured for frontend communication
- **Security**: Helmet middleware for security headers
- **Logging**: Morgan for HTTP request logging

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the 'out' directory
```

### Backend (Railway/Heroku)
```bash
cd backend
npm start
# Configure environment variables in your hosting platform
```

## 📱 Responsive Design

- **Mobile**: Optimized for phones with collapsible sidebar
- **Tablet**: Adjusted layout for medium screens  
- **Desktop**: Full dashboard experience with sidebar navigation

## 🔮 Future Enhancements

1. **Real API Integration**: Replace mock data with actual weather, finance, and news APIs
2. **Authentication**: Add user authentication and authorization
3. **Real-time Updates**: Implement WebSocket connections for live data
4. **Advanced Analytics**: More chart types and data visualizations
5. **Custom Dashboards**: User-customizable dashboard layouts
6. **Data Export**: Export functionality for charts and data
7. **Notifications**: Real-time alerts and notifications
8. **Database Integration**: Persistent data storage
9. **Caching**: Redis integration for improved performance
10. **Testing**: Comprehensive test suites for both frontend and backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Redux Toolkit](https://redux-toolkit.js.org/) for efficient state management
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Recharts](https://recharts.org/) for data visualization components