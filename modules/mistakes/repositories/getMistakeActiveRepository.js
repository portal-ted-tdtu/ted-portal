// modules/mistakes/repositories/getMistakeActiveRepository.js

import { all } from "../../../database/query.js";

export class getMistakeActiveRepository {

    constructor(db) {
        this.db = db;
    }

    async getMistakeActive() {

        return await all(
            this.db,
            `
            SELECT
                mistake_id,
                mistake_name,
                level
            FROM MISTAKES
            WHERE is_active = 1
            ORDER BY mistake_id DESC
            `
        );
    }
}