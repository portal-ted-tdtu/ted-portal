// ./utils/validators/passwordValidator.js

export function isValidPassword(
    password
) {

    if (!password) {
        return false;
    }

    return password.length >= 8;
}