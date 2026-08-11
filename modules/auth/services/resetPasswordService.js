import { ForbiddenError } from "../../../shared/errors/ForbiddenError.js";
import { NotFoundError } from "../../../shared/errors/NotFoundError.js";

import { ROLE_GROUP, DEPARTMENT } from "../../../shared/constants/permission.js";

import { checkDepartment, checkGroup } from "../../../utils/permission/checkPermission.js";

import { findByStudentIdRepository } from "../repositories/findByStudentId.js";
import { updatePasswordRepository } from "../repositories/updatePassword.js";

import { hashPassword } from "../../../utils/passwords/hashPassword.js";

const DEFAULT_PASSWORD = "TED2013";

export async function resetPasswordService(ctx) {

    const requester = ctx.user;

    if ( !checkDepartment( requester, DEPARTMENT.PD ) ) {
        throw new ForbiddenError("Only PD can reset password");
    }

    if ( !checkGroup( requester, ROLE_GROUP.TEAMLEAD ) ) {
        throw new ForbiddenError("Only TEAMLEAD can reset password");
    }

    const { student_id } = ctx.body;

    const findRepository = new findByStudentIdRepository( ctx.bindings.db );

    const updateRepository = new updatePasswordRepository( ctx.bindings.db );

    const user = await findRepository.findByStudentId( student_id );

    if (!user) { throw new NotFoundError( "Student not found" ); }

    if (!user.is_active) { throw new ForbiddenError( "Account has been disabled" ); }

    const hashedPassword = await hashPassword( DEFAULT_PASSWORD );

    await updateRepository.updatePassword(
        user.user_id,
        hashedPassword,
        requester.user_id
    );

    return {
        user_id: user.user_id,
        student_id: user.student_id
    };
}