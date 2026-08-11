// src/modules/eventStatus/repositories/getEventStatusListCountRepository.js

import { first } from "../../../database/query.js";

export class getEventStatusListCountRepository {

    constructor(db) {
        this.db = db;
    }

    async getTotal(keyword) {

        const result = await first(
            this.db,
            `
            SELECT COUNT(*) total
            FROM EVENT_STATUS
            WHERE (
                ? IS NULL
                OR event_status_name LIKE ?
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