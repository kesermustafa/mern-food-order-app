export const HTTP_CODES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    NOT_MODIFIED: 304,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    TIMED_OUT: 408,
    CONFLICT: 409,
    GONE: 410,
    UNSUPPORTED_MEDIA_TYPE: 415,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INT_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
};

export const MESSAGE = {
    CONFLICT_CATEGORY: "There is a category registered with this name",
    CONFLICT_PRODUCT: "There is a product registered with this name",
    CONFLICT_ROLE: "There is a role registered with this name",
    CONFLICT_EMAIL: "There is a email registered with this name",
    NOT_EMPTY: "Name fields must be filled",
    ID_NOT_FOUND: "No record found for this ID",
    SERVER_NOT_FOUND: "Server Not Found",
    DATA_NOT_FOUND: "An error occurred while fetching foods.",
    CREATED_ERROR: "An error occurred while creating",
    ID_INVALID_ERROR: "Invalid ID format",
    NOT_FOUND_DATA: "No data matching your search criteria was found.",
    DELETE_ERROR: "An error occurred while deleting",
    DELETE_SUCCESSFUL: "Delete operation was successful",
    CREATE_ERROR: "An error occurred while creating",
    CREATE_SUCCESSFUL: "Record operation was successful",
    UPDATE_ERROR: "An error occurred while updating",
    UPDATE_SUCCESSFUL: "Record operation was successful",
    NOT_FOUND_USER: "Kullanıcı bulunamadı.",
    INVALID_CREDENTIALS: "Email veya şifre hatalı.",
    SERVER_ERROR: "Sunucu hatası.",
};

export const USER_ROLES = {
    ADMIN: "ADMIN",
    SUPER_ADMIN: "SUPER_ADMIN",
    SUPER_USER: "SUPER_USER",
    USER: "USER",
    CUSTOMER: "CUSTOMER",
};

export const PASSWORD_VALID = {
    PASS_LENGTH: 8
};

export const LOG_LEVELS = {
    INFO: "INFO",
    WARN: "WARNING",
    ERROR: "ERROR",
    DEBUG: "DEBUG",
    VERBOSE: "VERBOSE",
    HTTP: "HTTP",
    INVALID: "INVALID",
}

