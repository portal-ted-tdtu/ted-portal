// modules/eventStatus/routers/eventStatusRouter.js

import { matchRoute } from "../../../utils/matchRoute.js";
import { apiResponse } from "../../../shared/responses/apiResponse.js";

import { getEventStatusListValidation } from "../validations/getEventStatusListValidation.js";

import { getEventStatusListService } from "../services/getEventStatusListService.js";
import { getEventStatusActiveService } from "../services/getEventStatusActiveService.js";

export async function eventStatusRouter(ctx) {

    if (matchRoute(ctx, "GET", "/api/event-status", "/list")) {

        getEventStatusListValidation(ctx.query);

        const data = await getEventStatusListService(ctx);

        return apiResponse({
            success: true,
            message: "Get event status list successfully",
            data
        });
    }

    if (matchRoute(ctx, "GET", "/api/event-status", "/active")) {

        const data = await getEventStatusActiveService(ctx);

        return apiResponse({
            success: true,
            message: "Get active event status successfully",
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