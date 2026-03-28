export interface LoginData {
	email: string;
	password: string;
	user_agent: string;
}

export function useAuthApi() {
	const baseUrl = '';
	return {
		login: (data: LoginData) =>
			$fetch(`${baseUrl}/users/login/credentials`, {
				method: 'POST',
				body: data,
			}),
	};
}
