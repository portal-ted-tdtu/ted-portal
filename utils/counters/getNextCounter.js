// utils\counters\getNextCounter.js

import { first } from "../../database/query.js";

export async function getNextCounter(db, tableName, prefix, length = 3) {

    const counter = await first(
        db,
        `
        SELECT
            table_name,
            prefix,
            current,
            length
        FROM COUNTERS
        WHERE table_name = ?
        AND prefix = ?
        LIMIT 1
        `,
        [tableName, prefix]
    );

    if (!counter) {
        return {
            code: prefix + String(0).padStart(length, "0"),
            number: 0,
            current: 0,
            prefix,
            length
        };
    }

    const number = counter.current;

    const code =
        counter.prefix +
        String(number).padStart(
            counter.length,
            "0"
        );

    return {
        code,
        number,
        current: counter.current,
        prefix: counter.prefix,
        length: counter.length
    };
}