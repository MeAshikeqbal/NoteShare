/**
 * All routes that are accessible to the public
 * require no authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/new-verification"
];

/**
 * An array of routes for authention
 * these routes will authenticate the user
 * @type {string[]}
 */
export const authRoutes = [
    "/login",
    "/register",
    "/error",
    "/forgot-password",
    "/new-password",
];

/**
 * An array of routes that require a user to be authenticated
 * @type {string[]}
 */
export const privateRoutes = [
    "/dashboard",
    "/settings",
];

/**
 * Prefix for API auth routes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";


/**
 * Default redirect path after login
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";