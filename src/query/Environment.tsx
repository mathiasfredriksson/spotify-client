interface Environment {
	serverUrl: string
}

export const environment: Environment = {
	serverUrl: process.env.REACT_APP_SERVER_URL || ''
};