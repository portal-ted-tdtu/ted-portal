import { matchRoute } from "../../../utils/matchRoute.js";
import { apiResponse } from "../../../shared/responses/apiResponse.js";

import { getFacultyListValidation } from "../validations/getFacultyListValidation.js";

import { getFacultyListService } from "../services/getFacultyListService.js";
import { getFacultyActiveService } from "../services/getFacultyActiveService.js";

export async function facultyRouter(ctx) {

    if (matchRoute(ctx, "GET", "/api/faculties", "/list")) {

        getFacultyListValidation(ctx.query);

        const data = await getFacultyListService(ctx);

        return apiResponse({
            success: true,
            message: "Get faculty list successfully",
            data
        });
    }

    if (matchRoute(ctx, "GET", "/api/faculties", "/active")) {

        const data = await getFacultyActiveService(ctx);

        return apiResponse({
            success: true,
            message: "Get active faculties successfully",
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