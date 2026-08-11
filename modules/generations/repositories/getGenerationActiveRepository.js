// src/modules/generations/repositories/getGenerationActiveRepository.js

import { all } from "../../../database/query.js";

export class getGenerationActiveRepository {

    constructor(db) {
        this.db = db;
    }

    async getGenerationActive() {

        return await all(
            this.db,
            `
            SELECT
                generation_id,
                generation_name
            FROM GENERATIONS
            WHERE is_active = 1
            ORDER BY generation_id DESC
            `
        );
    }
}