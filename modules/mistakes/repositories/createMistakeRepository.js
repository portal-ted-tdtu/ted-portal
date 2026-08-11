// modules/mistakes/repositories/createMistakeRepository.js

import { run } from "../../../database/query.js";

export class createMistakeRepository {

    constructor(db) {
        this.db = db;
    }

    async createMistake(
        mistakeId,
        mistakeName,
        level,
        isActive,
        createdBy
    ) {

        await run(
            this.db,
            `
            INSERT INTO MISTAKES
            (
                mistake_id,
                mistake_name,
                level,
                is_active,
                created_by,
                updated_by
            )
            VALUES
            (
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
            )
            `,
            [
                mistakeId,
                mistakeName,
                level,
                isActive,
                createdBy,
                createdBy
            ]
        );
    }
}