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

		return new Promise<XMLHttpRequest>((resolve, reject) => {
			// Проверяем, указан ли метод
			if (!method) {
				reject(new Error("No method provided"));
				return;
			}

			const xhr = new XMLHttpRequest();
			const isGet = method === METHODS.GET;

			// Открываем соединение
			xhr.open(method, isGet && !!data ? `${url}${queryStringify(data as Record<string, unknown>)}` : url);

			// Устанавливаем заголовки запроса
			Object.keys(headers).forEach(key => {
				xhr.setRequestHeader(key, headers[key]);
			});

			// Устанавливаем обработчик на событие завершения загрузки
			xhr.onload = function () {
				if (xhr.status >= 200 && xhr.status < 300) {
					let responseText = xhr.responseText;

					// Проверка на тип ответа, чтобы избежать экранирования бинарных данных
					if (xhr.getResponseHeader("Content-Type")?.includes("application/json")) {
						try {
							// Парсим JSON и экранируем строки в ответе
							const responseJSON = JSON.parse(responseText);
							responseText = JSON.stringify(responseJSON);
						} catch (error) {
							console.error("Failed to parse JSON response", error);
						}
					}
					resolve(xhr);
				} else {
					// Если статус ответа не в диапазоне 200-299, возвращаем ошибку
					reject(new Error(`Request failed with status ${xhr.status}: ${xhr.statusText}`));
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
			} else if (typeof data === "string") {
				xhr.send(data);
			} else {
				console.log(`JSON.stringify(data.data): ${JSON.stringify(data)}`);

				xhr.send(JSON.stringify(data));
			}
		});
	};
}
