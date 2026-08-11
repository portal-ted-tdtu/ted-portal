// modules/roles/repositories/getRoleListCountRepository.js

import { first } from "../../../database/query.js";

export class getRoleListCountRepository {

    constructor(db) {
        this.db = db;
    }

    async getTotal(keyword) {

        const result = await first(
            this.db,
            `
            SELECT COUNT(*) total
            FROM ROLES
            WHERE (
                ? IS NULL
                OR role_name LIKE ?
            )
            `,
            [
                keyword,
                keyword ? `%${keyword}%` : null
            ]
        );

        return result.total;
    }
}