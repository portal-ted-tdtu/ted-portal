import { run } from "../../../database/query.js";

export class createGenerationRepository {

    constructor(db) {
        this.db = db;
    }

    async createGeneration(
        generationId,
        generationName,
        createdBy
    ) {

        await run(
            this.db,
            `
            INSERT INTO GENERATIONS
            (
                generation_id,
                generation_name,
                created_by,
                updated_by
            )
            VALUES
            (
                ?,
                ?,
                ?,
                ?
            )
            `,
            [
                generationId,
                generationName,
                createdBy,
                createdBy
            ]
        );
    }
}