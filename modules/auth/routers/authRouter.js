// ./modules/auth/routers/authRouter.js

import { loginValidation
 } from "../validations/loginValidation.js";

import { loginService
 } from "../services/loginService.js";

import { loginResponse
 } from "../responses/loginResponse.js";

export async function authRouter(
    ctx
) {

    const url =
        new URL(
            ctx.request.url
        );

    const path =
        url.pathname;

    const method =
        ctx.request.method;

    if (
        method === "POST" &&
        path === "/api/auth/login"
    ) {

        loginValidation(
            ctx.body
        );

        const result =
            await loginService(
                ctx
            );

        return loginResponse(
            result
        );
    }

    return Response.json(
        {
            success: false,
            message:
                "Route not found"
        },
        {
            status: 404
        }
    );
}