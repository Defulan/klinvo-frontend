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
} as const;

type ErrorCode = keyof typeof ERROR_MAP;
type ValidationErrorCode = keyof typeof VALIDATION_ERROR_MAP;

interface ValidationErrorDetail {
	type: string;
	msg: string;
	loc?: (string | number)[];
	ctx?: Record<string, unknown>;
}

interface StandardError {
	response: {
		data: {
			detail: string;
		};
		status: number;
	};
}

interface ValidationError {
	response: {
		data: {
			detail: [ValidationErrorDetail, ...ValidationErrorDetail[]];
		};
		status: 422;
	};
}

type APIError = StandardError | ValidationError;

const isAPIError = (error: unknown): error is APIError => {
	if (error === null || typeof error !== "object") return false;

	const err = error as Record<string, unknown>;
	if (err.response === null || typeof err.response !== "object") return false;

	const errResponse = err.response as Record<string, unknown>;
	return typeof errResponse.status === "number" && "data" in errResponse;
};

const isStandardError = (error: APIError): error is StandardError => {
	return typeof error.response.data.detail === "string";
};

const isValidationError = (error: APIError): error is ValidationError => {
	if (error.response.status !== 422) return false;

	const detail = error.response.data.detail;
	if (!Array.isArray(detail) || detail.length === 0) return false;

	const firstError = detail[0];
	return typeof firstError?.type === "string" && typeof firstError?.msg === "string";
};

const isErrorCode = (code: unknown): code is ErrorCode => {
	return typeof code === "string" && code in ERROR_MAP;
};

const isValidationErrorCode = (code: unknown): code is ValidationErrorCode => {
	return typeof code === "string" && code in VALIDATION_ERROR_MAP;
};

export const getErrorDetails = (error: unknown): string => {
	if (!isAPIError(error)) return `errors.${ERROR_MAP.UNEXPECTED}`;

	if (isStandardError(error)) {
		const errorDetail = error.response.data.detail;
		if (isErrorCode(errorDetail)) {
			return `errors.${ERROR_MAP[errorDetail]}`;
		}
	}

	if (isValidationError(error)) {
		const errorDetail = error.response.data.detail;
		const firstError = errorDetail[0];

		let errorType = firstError.type;
		if (errorType.endsWith("_parsing")) {
			errorType = errorType.replace("_parsing", "_type");
		}

		if (isValidationErrorCode(errorType)) {
			if (errorType === "value_error") {
				const errorMessage = firstError.msg;
				if (isErrorCode(errorMessage)) {
					return `errors.${ERROR_MAP[errorMessage]}`;
				}
			}
			return `validationErrors.${VALIDATION_ERROR_MAP[errorType]}`;
		}
	}

	return `errors.${ERROR_MAP.UNEXPECTED}`;
};
