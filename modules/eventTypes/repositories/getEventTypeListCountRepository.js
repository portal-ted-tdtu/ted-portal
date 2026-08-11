// modules/eventTypes/repositories/getEventTypeListCountRepository.js

import { first } from "../../../database/query.js";

export class getEventTypeListCountRepository {

    constructor(db) {
        this.db = db;
    }

    async getTotal(keyword) {

        const result = await first(
            this.db,
            `
            SELECT COUNT(*) total
            FROM EVENT_TYPES
            WHERE (
                ? IS NULL
                OR event_type_name LIKE ?
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