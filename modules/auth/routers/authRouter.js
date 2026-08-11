// modules/auth/routers/authRouter.js

import { matchRoute } from "../../../utils/matchRoute.js";
import { apiResponse } from "../../../shared/responses/apiResponse.js";

import { loginValidation } from "../validations/loginValidation.js";
import { changePasswordValidation } from "../validations/changePasswordValidation.js";
import { resetPasswordValidation } from "../validations/resetPasswordValidation.js";

import { loginService } from "../services/loginService.js";
import { changePasswordService } from "../services/changePasswordService.js";
import { resetPasswordService } from "../services/resetPasswordService.js";
import { validateTokenService } from "../services/validateTokenService.js";

export async function authRouter(ctx) {

    // Đăng nhập
    if (matchRoute(ctx, "POST", "/api/auth", "/login")) {
        loginValidation(ctx.body);

        const data = await loginService(ctx);

        return apiResponse({
            success: true,
            message: "Login successfully",
            data,
            status: 200
        });
    }

    // Kiểm tra token
    if (matchRoute(ctx, "GET", "/api/auth", "/validate-token")) {
        const data = await validateTokenService(ctx);

        return apiResponse({
            success: true,
            message: "Token is valid",
            data,
            status: 200
        });
    }

    // Đổi mật khẩu
    if (matchRoute(ctx, "PUT", "/api/auth", "/change-password")) {
        changePasswordValidation(ctx.body);

        const data = await changePasswordService(ctx);

        return apiResponse({
            success: true,
            message: "Password changed successfully",
            data,
            status: 200
        });
    }

    // Reset mật khẩu
    if (matchRoute(ctx, "PUT", "/api/auth", "/reset-password")) {
        resetPasswordValidation(ctx.body);

        const data = await resetPasswordService(ctx);

        return apiResponse({
            success: true,
            message: "Password reset successfully",
            data,
            status: 200
        });
    }

    return Response.json(
        {
            success: false,
            message: "Route not found"
        },
        { status: 404 }
    );
}