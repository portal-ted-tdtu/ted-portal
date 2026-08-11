// modules/mistakes/repositories/getMistakeListRepository.js

import { all } from "../../../database/query.js";

export class getMistakeListRepository {

    constructor(db) {
        this.db = db;
    }

    async getMistakeList(
        keyword,
        isActive,
        limit,
        offset
    ) {

        return await all(
            this.db,
            `
            SELECT
                mistake_id,
                mistake_name,
                level,
                is_active,
                created_at,
                created_by,
                updated_at,
                updated_by
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
            ORDER BY mistake_id DESC
            LIMIT ?
            OFFSET ?
            `,
            [
                keyword,
                keyword ? `%${keyword}%` : null,
                isActive,
                isActive,
                limit,
                offset
            ]
        );
    }
}