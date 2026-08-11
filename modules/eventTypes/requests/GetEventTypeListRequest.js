// modules/eventTypes/requests/GetEventTypeListRequest.js

export const GetEventTypeListRequest = {
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