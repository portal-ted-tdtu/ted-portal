# LUỒNG DỮ HOẠT ĐỘNG

Request
↓
index.js
↓
createContext()
↓
getBody()
↓
getQuery()
↓
getParams()
↓
Public/Auth Route ?
↓
YES → Router
NO
↓
AuthMiddleware
↓
Validate JWT
↓
Decode JWT
↓
ctx.user
↓
Router
↓
Module Router
↓
Validation
↓
Service
↓
Repository
↓
D1
↓
Response

# KIẾN TRÚC HỆ THỐNG

├───app
├───database
├───middlewares
├───modules
│ ├───auth
│ │ ├───models
│ │ ├───repositories
│ │ ├───requests
│ │ ├───responses
│ │ ├───routers
│ │ ├───services
│ │ └───validations
│ ├───departments
│ │ ├───models
│ │ ├───repositories
│ │ ├───requests
│ │ ├───responses
│ │ ├───routers
│ │ ├───services
│ │ └───validations
│ ├───events
│ │ ├───models
│ │ ├───repositories
│ │ ├───requests
│ │ ├───responses
│ │ ├───routers
│ │ ├───services
│ │ └───validations
│ ├───eventStatus
│ │ ├───models
│ │ ├───repositories
│ │ ├───requests
│ │ ├───responses
│ │ ├───routers
│ │ ├───services
│ │ └───validations
│ ├───eventTypes
│ │ ├───models
│ │ ├───repositories
│ │ ├───requests
│ │ ├───responses
│ │ ├───routers
│ │ ├───services
│ │ └───validations
│ ├───faculties
│ │ ├───models
│ │ ├───repositories
│ │ ├───requests
│ │ ├───responses
│ │ ├───routers
│ │ ├───services
│ │ └───validations
│ ├───generations
│ │ ├───models
│ │ ├───repositories
│ │ ├───requests
│ │ ├───responses
│ │ ├───routers
│ │ ├───services
│ │ └───validations
│ ├───mistakes
│ │ ├───models
│ │ ├───repositories
│ │ ├───requests
│ │ ├───responses
│ │ ├───routers
│ │ ├───services
│ │ └───validations
│ ├───roles
│ │ ├───models
│ │ ├───repositories
│ │ ├───requests
│ │ ├───responses
│ │ ├───routers
│ │ ├───services
│ │ └───validations
│ ├───schoolYears
│ │ ├───models
│ │ ├───repositories
│ │ ├───requests
│ │ ├───responses
│ │ ├───routers
│ │ ├───services
│ │ └───validations
│ └───users
│ ├───models
│ ├───repositories
│ ├───requests
│ ├───responses
│ ├───routers
│ ├───services
│ └───validations
├───repositories
├───shared
│ ├───constants
│ ├───enums
│ ├───errors
│ └───responses
└───utils
├───tokens
└───validators
