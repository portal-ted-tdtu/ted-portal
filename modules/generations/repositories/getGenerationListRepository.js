// src/modules/generations/repositories/getGenerationListRepository.js

import { all } from "../../../database/query.js";

export class getGenerationListRepository {

    constructor(db) {
        this.db = db;
    }

    async getGenerationList(keyword, limit, offset) {

        return await all(
            this.db,
            `
            SELECT
                generation_id,
                generation_name,
                is_active,
                created_at,
                created_by,
                updated_at,
                updated_by
            FROM GENERATIONS
            WHERE (
                ? IS NULL
                OR generation_name LIKE ?
            )
            ORDER BY generation_id DESC
            LIMIT ?
            OFFSET ?
            `,
            [
                keyword,
                keyword ? `%${keyword}%` : null,
                limit,
                offset
            ]
        );
    }
}