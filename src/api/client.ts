export async function get<T>(path: string, params?: Record<string, string>): Promise<T> {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
  const API_KEY = import.meta.env.VITE_API_KEY as string;

  const url = new URL(`${BASE_URL}${path}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        url.searchParams.set(key, value);
      }
    });
  }

  const response = await fetch(url.toString(), {
    headers: { 'x-api-key': API_KEY },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  return JSON.parse(JSON.stringify(data).replaceAll('http://', 'https://')) as T;
}
