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
    ctx,
    method,
    root,
    path
) {
    const url = new URL(ctx.request.url);

    const requestMethod =
        ctx.request.method.toUpperCase();

    const requestPath =
        normalizePath(url.pathname);

    const expectedMethod =
        method.toUpperCase();

    const expectedRoute =
        normalizePath(
            `${root}${path}`
        );

    if (
        requestMethod !== expectedMethod
    ) {
        return false;
    }

    const routeParts =
        expectedRoute
            .split("/")
            .filter(Boolean);

    const requestParts =
        requestPath
            .split("/")
            .filter(Boolean);

    if (
        routeParts.length !==
        requestParts.length
    ) {
        return false;
    }

    const params = {};

    const matched =
        routeParts.every(
            (part, index) => {

                const requestPart =
                    requestParts[index];

                if (
                    part.startsWith(":")
                ) {
                    const paramName =
                        part.slice(1);

                    params[paramName] =
                        decodeURIComponent(
                            requestPart
                        );

                    return true;
                }

                return (
                    part === requestPart
                );
            }
        );

    if (matched) {
        ctx.params = params;
    }

    return matched;
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

    if (
        !normalized.startsWith("/")
    ) {
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