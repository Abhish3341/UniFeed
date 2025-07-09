import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from './store';
import { setDemoUser, fetchUserProfile } from './store/slices/userSlice';
import { wsService } from './services/websocket';
import { updateRealTimeContent, updateTrendingContent } from './store/slices/contentSlice';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import ContentFeed from './components/content/ContentFeed';
import TrendingSection from './components/content/TrendingSection';
import FavoritesSection from './components/content/FavoritesSection';
import SettingsPanel from './components/settings/SettingsPanel';
import LoginForm from './components/auth/LoginForm';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, preferences, user } = useSelector((state: RootState) => state.user);
  const { activeSection } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    // Check for existing auth token
    const token = localStorage.getItem('authToken');
    if (token && !isAuthenticated) {
      dispatch(fetchUserProfile());
    } else if (!token && !isAuthenticated) {
      // Auto-login for demo purposes
      dispatch(setDemoUser());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    // Apply dark mode
    if (preferences.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [preferences.darkMode]);

  useEffect(() => {
    // Setup WebSocket connection when authenticated
    if (isAuthenticated && user) {
      const socket = wsService.connect();
      
      if (socket) {
        wsService.joinUserRoom(user.id);
        
        // Subscribe to real-time content updates
        wsService.subscribeToUpdates(preferences, (updates) => {
          dispatch(updateRealTimeContent(updates));
        });
        
        // Subscribe to trending updates
        wsService.subscribeToTrending((trending) => {
          dispatch(updateTrendingContent(trending.trending));
        });
      }

      return () => {
        wsService.disconnect();
      };
    }
  }, [isAuthenticated, user, preferences, dispatch]);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'trending':
        return <TrendingSection />;
      case 'favorites':
        return <FavoritesSection />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <ContentFeed />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors" data-testid="dashboard">
      <Header />
      <div className="flex">
        <Sidebar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 lg:ml-64"
        >
          {renderActiveSection()}
        </motion.main>
      </div>
    </div>
  );
};

export default App;