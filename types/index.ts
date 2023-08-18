// Games
export interface Game {
	name: string
	img: string
	type: "played by us" | "upcoming" | "default"
	minInvest: number
	apy: number
	apyUSD: number
	players: number
	releaseDate: string
	payback: number
	id: string
}
