// modules/mistakes/repositories/deleteMistakeRepository.js

import { run } from "../../../database/query.js";

export class deleteMistakeRepository {

    constructor(db) {
        this.db = db;
    }

    async deleteMistake(mistakeId) {

        await run(
            this.db,
            `
            DELETE FROM MISTAKES
            WHERE mistake_id = ?
            `,
            [mistakeId]
        );
    }
}