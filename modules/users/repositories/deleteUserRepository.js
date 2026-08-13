// modules/users/repositories/deleteUserRepository.js

import { run } from "../../../database/query.js";

export class deleteUserRepository {
    constructor(db) { this.db = db; }

    async deleteUser(userId) {
        await run(this.db, `
            DELETE FROM USERS
            WHERE user_id = ?
        `, [userId]);
    }
}