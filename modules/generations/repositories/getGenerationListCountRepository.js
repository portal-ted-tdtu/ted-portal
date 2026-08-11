// modules/generations/repositories/getGenerationListCountRepository.js

import { first } from "../../../database/query.js";

export class getGenerationListCountRepository {

    constructor(db) {
        this.db = db;
    }

    async getTotal(keyword) {

        const result = await first(
            this.db,
            `
            SELECT COUNT(*) total
            FROM GENERATIONS
            WHERE (
                ? IS NULL
                OR generation_name LIKE ?
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