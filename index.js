// ./index.js

import { createContext } from "./app/context.js";

import { router } from "./app/router.js";

import { getBody } from "./utils/getBody.js";

import { getQuery } from "./utils/getQuery.js";

import { getParams } from "./utils/getParams.js";

import { authMiddleware } from "./middlewares/authMiddleware.js";

import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const PUBLIC_PREFIXES = [
    "/api/auth/login",
    "/api/auth/verifyToken",
    "/api/public"
];

const ALLOWED_ORIGINS = [
    "*",
    "http://localhost:5173"
];

function getCorsHeaders(request) {

    const origin =
        request.headers.get("Origin");

    const headers = {
        "Access-Control-Allow-Methods":
            "GET, POST, PUT, PATCH, DELETE, OPTIONS",

        "Access-Control-Allow-Headers":
            "Content-Type, Authorization",

        "Access-Control-Allow-Credentials":
            "true",

        "Access-Control-Max-Age":
            "86400"
    };

    if (
        origin &&
        ALLOWED_ORIGINS.includes(origin)
    ) {
        headers["Access-Control-Allow-Origin"] =
            origin;
    }

    return headers;
}

function corsResponse(request) {

    return new Response(null, {
        status: 204,
        headers: getCorsHeaders(request)
    });
}

function addCorsHeaders(response, request) {

    const headers =
        new Headers(response.headers);

    const corsHeaders =
        getCorsHeaders(request);

    Object.entries(corsHeaders).forEach(
        ([key, value]) => {
            headers.set(key, value);
        }
    );

    return new Response(
        response.body,
        {
            status: response.status,
            statusText: response.statusText,
            headers
        }
    );
}

export default {

    async fetch(
        request,
        env
    ) {

        try {

            // ========================================
            // CORS Preflight
            // ========================================

            if (
                request.method === "OPTIONS"
            ) {
                return corsResponse(request);
            }

            // ========================================
            // Context
            // ========================================

            const ctx =
                createContext(
                    request,
                    env
                );

            const url =
                new URL(
                    request.url
                );

            const path =
                url.pathname;

            // ========================================
            // Request data
            // ========================================

            ctx.body =
                await getBody(
                    request
                );

            ctx.query =
                getQuery(url);

            ctx.params =
                getParams(path);

            // ========================================
            // Authentication
            // ========================================

            const isPublic =
                PUBLIC_PREFIXES
                    .some(prefix =>
                        path.startsWith(
                            prefix
                        )
                    );

            if (
                !isPublic
            ) {

                await authMiddleware(
                    ctx
                );
            }

            // ========================================
            // Router
            // ========================================

            const response =
                await router(
                    ctx
                );

            // ========================================
            // CORS
            // ========================================

            return addCorsHeaders(
                response,
                request
            );

        } catch (error) {

            const response =
                errorMiddleware(
                    error
                );

            return addCorsHeaders(
                response,
                request
            );
        }
    }
};