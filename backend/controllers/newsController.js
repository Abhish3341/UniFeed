// Mock news data - replace with actual API integration
const mockNewsData = [
  {
    id: '1',
    title: 'Global Market Trends Show Positive Growth',
    description: 'Financial markets continue to show resilience amid global economic changes. Analysts predict continued growth in the technology sector.',
    source: 'Financial Times',
    url: 'https://example.com/news/1',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    category: 'finance',
    sentiment: 'positive',
  },
  {
    id: '2',
    title: 'Weather Patterns Shift Across Europe',
    description: 'Meteorologists report significant weather changes affecting multiple regions. Climate scientists are monitoring the situation closely.',
    source: 'Weather Channel',
    url: 'https://example.com/news/2',
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    category: 'weather',
    sentiment: 'neutral',
  },
  {
    id: '3',
    title: 'Technology Sector Sees Innovation Surge',
    description: 'Major tech companies announce breakthrough developments in AI and computing. Industry experts are optimistic about future prospects.',
    source: 'Tech Today',
    url: 'https://example.com/news/3',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    category: 'technology',
    sentiment: 'positive',
  },
];

const getLatestNews = async (req, res) => {
  try {
    const { category } = req.query;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    let filteredData = mockNewsData;
    if (category && typeof category === 'string' && category !== 'general') {
      filteredData = mockNewsData.filter(
        item => item.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    const response = {
      data: filteredData,
      success: true,
      timestamp: new Date().toISOString(),
    };
    
    res.status(200).json(response);
  } catch (error) {
    const errorResponse = {
      data: [],
      success: false,
      message: 'Failed to fetch news data',
      timestamp: new Date().toISOString(),
    };
    
    res.status(500).json(errorResponse);
  }
};

const getNewsByKeyword = async (req, res) => {
  try {
    const { q } = req.query;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let filteredData = mockNewsData;
    if (q && typeof q === 'string') {
      filteredData = mockNewsData.filter(
        item => 
          item.title.toLowerCase().includes(q.toLowerCase()) ||
          item.description.toLowerCase().includes(q.toLowerCase())
      );
    }
    
    const response = {
      data: filteredData,
      success: true,
      timestamp: new Date().toISOString(),
    };
    
    res.status(200).json(response);
  } catch (error) {
    const errorResponse = {
      data: [],
      success: false,
      message: 'Failed to search news',
      timestamp: new Date().toISOString(),
    };
    
    res.status(500).json(errorResponse);
  }
};

module.exports = {
  getLatestNews,
  getNewsByKeyword
};