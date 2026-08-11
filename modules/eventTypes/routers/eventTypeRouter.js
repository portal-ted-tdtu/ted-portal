import { matchRoute } from "../../../utils/matchRoute.js";
import { apiResponse } from "../../../shared/responses/apiResponse.js";

import { getEventTypeListValidation } from "../validations/getEventTypeListValidation.js";

import { getEventTypeListService } from "../services/getEventTypeListService.js";
import { getEventTypeActiveService } from "../services/getEventTypeActiveService.js";

export async function eventTypeRouter(ctx) {

    if (matchRoute(ctx, "GET", "/api/event-types", "/list")) {

        getEventTypeListValidation(ctx.query);

        const data = await getEventTypeListService(ctx);

        return apiResponse({
            success: true,
            message: "Get event type list successfully",
            data
        });
    }

    if (matchRoute(ctx, "GET", "/api/event-types", "/active")) {

        const data = await getEventTypeActiveService(ctx);

        return apiResponse({
            success: true,
            message: "Get active event types successfully",
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