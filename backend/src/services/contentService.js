import axios from 'axios';

// Mock data generators for when APIs are not available
const generateMockNews = (categories, search, page = 1, limit = 20) => {
  const mockNews = [
    {
      id: `news-${Date.now()}-1`,
      title: 'Breaking: Revolutionary AI Technology Unveiled',
      description: 'Scientists have developed a groundbreaking artificial intelligence system that could transform how we interact with technology.',
      image: 'https://images.pexels.com/photos/355935/pexels-photo-355935.jpeg?auto=compress&cs=tinysrgb&w=800',
      url: 'https://example.com/news/ai-breakthrough',
      category: 'technology',
      type: 'news',
      publishedAt: new Date().toISOString(),
      source: 'Tech Today',
      author: 'Dr. Sarah Johnson',
    },
    {
      id: `news-${Date.now()}-2`,
      title: 'Championship Finals Set Record Attendance',
      description: 'The upcoming championship finals have broken all previous attendance records with over 100,000 tickets sold.',
      image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=800',
      url: 'https://example.com/sports/championship-finals',
      category: 'sports',
      type: 'news',
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      source: 'Sports Central',
      author: 'Mike Rodriguez',
    },
    {
      id: `news-${Date.now()}-3`,
      title: 'New Blockbuster Movie Breaks Box Office Records',
      description: 'The latest superhero movie has shattered opening weekend records, earning over $200 million globally.',
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
      url: 'https://example.com/entertainment/blockbuster-success',
      category: 'entertainment',
      type: 'news',
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      source: 'Entertainment Weekly',
      author: 'Lisa Chen',
    },
    {
      id: `news-${Date.now()}-4`,
      title: 'Health Study Reveals Surprising Benefits of Exercise',
      description: 'A comprehensive 10-year study shows that regular exercise has more health benefits than previously thought.',
      image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800',
      url: 'https://example.com/health/exercise-benefits',
      category: 'health',
      type: 'news',
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      source: 'Health Journal',
      author: 'Dr. Michael Brown',
    },
  ];

  return mockNews
    .filter(item => categories.includes(item.category))
    .filter(item => !search || item.title.toLowerCase().includes(search.toLowerCase()))
    .slice((page - 1) * limit, page * limit);
};

const generateMockMovies = (search, page = 1, limit = 20) => {
  const mockMovies = [
    {
      id: `movie-${Date.now()}-1`,
      title: 'The Future Chronicles',
      description: 'A thrilling sci-fi adventure that explores humanity\'s journey into the unknown depths of space and time.',
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
      url: 'https://example.com/movies/future-chronicles',
      category: 'sci-fi',
      type: 'movie',
      publishedAt: new Date().toISOString(),
      source: 'MovieDB',
      rating: 8.5,
    },
    {
      id: `movie-${Date.now()}-2`,
      title: 'Romance in Paris',
      description: 'A heartwarming love story set against the beautiful backdrop of Paris, following two souls finding each other.',
      image: 'https://images.pexels.com/photos/1200450/pexels-photo-1200450.jpeg?auto=compress&cs=tinysrgb&w=800',
      url: 'https://example.com/movies/romance-paris',
      category: 'romance',
      type: 'movie',
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      source: 'MovieDB',
      rating: 7.8,
    },
    {
      id: `movie-${Date.now()}-3`,
      title: 'Action Hero Returns',
      description: 'The legendary action hero is back with more explosive adventures and death-defying stunts.',
      image: 'https://images.pexels.com/photos/1200450/pexels-photo-1200450.jpeg?auto=compress&cs=tinysrgb&w=800',
      url: 'https://example.com/movies/action-hero-returns',
      category: 'action',
      type: 'movie',
      publishedAt: new Date(Date.now() - 172800000).toISOString(),
      source: 'MovieDB',
      rating: 9.1,
    },
  ];

  return mockMovies
    .filter(item => !search || item.title.toLowerCase().includes(search.toLowerCase()))
    .slice((page - 1) * limit, page * limit);
};

