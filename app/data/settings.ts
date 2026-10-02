/**
 * Common transition time for MainIssueCard and MainIssuesSlider - they should run in sync
 */
export const PANEL_TRANSITION_MS = 500

/**
 * Timeout in milliseconds for requests to strapi, without it requests can hang on for minutes
 */
export const STRAPI_TIMEOUT_MS = 10_000

/**
 * All network errors code: timeout, no connection, etc
 */
export const NETWORK_ERROR_STATUS = 503

export const NOT_FOUND_STATUS = 404
