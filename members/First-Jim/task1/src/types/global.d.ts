interface Window {
	existLoading: boolean;
	lazy: NodeJS.Timer;
	unique: number;
	tokenRefreshing: boolean;
	requests: Function[];
	eventSource: EventSource;
}

// * Vite
declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
	VITE_API_URL: string;
	VITE_PORT: number;
	VITE_OPEN: boolean;
	VITE_GLOB_APP_TITLE: string;
	VITE_DROP_CONSOLE: boolean;
	VITE_PROXY_URL: string;
	VITE_BUILD_GZIP: boolean;
	VITE_REPORT: boolean;
}

interface ApiResponse<T = any> {
	code: number;
	data: T;
	message: string;
	time: number;
}

type ApiPromise<T = any> = Promise<ApiResponse<T>>;