const generateMockSocial = (hashtags, search, page = 1, limit = 20) => {
  const mockSocial = [
    {
      id: `social-${Date.now()}-1`,
      title: 'Trending: #TechInnovation',
      description: 'Amazing new developments in artificial intelligence are changing the world! The future is here. 🚀 #AI #Technology',
      image: 'https://images.pexels.com/photos/355935/pexels-photo-355935.jpeg?auto=compress&cs=tinysrgb&w=800',
      url: 'https://twitter.com/techguru/status/123456789',
      category: 'technology',
      type: 'social',
      publishedAt: new Date().toISOString(),
      source: 'Twitter',
      author: '@techguru',
    },
    {
      id: `social-${Date.now()}-2`,
      title: 'Sports Update: #ChampionshipFinals',
      description: 'The excitement is building up for the championship finals next week! Who do you think will win? 🏆 #Sports #Championship',
      image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=800',
      url: 'https://instagram.com/p/sportsfan123',
      category: 'sports',
      type: 'social',
      publishedAt: new Date(Date.now() - 1800000).toISOString(),
      source: 'Instagram',
      author: '@sportsfan',
    },
    {
      id: `social-${Date.now()}-3`,
      title: 'Entertainment: #NewMovieRelease',
      description: 'Just watched the new blockbuster movie - absolutely mind-blowing! The special effects were incredible 🎬 #Movies #Entertainment',
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
      url: 'https://facebook.com/moviebuff/posts/123456',
      category: 'entertainment',
      type: 'social',
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      source: 'Facebook',
      author: '@moviebuff',
    },
  ];

  return mockSocial
    .filter(item => !search || item.title.toLowerCase().includes(search.toLowerCase()))
    .slice((page - 1) * limit, page * limit);
};

export const fetchNewsAPI = async (categories, search, page = 1, limit = 20) => {
  try {
    // If NEWS_API_KEY is available, use real API
    if (process.env.NEWS_API_KEY) {
      const category = categories[0] || 'general';
      const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${process.env.NEWS_API_KEY}&page=${page}&pageSize=${limit}`;
      
      if (search) {
        const searchUrl = `https://newsapi.org/v2/everything?q=${search}&apiKey=${process.env.NEWS_API_KEY}&page=${page}&pageSize=${limit}`;
        const response = await axios.get(searchUrl);
        
        return response.data.articles.map((article) => ({
          id: `news-${Date.now()}-${Math.random()}`,
          title: article.title,
          description: article.description || '',
          image: article.urlToImage,
          url: article.url,
          category: category,
          type: 'news',
          publishedAt: article.publishedAt,
          source: article.source.name,
          author: article.author,
        }));
      }
      
      const response = await axios.get(url);
      return response.data.articles.map((article) => ({
        id: `news-${Date.now()}-${Math.random()}`,
        title: article.title,
        description: article.description || '',
        image: article.urlToImage,
        url: article.url,
        category: category,
        type: 'news',
        publishedAt: article.publishedAt,
        source: article.source.name,
        author: article.author,
      }));
    }
  } catch (error) {
    console.error('News API error:', error);
  }

  // Fallback to mock data
  return generateMockNews(categories, search, page, limit);
};

export const fetchMoviesAPI = async (search, page = 1, limit = 20) => {
  try {
    // If TMDB_API_KEY is available, use real API
    if (process.env.TMDB_API_KEY) {
      const url = search 
        ? `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${search}&page=${page}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&page=${page}`;
      
      const response = await axios.get(url);
      
      return response.data.results.slice(0, limit).map((movie) => ({
        id: `movie-${movie.id}`,
        title: movie.title,
        description: movie.overview,
        image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : undefined,
        url: `https://www.themoviedb.org/movie/${movie.id}`,
        category: 'movie',
        type: 'movie',
        publishedAt: movie.release_date || new Date().toISOString(),
        source: 'TMDB',
        rating: movie.vote_average,
      }));
    }
  } catch (error) {
    console.error('Movies API error:', error);
  }

  // Fallback to mock data
  return generateMockMovies(search, page, limit);
};

export const fetchSocialAPI = async (hashtags, search, page = 1, limit = 20) => {
  try {
    // If TWITTER_BEARER_TOKEN is available, use real API
    if (process.env.TWITTER_BEARER_TOKEN) {
      // Twitter API v2 implementation would go here
      // For now, using mock data due to API complexity
    }
  } catch (error) {
    console.error('Social API error:', error);
  }

  // Fallback to mock data
  return generateMockSocial(hashtags, search, page, limit);
};