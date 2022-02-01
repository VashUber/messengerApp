export type nullableString = null | string
export type vAsideItem = Array<string>
export interface User {
	name: string
	email: string
}

export interface Chat {
	firstUser: string
	secondUser: string
	chatId: string
}
