import type { User } from "./user";

export interface Language {
	id: number;
	author: User;
	name: string;
	createdAt: Date;
	isPrivate: boolean;
}
