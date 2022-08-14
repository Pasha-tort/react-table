// export type Request = (url: string, method?: string, body?: BodyInit | null | undefined, headers?: {}) => Promise<any>;
export const getRequest = () => {

	const request = async (
		url: string,
		method = 'GET',
		body: BodyInit | null | undefined = null!,
		headers: {} = { 'Content-Type': 'application/json' }
	) => {
		try {
			const response = await fetch("http://localhost:3001/api" + url, { method, body, headers });
			if (!response.ok) {
				throw new Error(`Could not fetch ${url}, status: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (e) {
			throw e;
		}
	}

	return {
		request,
	}
}