// modules/users/services/deleteUserService.js

import { ForbiddenError } from "../../../shared/errors/ForbiddenError.js";
import { NotFoundError } from "../../../shared/errors/NotFoundError.js";
import { ConflictError } from "../../../shared/errors/ConflictError.js";
import { ROLE } from "../../../shared/constants/role.js";
import { checkRole } from "../../../utils/permission/checkPermission.js";
import { foreignKeyReferences } from "../../../database/query.js";
import { getUserByIdRepository } from "../repositories/getUserByIdRepository.js";
import { deleteUserRepository } from "../repositories/deleteUserRepository.js";

export async function deleteUserService(ctx) {
    if (!checkRole(ctx.user, ROLE.CAPTAIN)) throw new ForbiddenError("Permission denied");

    const userId = ctx.params.user_id;
    const findRepository = new getUserByIdRepository(ctx.bindings.db);
    const user = await findRepository.findById(userId);

    if (!user) throw new NotFoundError("User not found");

    const references = await foreignKeyReferences(ctx.bindings.db, "USERS", "user_id", userId);

    if (references.length > 0) throw new ConflictError("Cannot delete user because it is referenced by another record");

    const repository = new deleteUserRepository(ctx.bindings.db);
    await repository.deleteUser(userId);

    return { user_id: userId };
}