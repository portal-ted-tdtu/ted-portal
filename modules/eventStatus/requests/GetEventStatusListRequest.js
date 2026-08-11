// src/modules/eventStatus/requests/GetEventStatusListRequest.js

export const GetEventStatusListRequest = {
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