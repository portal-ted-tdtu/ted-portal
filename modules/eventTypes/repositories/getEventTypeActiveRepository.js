// modules/eventTypes/repositories/getEventTypeActiveRepository.js

import { all } from "../../../database/query.js";

export class getEventTypeActiveRepository {

    constructor(db) {
        this.db = db;
    }

    async getEventTypeActive() {

        return await all(
            this.db,
            `
            SELECT
                event_type_id,
                event_type_name,
                description,
                color
            FROM EVENT_TYPES
            WHERE is_active = 1
            ORDER BY event_type_id
            `
        );
    }
}