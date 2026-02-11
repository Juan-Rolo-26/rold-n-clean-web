const RAW_API_BASE_URL = import.meta.env.VITE_API_URL
    || (import.meta.env.DEV ? 'http://localhost:3001' : '');

const normalizeBaseUrl = (url: string) => url.replace(/\/+$/, '');
const normalizePath = (path: string) => (path.startsWith('/') ? path : `/${path}`);

export const API_BASE_URL = normalizeBaseUrl(RAW_API_BASE_URL);

const apiBaseWithPrefix = API_BASE_URL
    ? (API_BASE_URL.endsWith('/api') ? API_BASE_URL : `${API_BASE_URL}/api`)
    : '';

export const buildApiUrl = (path: string) => {
    const normalizedPath = normalizePath(path);

    if (!apiBaseWithPrefix) {
        return normalizedPath.startsWith('/api')
            ? normalizedPath
            : `/api${normalizedPath}`;
    }

    const pathWithoutApi = normalizedPath.startsWith('/api')
        ? normalizedPath.slice(4)
        : normalizedPath;

    return `${apiBaseWithPrefix}${pathWithoutApi}`;
};

export const postApiJson = (path: string, body: unknown, init: RequestInit = {}) => {
    const headers = new Headers(init.headers);
    if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }

    return fetch(buildApiUrl(path), {
        ...init,
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    });
};
