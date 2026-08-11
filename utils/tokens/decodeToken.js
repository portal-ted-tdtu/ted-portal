// utils/tokens/decodeToken.js

/**
 * Decode JWT payload.
 *
 * Lưu ý:
 * Hàm này không xác thực chữ ký.
 *
 * @param {string} token
 * @returns {Object|null}
 */
export function decodeToken(token) {
    try {
        if (!token) {
            return null;
        }

        const parts = token.split(".");

        if (parts.length !== 3) {
            return null;
        }

        const payload = parts[1];

        const base64 = payload
            .replace(/-/g, "+")
            .replace(/_/g, "/");

        const padded = base64.padEnd(
            base64.length + (4 - base64.length % 4) % 4,
            "="
        );

        const decoded = atob(padded);

        return JSON.parse(decoded);
    } catch {
        return null;
    }
}