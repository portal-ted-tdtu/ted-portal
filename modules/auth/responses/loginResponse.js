// ./modules/auth/responses/loginResponse.js

import { apiResponse
 } from "../../../shared/responses/apiResponse.js";

export function loginResponse(
    data
) {

    return apiResponse({
        success: true,
        message:
            "Login successfully",
        data,
        status: 200
    });
}