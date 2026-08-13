// modules/users/requests/UpdateMyProfileRequest.js

export const UpdateMyProfileRequest = {
    user_name: { required: false, type: "string", maxLength: 255 },
    birthday: { required: false, type: "string" },
    sex: { required: false, type: "number" },
    phone: { required: false, type: "string" },
    email: { required: false, type: "string" },
    avatar: { required: false, type: "string" }
};