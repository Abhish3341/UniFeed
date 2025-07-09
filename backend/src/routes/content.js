import express from 'express';
import { query } from 'express-validator';
import { fetchNewsAPI, fetchMoviesAPI, fetchSocialAPI } from '../services/contentService.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Get news content
router.get('/news', [
  query('categories').optional().isString(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('search').optional().isString()
], optionalAuth, async (req, res) => {
  try {
    const categories = req.query.categories ? req.query.categories.split(',') : ['general'];
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search;

    const news = await fetchNewsAPI(categories, search, page, limit);

    res.json({
      success: true,
      data: {
        items: news,
        page,
        limit,
        hasMore: news.length === limit
      }
    });
  } catch (error) {
    console.error('News fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch news'
    });
  }
});

// Get movies content
router.get('/movies', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('search').optional().isString()
], optionalAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search;

    const movies = await fetchMoviesAPI(search, page, limit);

    res.json({
      success: true,
      data: {
        items: movies,
        page,
        limit,
        hasMore: movies.length === limit
      }
    });
  } catch (error) {
    console.error('Movies fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch movies'
    });
  }
});

// Get social content
router.get('/social', [
  query('hashtags').optional().isString(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('search').optional().isString()
], optionalAuth, async (req, res) => {
  try {
    const hashtags = req.query.hashtags ? req.query.hashtags.split(',') : ['trending'];
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search;

    const socialPosts = await fetchSocialAPI(hashtags, search, page, limit);

    res.json({
      success: true,
      data: {
        items: socialPosts,
        page,
        limit,
        hasMore: socialPosts.length === limit
      }
    });
  } catch (error) {
    console.error('Social fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch social content'
    });
  }
});

// Search across all content types
router.get('/search', [
  query('q').isString().isLength({ min: 1 }),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 })
], optionalAuth, async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    // Search across all content types
    const [news, movies, social] = await Promise.all([
      fetchNewsAPI(['general'], searchQuery, 1, Math.ceil(limit / 3)),
      fetchMoviesAPI(searchQuery, 1, Math.ceil(limit / 3)),
      fetchSocialAPI(['trending'], searchQuery, 1, Math.ceil(limit / 3))
    ]);

    const allResults = [...news, ...movies, ...social]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit);

    res.json({
      success: true,
      data: {
        items: allResults,
        page,
        limit,
        hasMore: allResults.length === limit,
        query: searchQuery
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      error: 'Search failed'
    });
  }
});

// Get trending content
router.get('/trending', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 })
], optionalAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    // Fetch trending content from all sources
    const [news, movies, social] = await Promise.all([
      fetchNewsAPI(['technology', 'entertainment', 'sports'], undefined, 1, 10),
      fetchMoviesAPI(undefined, 1, 10),
      fetchSocialAPI(['trending', 'viral'], undefined, 1, 10)
    ]);

    const trendingContent = [...news, ...movies, ...social]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit);

    res.json({
      success: true,
      data: {
        items: trendingContent,
        page,
        limit,
        hasMore: trendingContent.length === limit
      }
    });
  } catch (error) {
    console.error('Trending fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch trending content'
    });
  }
});

export default router;