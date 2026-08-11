// utils/tokens/validateToken.js

import { decodeToken } from "./decodeToken.js";

/**
 * Kiểm tra JWT còn thời hạn hay không.
 *
 * Lưu ý:
 * Hàm này chỉ kiểm tra payload và exp.
 * Không xác thực chữ ký JWT.
 *
 * @param {string} token
 * @returns {boolean}
 */
export function validateToken(token) {
    try {
        const payload = decodeToken(token);

        if (!payload || !payload.exp) {
            return false;
        }

        const now = Math.floor(
            Date.now() / 1000
        );

        return payload.exp > now;
    } catch {
        return false;
    }
}