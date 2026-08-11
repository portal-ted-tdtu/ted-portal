// src/modules/auth/repositories/updatePassword.js

import { run } from "../../../database/query.js";

export class updatePasswordRepository {

    constructor(db) {
        this.db = db;
    }

    async updatePassword(
        userId,
        password,
        updatedBy
    ) {
        return await run(
            this.db,
            `
            UPDATE USERS
            SET
                password = ?,
                updated_at = CURRENT_TIMESTAMP,
                updated_by = ?
            WHERE user_id = ?
            `,
            [
                password,
                updatedBy,
                userId
            ]
        );
    }
}