// modules/mistakes/repositories/getMistakeListCountRepository.js

import { first } from "../../../database/query.js";

export class getMistakeListCountRepository {

    constructor(db) {
        this.db = db;
    }

    async getTotal(
        keyword,
        isActive
    ) {

        const result = await first(
            this.db,
            `
            SELECT
                COUNT(*) total
            FROM MISTAKES
            WHERE
                (
                    ? IS NULL
                    OR mistake_name LIKE ?
                )
                AND
                (
                    ? IS NULL
                    OR is_active = ?
                )
            `,
            [
                keyword,
                keyword ? `%${keyword}%` : null,
                isActive,
                isActive
            ]
        );

        return result.total;
    }
}