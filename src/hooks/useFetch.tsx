import { useCallback, useState } from "react";

export type Request = (url: string, method?: string, body?: BodyInit | null | undefined, headers?: {}) => Promise<any>;


export const useHttp = () => {
	const [process, setProcess] = useState('waiting');

	const request = useCallback(
		async (
			url: string,
			method = 'GET',
			body: BodyInit | null | undefined = null!,
			headers: {} = { 'Content-Type': 'application/json' }
		) => {

			setProcess('loading');

			try {
				const response = await fetch(url, { method, body, headers });
				console.log(response)
				if (!response.ok) {
					throw new Error(`Could not fetch ${url}, status: ${response.status}`);
				}

				const data = await response.json();

				return data;
			} catch (e) {
				setProcess('error');
				throw e;
			}
		}, []);

	const clearError = useCallback(() => {
		setProcess('loading');
	}, []);

	return {
		request,
		clearError,
		process,
		setProcess
	}
}