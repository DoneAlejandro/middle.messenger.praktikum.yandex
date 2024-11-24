import { ChatApi } from "../api/chat";
import { AddChat, AddUserToChat, ChatId, OpenChatData } from "../api/types";

const chatApi = new ChatApi();

export const getChats = async () => {
	window.store.set({ isLoading: true });
	try {
		const response = await chatApi.getChats();
		return response;
	} catch (error: any) {
		window.store.set({ errorMessage: error.reason });
		throw error;
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const addChat = async (model: AddChat) => {
	window.store.set({ isLoading: true });
	try {
		await chatApi.addChat(model);
		window.store.set({ popoverIsOpen: "" });
	} catch (error: any) {
		window.store.set({ errorMessage: error.reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const updateChatAvatar = async (model: FormData) => {
	try {
		return await chatApi.updateChatAvatar(model);
	} catch (error: any) {
		console.log(error);
		window.store.set({ errorMessage: error.reason });
	}
};

export const addUser = async (model: AddUserToChat) => {
	try {
		await chatApi.addUser(model);
	} catch (error: any) {
		console.log(error);
	}
};

export const deleteUser = async (model: AddUserToChat) => {
	try {
		await chatApi.deleteUser(model);
	} catch (error: any) {
		console.log(error);
	}
};

export const deleteChat = async (model: ChatId) => {
	try {
		await chatApi.deleteChat(model);
	} catch (error: any) {
		console.log(error);
	}
};

export const getChatUsers = async (chat_id: number) => {
	try {
		return await chatApi.getChatUsers(chat_id);
	} catch (error: any) {
		console.log(error);
	}
};

export const openChat = async (model: OpenChatData, callback: Function) => {
	console.log(`73 openChat data ${JSON.stringify(model)}`);
	window.store.set({ isLoading: true });
	try {
		console.log(`try 76 openChat data ${JSON.stringify(model)}`)
		await chatApi.openChat(model, callback);
		window.store.set({ popoverIsOpen: "" });
	} catch (error: any) {
		window.store.set({ errorMessage: error.reason, popoverIsOpen: "addchat" });
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const closeChat = async () => {
	try {
		return chatApi.closeChat();
	} catch (error: any) {
		window.store.set({ errorMessage: error.reason, popoverIsOpen: "addchat" });
	}
};
