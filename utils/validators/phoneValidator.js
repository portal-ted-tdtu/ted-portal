// ./utils/validators/phoneValidator.js

export function isValidPhone(
    phone
) {

    return /^(0|\+84)[0-9]{9,10}$/
        .test(phone);
}