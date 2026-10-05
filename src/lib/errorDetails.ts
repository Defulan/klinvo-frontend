const ERROR_MAP = {
	WRONG_LOGIN_DATA: "wrongLoginData",
	WRONG_REGISTER_DATA: "wrongRegisterData",
	UNAUTHORIZED: "unauthorized",
	AUTHORIZED: "authorized",
	USER_DOESNT_EXIST: "userDoesntExist",
	INVALID_COOKIE_VALUE: "invalidCookieValue",
	LANGUAGE_DOESNT_EXIST: "languageDoesntExist",
	NO_PERMISSIONS: "noPermissions",
	NOTE_DOESNT_EXIST: "noteDoesntExist",

	VALIDATION_ERROR: "validationError",
	UNEXPECTED: "unexpected",
} as const;

type ErrorCode = keyof typeof ERROR_MAP;

const isErrorCode = (code: unknown): code is ErrorCode => {
	return typeof code === "string" && code in ERROR_MAP;
};

export const getErrorDetails = (error: unknown): string => {
	const errorCode = (error as { response?: { data?: { detail?: unknown } } })?.response?.data?.detail;

	if (Array.isArray(errorCode)) {
		return `errors.${ERROR_MAP.VALIDATION_ERROR}`;
	}

	if (isErrorCode(errorCode)) {
		return `errors.${ERROR_MAP[errorCode]}`;
	}

	return `errors.${ERROR_MAP.UNEXPECTED}`;
};
