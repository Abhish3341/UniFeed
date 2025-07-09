import { fetchNewsAPI, fetchMoviesAPI, fetchSocialAPI } from './contentService.js';

export const setupWebSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Join user to their personal room
    socket.on('join-user-room', (userId) => {
      socket.join(`user-${userId}`);
      console.log(`User ${userId} joined their room`);
    });

    // Handle real-time content updates
    socket.on('subscribe-to-updates', async (preferences) => {
      try {
        // Fetch fresh content based on user preferences
        const [news, movies, social] = await Promise.all([
          fetchNewsAPI(preferences.categories || ['general'], undefined, 1, 5),
          fetchMoviesAPI(undefined, 1, 5),
          fetchSocialAPI(['trending'], undefined, 1, 5)
        ]);

        const updates = {
          news,
          movies,
          social,
          timestamp: new Date().toISOString()
        };

        socket.emit('content-updates', updates);
      } catch (error) {
        console.error('WebSocket content update error:', error);
        socket.emit('update-error', { message: 'Failed to fetch updates' });
      }
    });

    // Handle search requests
    socket.on('real-time-search', async (query) => {
      try {
        const [news, movies, social] = await Promise.all([
          fetchNewsAPI(['general'], query, 1, 10),
          fetchMoviesAPI(query, 1, 10),
          fetchSocialAPI(['trending'], query, 1, 10)
        ]);

        const searchResults = [...news, ...movies, ...social]
          .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

        socket.emit('search-results', {
          query,
          results: searchResults,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error('WebSocket search error:', error);
        socket.emit('search-error', { message: 'Search failed' });
      }
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  // Broadcast trending updates every 5 minutes
  setInterval(async () => {
    try {
      const [news, movies, social] = await Promise.all([
        fetchNewsAPI(['technology', 'entertainment', 'sports'], undefined, 1, 5),
        fetchMoviesAPI(undefined, 1, 5),
        fetchSocialAPI(['trending', 'viral'], undefined, 1, 5)
      ]);

      const trendingUpdate = {
        trending: [...news, ...movies, ...social]
          .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
        timestamp: new Date().toISOString()
      };

      io.emit('trending-update', trendingUpdate);
    } catch (error) {
      console.error('Trending update error:', error);
    }
  }, 5 * 60 * 1000); // 5 minutes
};