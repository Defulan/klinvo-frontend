export interface Note {
	id: number;
	languageId: number;
	title: string;
	content: string | null;
	createdAt: Date;
}
