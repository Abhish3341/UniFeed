// Type definitions for JSDoc comments

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} [avatar]
 * @property {UserPreferences} preferences
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} UserPreferences
 * @property {string[]} categories
 * @property {boolean} darkMode
 * @property {string} language
 * @property {boolean} notifications
 */

/**
 * @typedef {Object} ContentItem
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} [image]
 * @property {string} [url]
 * @property {string} category
 * @property {'news'|'movie'|'social'} type
 * @property {string} publishedAt
 * @property {string} source
 * @property {string} [author]
 * @property {number} [rating]
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {*} [data]
 * @property {string} [message]
 * @property {string} [error]
 */

export {};