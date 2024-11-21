// Объект, содержащий допустимые HTTP-методы
const METHODS = {
	GET: "GET",
	POST: "POST",
	PUT: "PUT",
	DELETE: "DELETE",
} as const;

// Тип, представляющий допустимые значения методов из объекта METHODS
type MethodType = (typeof METHODS)[keyof typeof METHODS];

// Интерфейс, описывающий возможные параметры запроса
interface RequestOptions {
	method?: MethodType;
	headers?: Record<string, string>;
	data?: FormData | Record<string, unknown> | string;
	timeout?: number;
}

// Функция для преобразования объекта в строку запроса (query string)
function queryStringify(data: Record<string, unknown>): string {
	const keys = Object.keys(data);
	return keys.reduce((result, key: string, index): string => {
		const value = data[key];
		const encodedValue = encodeURIComponent(value !== undefined ? String(value) : "");
		return `${result}${key}=${encodedValue}${index < keys.length - 1 ? "&" : ""}`;
	}, "?");
}

// Класс для выполнения HTTP-запросов
export class HTTPTransport {
	private apiUrlDomain: string = "https://ya-praktikum.tech";
	apiUrl: string;
	constructor(apiPath: string) {
		this.apiUrl = `${this.apiUrlDomain}${apiPath}`;
		console.log(this.apiUrl);
	}
	// Метод для выполнения GET-запроса
	get = (url: string, options: RequestOptions = {}) => {
		console.log(`options ${JSON.stringify(options)}`);

		return this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.GET }, options.timeout);
	};

	// Метод для выполнения POST-запроса
	post = (url: string, options: RequestOptions = {}) => {
		console.log(
			`${this.apiUrl}${url}  
			...options, method: METHODS.POST ${JSON.stringify({ ...options, method: METHODS.POST })} options.timeout ${options.timeout}
			options ${JSON.stringify(options.data)}
			`
		);
		// const dataJson = JSON.stringify(options.data);
		return this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.POST }, options.timeout);
	};

	// Метод для выполнения PUT-запроса
	put = (url: string, options: RequestOptions = {}) => {
		return this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.PUT }, options.timeout);
	};

	// Метод для выполнения DELETE-запроса
	delete = (url: string, options: RequestOptions = {}) => {
		return this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.DELETE }, options.timeout);
	};

	// Метод для выполнения HTTP-запроса
	request = (url: string, options: RequestOptions = {}, timeout = 5000): Promise<XMLHttpRequest> => {
		const { headers = {}, method, data } = options;
		console.log(`options ${JSON.stringify(options)} data ${JSON.stringify(data)}`);

		return new Promise<XMLHttpRequest>((resolve, reject) => {
			// Проверяем, указан ли метод
			if (!method) {
				reject(new Error("No method provided"));
				return;
			}

			const xhr = new XMLHttpRequest();
			const isGet = method === METHODS.GET;

			// Если метод GET и данные есть, добавляем query string
			if (isGet && data && typeof data === "object" && !(data instanceof FormData)) {
				url += queryStringify(data as Record<string, unknown>);
			}

			// Открываем соединение
			xhr.open(method, url);
			xhr.withCredentials = true;

			if (data instanceof FormData) {
				delete headers["Content-Type"];
			} else {
				headers["Content-Type"] = headers["Content-Type"] || "application/json;charset=UTF-8";
				// Устанавливаем заголовки запроса
				Object.keys(headers).forEach(key => {
					xhr.setRequestHeader(key, headers[key]);
				});
			}

			// Устанавливаем обработчик на событие завершения загрузки
			xhr.onload = function () {
				console.log(`this.status ${this.status}`);

				if (this.status >= 200 && this.status < 300) {
					// Проверка на тип ответа, чтобы избежать экранирования бинарных данных
					if (xhr.getResponseHeader("Content-Type")?.includes("application/json")) {
						const data = JSON.parse(this.response);
						console.log(`data 98 ${JSON.stringify(data)}`);
						resolve(data);
					} else {
						console.log(`this.response 102 ${this.response}`);
						resolve(this.response);
					}
				} else {
					console.log(`this.response 106 ${this.response}`);
					if (this.response) {
						console.log(`this.response 108 ${this.response}`);
						reject(JSON.parse(this.response));
					} else {
						reject(new Error(`Request failed with status ${xhr.status}: ${xhr.statusText}`));
					}
				}
			};

			// Обработчики на события ошибки, прерывания и таймаута
			xhr.onabort = () => reject(new Error("Request aborted"));
			xhr.onerror = () => reject(new Error("Request failed"));
			xhr.ontimeout = () => reject(new Error("Request timed out"));

			xhr.timeout = timeout;

			// Отправляем запрос
			if (isGet || !data) {
				xhr.send();
			} else if (data instanceof FormData) {
				xhr.send(data);
			} else {
				xhr.send(JSON.stringify(data));
			}
		});
	};
}
