const WRAP_VALUES: Record<string, string | [string, string, string]> = {
	"(": ["(", "(", ")"],
	"{": ["{", "{", "}"],
	"<": ["<", "<", ">"],
	"[": ["[", "[", "]"],
	"*": "*",
	_: "_", // key _ instead of "_" because of specifics of TypeScript, but key is still working as "_"
	"`": "`",
	"'": "'",
	'"': '"',
	"~": "~",
} as const;

export const getWrapValue = (key: string): string | [string, string, string] => WRAP_VALUES[key];

export const getSelected = (textArea: HTMLTextAreaElement) => {
	const start = textArea.selectionStart;
	const end = textArea.selectionEnd;

	return textArea.value.substring(start, end);
};

export const wrapSelectedText = (
	textArea: HTMLTextAreaElement,
	key: string,
	before: string | null = null,
	after: string | null = null,
) => {
	if (!before) before = key;
	if (!after) after = before;

	const start = textArea.selectionStart;
	const end = textArea.selectionEnd;
	const selected = getSelected(textArea);

	const replacement = `${before}${selected}${after}`;
	const cursorPositionEndAdd = before.length + after.length;

	textArea.setRangeText(replacement, start, end, "preserve");

	setTimeout(() => {
		textArea.focus();
		textArea.setSelectionRange(start, end + cursorPositionEndAdd);
	});
};
