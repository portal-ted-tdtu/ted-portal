// src/modules/eventStatus/repositories/getEventStatusActiveRepository.js

import { all } from "../../../database/query.js";

export class getEventStatusActiveRepository {

    constructor(db) {
        this.db = db;
    }

    async getEventStatusActive() {

        return await all(
            this.db,
            `
            SELECT
                event_status_id,
                event_status_name,
                description,
                color
            FROM EVENT_STATUS
            WHERE is_active = 1
            ORDER BY event_status_name
            `
        );
    }
}