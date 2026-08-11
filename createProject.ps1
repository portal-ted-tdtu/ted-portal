# ==========================================
# Cloudflare Worker + D1 Backend Scaffold
# Advanced Modular Architecture
# ==========================================

$moduleNames = @(
    "auth",
    "users",
    "events",
    "departments",
    "faculties",
    "generations",
    "roles",
    "mistakes",
    "schoolYears",
    "eventTypes",
    "eventStatus"
)

# ===================================================
# CORE FOLDERS
# ===================================================

$dirs = @(
    "src",

    "src/app",

    "src/database",

    "src/middleware",

    "src/repositories",

    "src/shared",
    "src/shared/constants",
    "src/shared/enums",
    "src/shared/responses",
    "src/shared/errors",

    "src/utils",
    "src/utils/validators",

    "src/modules"
)

foreach ($module in $moduleNames) {

    $dirs += @(
        "src/modules/$module",

        "src/modules/$module/services",
        "src/modules/$module/requests",
        "src/modules/$module/responses",
        "src/modules/$module/models",
        "src/modules/$module/validations"
    )
}

foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
}

# ===================================================
# CORE FILES
# ===================================================

$files = @(

    "src/index.js",

    "src/app/router.js",
    "src/app/middleware.js",
    "src/app/bindings.js",

    "src/database/d1.js",
    "src/database/query.js",
    "src/database/transaction.js",

    "src/middleware/authMiddleware.js",
    "src/middleware/roleMiddleware.js",
    "src/middleware/loggerMiddleware.js",
    "src/middleware/errorMiddleware.js",

    "src/repositories/UserRepository.js",
    "src/repositories/EventRepository.js",
    "src/repositories/DepartmentRepository.js",
    "src/repositories/FacultyRepository.js",
    "src/repositories/GenerationRepository.js",
    "src/repositories/RoleRepository.js",
    "src/repositories/MistakeRepository.js",
    "src/repositories/SchoolYearRepository.js",
    "src/repositories/EventTypeRepository.js",
    "src/repositories/EventStatusRepository.js",

    "src/shared/constants/roles.js",
    "src/shared/constants/eventStatus.js",
    "src/shared/constants/eventTypes.js",

    "src/shared/enums/systemEnum.js",

    "src/shared/responses/success.js",
    "src/shared/responses/error.js",
    "src/shared/responses/paging.js",

    "src/shared/errors/AppError.js",
    "src/shared/errors/ValidationError.js",
    "src/shared/errors/UnauthorizedError.js",
    "src/shared/errors/ForbiddenError.js",
    "src/shared/errors/NotFoundError.js",

    "src/utils/date.js",
    "src/utils/crypto.js",
    "src/utils/jwt.js",
    "src/utils/pagination.js",
    "src/utils/string.js",
    "src/utils/uuid.js",

    "src/utils/validators/emailValidator.js",
    "src/utils/validators/phoneValidator.js",
    "src/utils/validators/dateValidator.js",
    "src/utils/validators/passwordValidator.js",
    "src/utils/validators/uuidValidator.js"
)

# ===================================================
# MODULE FILES
# ===================================================

foreach ($module in $moduleNames) {

    $moduleName = $module.TrimEnd("s")

    $files += @(
        "src/modules/$module/$moduleName.router.js"
    )

    New-Item `
        -ItemType File `
        -Path "src/modules/$module/services/.gitkeep" `
        -Force | Out-Null

    New-Item `
        -ItemType File `
        -Path "src/modules/$module/requests/.gitkeep" `
        -Force | Out-Null

    New-Item `
        -ItemType File `
        -Path "src/modules/$module/responses/.gitkeep" `
        -Force | Out-Null

    New-Item `
        -ItemType File `
        -Path "src/modules/$module/models/.gitkeep" `
        -Force | Out-Null

    New-Item `
        -ItemType File `
        -Path "src/modules/$module/validations/.gitkeep" `
        -Force | Out-Null
}

foreach ($file in $files) {

    if (-not (Test-Path $file)) {

        New-Item `
            -ItemType File `
            -Path $file `
            -Force | Out-Null
    }
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Green
Write-Host " Cloudflare Worker Architecture Created "
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Modules : $($moduleNames.Count)"
Write-Host "Folders : $($dirs.Count)"
Write-Host "Files   : $($files.Count)"
Write-Host ""