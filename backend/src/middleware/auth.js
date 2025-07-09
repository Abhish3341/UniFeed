import jwt from 'jsonwebtoken';

// Mock user database
const users = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    preferences: {
      categories: ['technology', 'sports', 'entertainment'],
      darkMode: false,
      language: 'en',
      notifications: true,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret', (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, error: 'Invalid token' });
    }

    const user = users.find(u => u.id === decoded.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    req.user = user;
    next();
  });
};

export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret', (err, decoded) => {
    if (!err) {
      const user = users.find(u => u.id === decoded.userId);
      if (user) {
        req.user = user;
      }
    }
    next();
  });
};