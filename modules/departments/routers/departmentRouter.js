import { matchRoute } from "../../../utils/matchRoute.js";
import { apiResponse } from "../../../shared/responses/apiResponse.js";

import { getDepartmentListValidation } from "../validations/getDepartmentListValidation.js";

import { getDepartmentListService } from "../services/getDepartmentListService.js";
import { getDepartmentActiveService } from "../services/getDepartmentActiveService.js";

export async function departmentRouter(ctx) {

    if (matchRoute(ctx, "GET", "/api/departments", "/list")) {

        getDepartmentListValidation(ctx.query);

        const data = await getDepartmentListService(ctx);

        return apiResponse({
            success: true,
            message: "Get department list successfully",
            data
        });
    }

    if (matchRoute(ctx, "GET", "/api/departments", "/active")) {

        const data = await getDepartmentActiveService(ctx);

        return apiResponse({
            success: true,
            message: "Get active departments successfully",
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