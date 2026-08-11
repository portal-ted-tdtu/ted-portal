// src/modules/eventStatus/repositories/getEventStatusListRepository.js

import { all } from "../../../database/query.js";

export class getEventStatusListRepository {

    constructor(db) {
        this.db = db;
    }

    async getEventStatusList(keyword, limit, offset) {

        return await all(
            this.db,
            `
            SELECT
                event_status_id,
                event_status_name,
                description,
                color,
                is_active,
                created_at,
                created_by,
                updated_at,
                updated_by
            FROM EVENT_STATUS
            WHERE (
                ? IS NULL
                OR event_status_name LIKE ?
            )
            ORDER BY event_status_name
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