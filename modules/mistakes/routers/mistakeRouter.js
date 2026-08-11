// modules/mistakes/mistakeRouter.js

import { matchRoute } from "../../../utils/matchRoute.js";
import { apiResponse } from "../../../shared/responses/apiResponse.js";

import { getMistakeListValidation } from "../validations/getMistakeListValidation.js";
import { createMistakeValidation } from "../validations/createMistakeValidation.js";
import { updateMistakeValidation } from "../validations/updateMistakeValidation.js";
import { getMistakeByIdValidation } from "../validations/getMistakeByIdValidation.js";
import { deleteMistakeValidation } from "../validations/deleteMistakeValidation.js";

import { getMistakeListService } from "../services/getMistakeListService.js";
import { getMistakeActiveService } from "../services/getMistakeActiveService.js";
import { createMistakeService } from "../services/createMistakeService.js";
import { updateMistakeService } from "../services/updateMistakeService.js";
import { getMistakeByIdService } from "../services/getMistakeByIdService.js";
import { deleteMistakeService } from "../services/deleteMistakeService.js";

export async function mistakeRouter(ctx) {
    if (matchRoute(ctx, "GET", "/api/mistakes", "/list")) {
        getMistakeListValidation(ctx.query);

        const data = await getMistakeListService(ctx);

        return apiResponse({
            success: true,
            message: "Get mistake list successfully",
            data
        });
    }

    if (matchRoute(ctx, "GET", "/api/mistakes", "/active")) {
        const data = await getMistakeActiveService(ctx);

        return apiResponse({
            success: true,
            message: "Get active mistakes successfully",
            data
        });
    }

    if (matchRoute(ctx, "GET", "/api/mistakes", "/:mistake_id")) {
        getMistakeByIdValidation(ctx.params);

        const data = await getMistakeByIdService(ctx);

        return apiResponse({
            success: true,
            message: "Get mistake successfully",
            data
        });
    }

    if (matchRoute(ctx, "POST", "/api/mistakes", "/create")) {
        createMistakeValidation(ctx.body);

        const data = await createMistakeService(ctx);

        return apiResponse({
            success: true,
            message: "Create mistake successfully",
            data
        });
    }

    if (matchRoute(ctx, "PUT", "/api/mistakes", "/update")) {
        updateMistakeValidation(ctx.body);

        const data = await updateMistakeService(ctx);

        return apiResponse({
            success: true,
            message: "Update mistake successfully",
            data
        });
    }

    if (matchRoute(ctx, "DELETE", "/api/mistakes", "/:mistake_id")) {
        deleteMistakeValidation(ctx.params);

        const data = await deleteMistakeService(ctx);

        return apiResponse({
            success: true,
            message: "Delete mistake successfully",
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