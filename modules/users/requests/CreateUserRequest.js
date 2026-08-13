// modules/users/requests/CreateUserRequest.js

export const CreateUserRequest = {
    user_id: { required: true, type: "string", minLength: 8, maxLength: 8 },
    user_name: { required: true, type: "string", maxLength: 255 },
    birthday: { required: false, type: "string" },
    sex: { required: false, type: "number" },
    faculty_id: { required: false, type: "string" },
    phone: { required: false, type: "string" },
    email: { required: false, type: "string" },
    department_id: { required: false, type: "string" },
    role_id: { required: false, type: "string" },
    generation_id: { required: false, type: "string" },
    avatar: { required: false, type: "string" },
    is_active: { required: false, type: "number" }
};