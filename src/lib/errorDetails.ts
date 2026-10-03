const ERROR_MAP = {
	WRONG_LOGIN_DATA: "Введён неправильный ID или пароль",
	WRONG_REGISTER_DATA: "Пароль и повторённый пароль не совпадают",
	UNAUTHORIZED: "Вы не авторизированы",
	AUTHORIZED: "Вы уже авторизированы",
	USER_DOESNT_EXIST: "Такого пользователя нет",
	INVALID_COOKIE_VALUE: "Неправильное значение в cookie",
	LANGUAGE_DOESNT_EXIST: "Такого языка не найдено",
	NO_PERMISSIONS: "У вас нет прав на совершение этого действия",
	NOTE_DOESNT_EXIST: "Данной заметки не существует",

	VALIDATION_ERROR: "В одном из полей неправильно введены данные",
	UNEXPECTED: "Неизвестная ошибка ._.",
} as const;

type ErrorCode = keyof typeof ERROR_MAP;

const isErrorCode = (code: unknown): code is ErrorCode => {
	return typeof code === "string" && code in ERROR_MAP;
};

export const getErrorDetails = (error: unknown): string => {
	const errorCode = (error as { response?: { data?: { detail?: unknown } } })?.response?.data?.detail;

	if (Array.isArray(errorCode)) {
		return ERROR_MAP.VALIDATION_ERROR;
	}

	if (isErrorCode(errorCode)) {
		return ERROR_MAP[errorCode];
	}

	return ERROR_MAP.UNEXPECTED;
};
