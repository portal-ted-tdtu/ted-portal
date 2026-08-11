// modules/eventTypes/repositories/getEventTypeListRepository.js

import { all } from "../../../database/query.js";

export class getEventTypeListRepository {

    constructor(db) {
        this.db = db;
    }

    async getEventTypeList(keyword, limit, offset) {

        return await all(
            this.db,
            `
            SELECT
                event_type_id,
                event_type_name,
                description,
                color,
                is_active,
                created_at,
                created_by,
                updated_at,
                updated_by
            FROM EVENT_TYPES
            WHERE (
                ? IS NULL
                OR event_type_name LIKE ?
            )
            ORDER BY event_type_id
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