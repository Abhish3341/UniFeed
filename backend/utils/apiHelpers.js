const axios = require('axios');

// Generic API request helper
const makeApiRequest = async (url, options = {}) => {
  try {
    const response = await axios({
      url,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      params: options.params,
      data: options.data,
      timeout: options.timeout || 10000
    });
    
    return {
      success: true,
      data: response.data,
      status: response.status
    };
  } catch (error) {
    console.error('API Request Error:', error.message);
    return {
      success: false,
      error: error.message,
      status: error.response?.status || 500
    };
  }
};

// Rate limiting helper
const rateLimiter = new Map();

const checkRateLimit = (key, limit = 100, windowMs = 60000) => {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!rateLimiter.has(key)) {
    rateLimiter.set(key, []);
  }
  
  const requests = rateLimiter.get(key);
  const validRequests = requests.filter(time => time > windowStart);
  
  if (validRequests.length >= limit) {
    return false;
  }
  
  validRequests.push(now);
  rateLimiter.set(key, validRequests);
  return true;
};

module.exports = {
  makeApiRequest,
  checkRateLimit
};