import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Mock favorites storage
const userFavorites = {};

// Get user profile
router.get('/profile', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      user: req.user,
      favorites: userFavorites[req.user.id] || []
    }
  });
});

// Update user preferences
router.put('/preferences', [
  body('categories').optional().isArray(),
  body('darkMode').optional().isBoolean(),
  body('language').optional().isString(),
  body('notifications').optional().isBoolean()
], authenticateToken, (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { categories, darkMode, language, notifications } = req.body;
    const user = req.user;

    // Update preferences
    if (categories !== undefined) user.preferences.categories = categories;
    if (darkMode !== undefined) user.preferences.darkMode = darkMode;
    if (language !== undefined) user.preferences.language = language;
    if (notifications !== undefined) user.preferences.notifications = notifications;

    user.updatedAt = new Date();

    res.json({
      success: true,
      data: { preferences: user.preferences }
    });
  } catch (error) {
    console.error('Preferences update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update preferences'
    });
  }
});

// Add to favorites
router.post('/favorites/:contentId', authenticateToken, (req, res) => {
  try {
    const { contentId } = req.params;
    const userId = req.user.id;

    if (!userFavorites[userId]) {
      userFavorites[userId] = [];
    }

    if (!userFavorites[userId].includes(contentId)) {
      userFavorites[userId].push(contentId);
    }

    res.json({
      success: true,
      data: { favorites: userFavorites[userId] }
    });
  } catch (error) {
    console.error('Add favorite error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add favorite'
    });
  }
});

// Remove from favorites
router.delete('/favorites/:contentId', authenticateToken, (req, res) => {
  try {
    const { contentId } = req.params;
    const userId = req.user.id;

    if (userFavorites[userId]) {
      userFavorites[userId] = userFavorites[userId].filter(id => id !== contentId);
    }

    res.json({
      success: true,
      data: { favorites: userFavorites[userId] || [] }
    });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to remove favorite'
    });
  }
});

// Get favorites
router.get('/favorites', authenticateToken, (req, res) => {
  const userId = req.user.id;
  res.json({
    success: true,
    data: { favorites: userFavorites[userId] || [] }
  });
});

export default router;