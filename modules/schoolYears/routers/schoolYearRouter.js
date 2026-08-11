import { matchRoute } from "../../../utils/matchRoute.js";
import { apiResponse } from "../../../shared/responses/apiResponse.js";

import { getSchoolYearListValidation } from "../validations/getSchoolYearListValidation.js";

import { getSchoolYearListService } from "../services/getSchoolYearListService.js";
import { getSchoolYearActiveService } from "../services/getSchoolYearActiveService.js";
import { createSchoolYearService } from "../services/createSchoolYearService.js";

export async function schoolYearRouter(ctx) {

    if (matchRoute(ctx.request, "GET", "/api/school-years", "/list")) {

        getSchoolYearListValidation(ctx.query);

        const data = await getSchoolYearListService(ctx);

        return apiResponse({
            success: true,
            message: "Get school year list successfully",
            data
        });
    }

    if (matchRoute(ctx.request, "GET", "/api/school-years", "/active")) {

        const data = await getSchoolYearActiveService(ctx);

        return apiResponse({
            success: true,
            message: "Get active school years successfully",
            data
        });
    }

    if (matchRoute(ctx.request, "POST", "/api/school-years", "/create")) {

        const data = await createSchoolYearService(ctx);

        return apiResponse({
            success: true,
            message: "Create school year successfully",
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