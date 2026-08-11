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

export default {

    async fetch(
        request,
        env
    ) {

        try {

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

            ctx.body =
                await getBody(
                    request
                );

            ctx.query =
                getQuery(url);

            ctx.params =
                getParams(path);

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

            return await router(
                ctx
            );

        } catch (error) {

            return errorMiddleware(
                error
            );
        }
    }
};