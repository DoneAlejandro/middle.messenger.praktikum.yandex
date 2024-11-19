import { HTTPTransport } from '../requests/requests';
import { LoginRequestData, SignUpRequestData } from './types';

export class AuthApi {
	private authApiInstance: HTTPTransport;

	constructor() {
		this.authApiInstance = new HTTPTransport('/api/v2/auth');
	}

	async login(data: LoginRequestData) {
		console.log(`data AuthApi ${JSON.stringify(data)}`);
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
