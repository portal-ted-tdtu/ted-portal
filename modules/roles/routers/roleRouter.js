// modules/roles/routers/roleRouter.js

import { matchRoute } from "../../../utils/matchRoute.js";
import { apiResponse } from "../../../shared/responses/apiResponse.js";

import { getRoleListValidation } from "../validations/getRoleListValidation.js";

import { getRoleListService } from "../services/getRoleListService.js";
import { getRoleActiveService } from "../services/getRoleActiveService.js";

export async function roleRouter(ctx) {

    if (matchRoute(ctx, "GET", "/api/roles", "/list")) {

        getRoleListValidation(ctx.query);

        const data = await getRoleListService(ctx);

        return apiResponse({
            success: true,
            message: "Get role list successfully",
            data
        });
    }

    if (matchRoute(ctx, "GET", "/api/roles", "/active")) {

        const data = await getRoleActiveService(ctx);

        return apiResponse({
            success: true,
            message: "Get active roles successfully",
            data
        });
    }

    return Response.json(
        {
            success: false,
            message: "Route not found"
        },
        {
            status: 404
        }
    );
}