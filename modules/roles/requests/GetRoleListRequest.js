// src/modules/roles/requests/GetRoleListRequest.js

export const GetRoleListRequest = {
    page: {
        required: false,
        type: "number"
    },
    page_size: {
        required: false,
        type: "number"
    },
    keyword: {
        required: false,
        type: "string",
        maxLength: 100
    }
};