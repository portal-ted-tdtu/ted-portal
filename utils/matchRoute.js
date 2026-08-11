// src/utils/matchRoute.js

/**
 * Kiểm tra request có đúng HTTP method và route hay không.
 *
 * @param {Request} request
 * @param {string} method
 * @param {string} root
 * @param {string} path
 *
 * @returns {boolean}
 *
 * Ví dụ:
 * matchRoute(
 *     request,
 *     "POST",
 *     "/api/auth",
 *     "/login"
 * );
 */
export function matchRoute(
    request,
    method,
    root,
    path
) {

    const url = new URL(
        request.url
    );

    const requestMethod = request.method.toUpperCase();

    const requestPath = normalizePath(url.pathname);

    const expectedMethod = method.toUpperCase();

    const expectedRoot = normalizePath(root);

    const expectedPath = normalizePath(path);

    const expectedRoute = normalizePath( `${expectedRoot}${expectedPath}` );

    return (
        requestMethod === expectedMethod &&
        requestPath === expectedRoute
    );
}

/**
 * Chuẩn hóa path.
 *
 * Ví dụ:
 * "/api/auth/" -> "/api/auth"
 * "api/auth"   -> "/api/auth"
 * "login"      -> "/login"
 * "/login/"    -> "/login"
 * ""           -> ""
 *
 * @param {string} path
 *
 * @returns {string}
 */
function normalizePath(path) {

    if (!path) {
        return "";
    }

    let normalized =
        String(path)
            .trim()
            .replace(/\/+/g, "/");

    if (!normalized.startsWith("/")) {
        normalized =
            `/${normalized}`;
    }

    if (
        normalized.length > 1 &&
        normalized.endsWith("/")
    ) {
        normalized =
            normalized.slice(0, -1);
    }

    return normalized;
}