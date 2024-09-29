import { HTTPTransport } from '../requests/requests';
import { LoginRequestData, SignUpRequestData } from './types';

// const authApi = new HTTPTransport('/auth');

// const delay = (showError) => new Promise((resolve, reject) => {
//     if(showError) {
//         setTimeout(() => reject(), 2000)
//     } else {
//         setTimeout(() => resolve(), 3000)
//     }
// })

// export default class AuthApi {
//     async create(data: CreateUser): Promise<SignUpResponse> {
//         return authApi.post<SignUpResponse>('/signup', {data})
//     }

//     async login(data: LoginRequestData): Promise<void | APIError> {
//         // return authApi.post('/signin', {data});
//         return await delay(data.login === 'httperror')
//     }

//     async me(): Promise<UserDTO | APIError> {
//         return authApi.get('/user');
//     }

//     async logout(): Promise<void | APIError> {
//         return authApi.post('/logout')
//     }
// }

export class AuthApi {
	private authApiInstance: HTTPTransport;

	constructor() {
		this.authApiInstance = new HTTPTransport('/api/v2/auth');
	}

	async login(data: LoginRequestData) {
		return this.authApiInstance.post('/signin', {
			data,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	async signup(data: SignUpRequestData) {
		return this.authApiInstance.post('/signup', {
			data,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	async logout() {
		return this.authApiInstance.post('/logout');
	}

	async userinfo() {
		return this.authApiInstance.get('/user');
	}
}
