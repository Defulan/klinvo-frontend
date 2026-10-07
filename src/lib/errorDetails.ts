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

	UNEXPECTED: "unexpected",
} as const;

const VALIDATION_ERROR_MAP = {
	missing: "missing",
	int_type: "intType",
	string_type: "stringType",
	string_too_short: "stringTooShort",
	string_too_long: "stringTooLong",
	bool_type: "boolType",
	datetime_type: "datetimeType",
	value_error: "valueError",
};

type ErrorCode = keyof typeof ERROR_MAP;
type ValidationErrorCode = keyof typeof VALIDATION_ERROR_MAP;

interface APIError {
	response: {
		data: {
			detail: string | Record<string, unknown>[];
		};
		status: number;
	};
}

const isAPIError = (error: unknown): error is APIError => {
	if (error === null || typeof error !== "object") return false;

	const err = error as Record<string, unknown>;
	if (err.response === null || typeof err.response !== "object") return false;

	const errResponse = err.response as Record<string, unknown>;
	return typeof errResponse.status === "number" && "data" in errResponse;
};

const isErrorCode = (code: unknown): code is ErrorCode => {
	return typeof code === "string" && code in ERROR_MAP;
};

const isValidationErrorCode = (code: unknown): code is ValidationErrorCode => {
	return typeof code === "string" && code in VALIDATION_ERROR_MAP;
};

export const getErrorDetails = (error: unknown): string => {
	if (!isAPIError(error)) return `errors.${ERROR_MAP.UNEXPECTED}`;

	const { data, status } = error.response;
	const errorDetail = data.detail;

	if (isErrorCode(errorDetail)) {
		return `errors.${ERROR_MAP[errorDetail]}`;
	}

	if (status === 422 && Array.isArray(errorDetail)) {
		if (errorDetail.length > 0 && errorDetail[0]?.type) {
			let errorType = errorDetail[0].type;

			if (isValidationErrorCode(errorType)) {
				if (errorType === "value_error") {
					const errorMessage = errorDetail[0].msg;
					if (isErrorCode(errorMessage)) return `errors.${ERROR_MAP[errorMessage]}`;
				}

				if (errorType.endsWith("_parsing")) {
					errorType = errorType.replace("_parsing", "_type");
					if (!isValidationErrorCode(errorType)) throw new Error("Problem of unrefactored code");
				}
				return `validationErrors.${VALIDATION_ERROR_MAP[errorType]}`;
			}
		}
	}

	return `errors.${ERROR_MAP.UNEXPECTED}`;
};
