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

export interface Message {
	text: string
	to: string
	from: string
	chatId: string
}
