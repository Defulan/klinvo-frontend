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
