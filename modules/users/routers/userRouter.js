// modules/users/routers/userRouter.js

import { matchRoute } from "../../../utils/matchRoute.js";
import { apiResponse } from "../../../shared/responses/apiResponse.js";

import { createUserValidation } from "../validations/createUserValidation.js";
import { getUserListValidation } from "../validations/getUserListValidation.js";
import { getUserByIdValidation } from "../validations/getUserByIdValidation.js";
import { updateUserValidation } from "../validations/updateUserValidation.js";
import { updateMyProfileValidation } from "../validations/updateMyProfileValidation.js";

import { createUserService } from "../services/createUserService.js";
import { getUserActiveService } from "../services/getUserActiveService.js";
import { getUserListService } from "../services/getUserListService.js";
import { getUserByIdService } from "../services/getUserByIdService.js";
import { deleteUserService } from "../services/deleteUserService.js";
import { updateUserService } from "../services/updateUserService.js";
import { getMyProfileService } from "../services/getMyProfileService.js";
import { updateMyProfileService } from "../services/updateMyProfileService.js";

export async function userRouter(ctx) {
    if (matchRoute(ctx, "GET", "/api/users", "/active")) {
        const data = await getUserActiveService(ctx);
        return apiResponse({ success: true, message: "Get active users successfully", data });
    }

    if (matchRoute(ctx, "GET", "/api/users", "/list")) {
        getUserListValidation(ctx.query);
        const data = await getUserListService(ctx);
        return apiResponse({ success: true, message: "Get user list successfully", data });
    }

    if (matchRoute(ctx, "GET", "/api/users", "/profile")) {
        const data = await getMyProfileService(ctx);
        return apiResponse({ success: true, message: "Get profile successfully", data });
    }

    if (matchRoute(ctx, "GET", "/api/users", "/:user_id")) {
        getUserByIdValidation(ctx.params);
        const data = await getUserByIdService(ctx);
        return apiResponse({ success: true, message: "Get user successfully", data });
    }

    if (matchRoute(ctx, "POST", "/api/users", "/create")) {
        createUserValidation(ctx.body);
        const data = await createUserService(ctx);
        return apiResponse({ success: true, message: "Create user successfully", data });
    }

    if (matchRoute(ctx, "PUT", "/api/users", "/update")) {
        updateUserValidation(ctx.body);
        const data = await updateUserService(ctx);
        return apiResponse({ success: true, message: "Update user successfully", data });
    }

    if (matchRoute(ctx, "PUT", "/api/users", "/profile")) {
        updateMyProfileValidation(ctx.body);
        const data = await updateMyProfileService(ctx);
        return apiResponse({ success: true, message: "Update profile successfully", data });
    }

    if (matchRoute(ctx, "DELETE", "/api/users", "/:user_id")) {
        getUserByIdValidation(ctx.params);
        const data = await deleteUserService(ctx);
        return apiResponse({ success: true, message: "Delete user successfully", data });
    }

    return Response.json({ success: false, message: "Route not found" }, { status: 404 });
}