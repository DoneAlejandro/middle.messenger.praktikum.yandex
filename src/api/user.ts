import { HTTPTransport } from "../requests/requests";
import { SearchUser, UpdateUserData, UpdateUserPassword } from "./types";

export class UserApi {
	private userApiInstance: HTTPTransport;

	constructor() {
		this.userApiInstance = new HTTPTransport("/api/v2/user");
	}

	async update(data: UpdateUserData) {
		return this.userApiInstance.put("/profile", {
			data,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	async changePassword(data: UpdateUserPassword) {
		return this.userApiInstance.put("/password", {
			data,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	async searchUser(data: SearchUser) {
		return this.userApiInstance.post("/search", {
			data,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	async uploadAvatar(data: FormData) {
		return this.userApiInstance.put("/profile/avatar", {
			data,
		});
	}
}
