// Mock weather data - replace with actual API integration
const mockWeatherData = [
  {
    id: '1',
    location: 'London',
    temperature: 22,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    icon: 'partly-cloudy',
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    location: 'New York',
    temperature: 18,
    condition: 'Sunny',
    humidity: 45,
    windSpeed: 8,
    icon: 'sunny',
    timestamp: new Date().toISOString(),
  },
];

const getWeatherData = async (req, res) => {
  try {
    const { location } = req.query;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredData = mockWeatherData;
    if (location && typeof location === 'string') {
      filteredData = mockWeatherData.filter(
        item => item.location.toLowerCase().includes(location.toLowerCase())
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
      message: 'Failed to fetch weather data',
      timestamp: new Date().toISOString(),
    };
    
    res.status(500).json(errorResponse);
  }
};

const getCurrentWeather = async (req, res) => {
  try {
    const { location } = req.query;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const weatherData = mockWeatherData.find(
      item => item.location.toLowerCase() === (location || '').toLowerCase()
    ) || mockWeatherData[0];
    
    const response = {
      data: weatherData,
      success: true,
      timestamp: new Date().toISOString(),
    };
    
    res.status(200).json(response);
  } catch (error) {
    const errorResponse = {
      data: mockWeatherData[0],
      success: false,
      message: 'Failed to fetch current weather',
      timestamp: new Date().toISOString(),
    };
    
    res.status(500).json(errorResponse);
  }
};

module.exports = {
  getWeatherData,
  getCurrentWeather
};