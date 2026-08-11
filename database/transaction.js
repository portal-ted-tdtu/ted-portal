// ./database/transaction.js

export async function executeTransaction(
    db,
    callback
) {

    try {

        await db.exec("BEGIN TRANSACTION");

        const result = await callback(db);

        await db.exec("COMMIT");

        return result;

    } catch (error) {

        try {
            await db.exec("ROLLBACK");
        } catch (rollbackError) {
            console.error(
                "Rollback failed:",
                rollbackError
            );
        }

        throw error;
    }
}