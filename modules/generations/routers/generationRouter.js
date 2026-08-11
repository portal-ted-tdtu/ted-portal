import { matchRoute } from "../../../utils/matchRoute.js";
import { apiResponse } from "../../../shared/responses/apiResponse.js";

import { getGenerationListValidation } from "../validations/getGenerationListValidation.js";
import { createGenerationValidation } from "../validations/createGenerationValidation.js";

import { getGenerationListService } from "../services/getGenerationListService.js";
import { getGenerationActiveService } from "../services/getGenerationActiveService.js";
import { createGenerationService } from "../services/createGenerationService.js";

export async function generationRouter(ctx) {

    if (matchRoute(ctx.request, "GET", "/api/generations", "/list")) {

        getGenerationListValidation(ctx.query);

        const data = await getGenerationListService(ctx);

        return apiResponse({
            success: true,
            message: "Get generation list successfully",
            data
        });
    }

    if (matchRoute(ctx.request, "GET", "/api/generations", "/active")) {

        const data = await getGenerationActiveService(ctx);

        return apiResponse({
            success: true,
            message: "Get active generations successfully",
            data
        });
    }

    if (matchRoute(ctx.request, "POST", "/api/generations", "/create")) {

        createGenerationValidation(ctx.body);

        const data = await createGenerationService(ctx);

        return apiResponse({
            success: true,
            message: "Create generation successfully",
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