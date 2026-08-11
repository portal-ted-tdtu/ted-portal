// src/utils/permission/checkPermission.js

export function checkDepartment(user, departmentId) {
    if (!user) {
        return false;
    }

    return user.department_id === departmentId;
}

export function checkGroup(user, group) {
    if (!user || !Array.isArray(group)) {
        return false;
    }

    return group.includes(user.role_id);
}

export function checkRole(user, role) {
    if (!user) {
        return false;
    }

    return user.role_id === role;
}