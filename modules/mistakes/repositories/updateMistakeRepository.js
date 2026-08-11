// modules/mistakes/repositories/updateMistakeRepository.js

import { run } from "../../../database/query.js";

export class updateMistakeRepository {

    constructor(db) {
        this.db = db;
    }

    async updateMistake(
        mistakeId,
        mistakeName,
        level,
        isActive,
        updatedBy
    ) {

        await run(
            this.db,
            `
            UPDATE MISTAKES
            SET
                mistake_name = ?,
                level = ?,
                is_active = ?,
                updated_by = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE mistake_id = ?
            `,
            [
                mistakeName,
                level,
                isActive,
                updatedBy,
                mistakeId
            ]
        );
    }
}