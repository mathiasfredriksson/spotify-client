export interface IArtist {
	name: string,
	id: string,
	image: string,
	albums: [IAlbum]
}

export interface IAlbum {
	name: string,
	id: string,
	image: string,
	tracks: [ITrack]
}

export interface ITrack {
	name: string,
	artists: [IArtist],
	preview_url: string,
	id: string
}

export interface IUser {
	id: string,
	username: string
}