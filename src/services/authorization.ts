import { AuthApi } from "../api/auth";
import { LoginRequestData, SignUpRequestData } from "../api/types";
import { PagesPaths } from "../parentClasses/Router/pathEnum";

const authApi = new AuthApi();

export const login = async (model: LoginRequestData) => {
	window.store.set({ isLoading: true });
	try {
		await authApi.login(model);
		window.router.go(PagesPaths.CHAT);
		window.store.set({ errorMessage: null });
	} catch (error: any) {
		if (error.reason === "User already in system") {
			window.router.go(PagesPaths.CHAT);
			return;
		}
		window.store.set({ errorMessage: error.reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const signup = async (model: SignUpRequestData) => {
	window.store.set({ isLoading: true });
	try {
		await authApi.signup(model);
		window.router.go(PagesPaths.CHAT);
		window.store.set({ errorMessage: null });
	} catch (error: any) {
		window.store.set({ errorMessage: error.reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const logout = async () => {
	window.store.set({ isLoading: true });
	try {
		await authApi.logout();
		window.router.go(PagesPaths.SIGNIN);
		window.store.set({ errorMessage: null });
	} catch (error: any) {
		window.store.set({ errorMessage: error.reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const userinfo = async () => {
	window.store.set({ isLoading: true });
	const data = await authApi.userinfo();
	console.log(`data 53 ${JSON.stringify(data)}`);

	try {
		const data = await authApi.userinfo();
		window.store.set({ errorMessage: null });
		console.log(`data 55 ${JSON.stringify(data)}`);
		return data;
	} catch (error: any) {
		window.store.set({ errorMessage: error.reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};
