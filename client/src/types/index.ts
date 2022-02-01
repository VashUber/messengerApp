export type nullableString = null | string
export interface User {
	name: string
	email: string
}

export interface Chat {
	firstUser: User
	secondUser: User
	chatId: string
}
