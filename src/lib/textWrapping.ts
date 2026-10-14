export const getSelected = (textArea: HTMLTextAreaElement) => {
	const start = textArea.selectionStart;
	const end = textArea.selectionEnd;

	return textArea.value.substring(start, end);
};
