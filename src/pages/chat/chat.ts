import { AddChat, AddUserToChat, ChatDTO, ChatId, ChatMessage, ChatUser, SearchUser, UserDTO } from "../../api/types";
import { DialogList, InputSearch, ItemList, MessagesList, ModalAddChat, ModalAddUser, ModalUserList } from "../../components";
import { connect } from "../../globalFunction/utils/connect";
import Block from "../../parentClasses/Block/BLock";
import { PagesPaths } from "../../parentClasses/Router/pathEnum";
import { logout, userinfo } from "../../services/authorization";
import { addChat, addUser, closeChat, deleteChat, deleteUser, getChats, getChatUsers, openChat } from "../../services/chats";
import { searchUser } from "../../services/user";



export class ChatPage extends Block {
	chats: object[] | undefined;
	state: object | undefined | any;
	currentChat: ChatDTO | undefined;
	chatList: ChatDTO[] = [];
	messageQueue: ChatMessage[] = []; // Очередь сообщений
	batchingTimeout: NodeJS.Timeout | null = null; // Таймер для обработки сообщений

	initPublic() {
		const addChatBind = this.addChat.bind(this);
		const onClickChatBind = this.onClickChat.bind(this);
		const clickProfileBind = this.clickProfile.bind(this);
		const onLogoutBind = this.onLogout.bind(this);
		const clickAddChatBind = this.clickAddChat.bind(this);
		const clickAddUserInChatBind = this.clickAddUserInChat.bind(this);
		const addUserToChatBind = this.addUserToChat.bind(this);
		const clickUserInChatListBind = this.clickUserInChatList.bind(this);
		const deleteChatBind = this.onChatDelete.bind(this);
		this.chats = [];
		this.state = window.store.getState();
		this.props.chatList = [];
		this.props.messages = this.props.messages || [];

		const DialogListComponent = new DialogList({
			dialogs: this.props.chatList,
			onClick: onClickChatBind,
		});
		const InputSearchComponent = new InputSearch({
			placeholder: "Поиск",
		});
		const MessagesListComponent = new MessagesList({
			messages: [],
			currentUser: null,
		});
		const itemListLogoutComponent = new ItemList({
			title: "Logout",
			className: "header__menu-item",
			idItem: "logout",
			onClick: onLogoutBind,
		});
		const ItemListProfileComponent = new ItemList({
			title: "Profile",
			className: "header__menu-item",
			idItem: "profile",
			onClick: clickProfileBind,
		});
		const itemListAddChatComponent = new ItemList({
			title: "Add chat",
			className: "header__menu-item",
			idItem: "addChatBtn",
			onClick: clickAddChatBind,
		});
		const logoutItemComponent = new ItemList({ title: "Logout", className: "chat-settings__item", onClick: onLogoutBind });
		const addChatModalComponent = new ModalAddChat({
			titleModal: "Add new chat",
			onSubmit: addChatBind,
		});
		const addUserModalComponent = new ModalAddUser({
			titleModal: "Add new user",
			onSubmit: addUserToChatBind,
		});
		const addNewUserInChatComponent = new ItemList({
			title: "Add user",
			className: "chat-settings__item",
			idItem: "addUserInChat",
			onClick: clickAddUserInChatBind,
		});
		const userInChatItemComponent = new ItemList({
			title: "Users",
			className: "chat-settings__item",
			idItem: "usersInChat",
			onClick: clickUserInChatListBind,
		});
		const deleteChatItemComponent = new ItemList({
			title: "Delete chat",
			className: "chat-settings__item",
			idItem: "deleteChat",
			onClick: deleteChatBind,
		});
		const modalChatUserList = new ModalUserList({ list: [] });

		this.children = {
			...this.children,
			DialogListComponent,
			InputSearchComponent,
			MessagesListComponent,
			itemListLogoutComponent,
			ItemListProfileComponent,
			itemListAddChatComponent,
			addChatModalComponent,
			logoutItemComponent,
			addNewUserInChatComponent,
			addUserModalComponent,
			modalChatUserList,
			userInChatItemComponent,
			deleteChatItemComponent,
		};
	}
	// Подключение обработчика отправки сообщений

	beforeMount(): void {
		this.updateDialogsList();
		userinfo().then(response => {
			const data: UserDTO | any = response;
			window.store.set({ userId: data.id });
			this.state = window.store.getState();
		});
	}

	// Добавление чата
	addChat(e: Event) {
		e.preventDefault();
		e.stopPropagation();

		const target = e.target as HTMLFormElement;
		const form = target.form!;
		const formAddChat = document.querySelector("#addChat") as HTMLElement;
		if (formAddChat) formAddChat.style.display = "none";

		const output: AddChat = {
			title: form.querySelector("input").value,
		};

		addChat(output).then(() => {
			this.updateDialogsList();
		});
	}

	// Добавление пользователя в чат
	addUserToChat(e: Event) {
		e.preventDefault();

		const store = window.store.getState();
		const input = document.querySelector("#inputIdAddUser") as HTMLInputElement;
		const inputValue: SearchUser = { login: input.value };
		const users: number[] = [];
		let newUserId: number = 0;
		searchUser(inputValue).then((response: any) => {
			if (response[0].id) newUserId = response[0].id;
			if (newUserId) {
				users.push(newUserId);
				const chatId: number = +store.chatId;
				const data: AddUserToChat = {
					users,
					chatId,
				};
				console.log(users, chatId);
				addUser(data).then(response => {
					console.log(response);
					this.updateDialogsList();
				});
			}
		});
	}

	updateDialogsList() {
		getChats().then(response => {
			const data: ChatDTO[] = response as any;
			this.props.chatList = data;

			this.children.DialogListComponent.setProps({ dialogs: data });

			this.chats = data;
			const chatListArr = document.querySelectorAll(".dialog");

			if (chatListArr) {
				chatListArr.forEach(chat => {
					chat.removeEventListener("click", this.onClickChat.bind(this));
					chat.addEventListener("click", this.onClickChat.bind(this));
				});
			}
		});
	}

	updateDialogUserList() {
		const store = window.store.getState();
		const chat_id = +store.chatId;
		getChatUsers(chat_id).then(response => {
			const responseList: ChatUser[] = response as any;
			const data = responseList.filter((item: ChatUser) => item.id !== store.userId);
			this.children.modalChatUserList.setProps({ list: data });
			const list = document.querySelectorAll("#chat-user-list li .user-list__delete");
			list.forEach(item => {
				const element = item as HTMLElement;
				element.addEventListener("click", () => this.chatUserDelete(+element.dataset.id!));
			});
		});
	}

	chatUserDelete(user_id: number) {
		const store = window.store.getState();
		const data: AddUserToChat = {
			users: [user_id],
			chatId: +store.chatId,
		};
		deleteUser(data).then(() => {
			this.updateDialogUserList();
		});
	}
	onChatDelete() {
		const store = window.store.getState();
		const data: ChatId = {
			chatId: +store.chatId,
		};
		
		deleteChat(data).then(() => {
			window.store.set({ chatId: null });
			this.props.currentChat = null;
			this.children.MessagesListComponent.setProps({ messages: [] });
			this.updateDialogsList();
		});
	}

	onClickChat(e: Event) {
		e.stopPropagation();

		const elem = (e.target as HTMLElement).closest(".dialog") as HTMLElement;

		if (!elem) {
			console.log("Не найден элемент с классом .dialog");
			return;
		}
		if (!elem.dataset.id) return;

		const data = {
			chatId: elem.dataset.id,
			user: {
				id: this.state.userId,
			},
		};
		if (this.currentChat && this.currentChat.id !== Number(data.chatId)) {
			this.cleanupWebSocket();
		}
		//@ts-expect-error wft
		this.currentChat = this.props.chatList.find((chat: ChatDTO) => chat.id === Number(data.chatId));
		window.store.set({ chatId: elem.dataset.id });
		this.children.MessagesListComponent.setProps({ messages: [] });
		closeChat();
		openChat(data, (message: ChatMessage) => {
			this.onReceivedMessage(message);
		}).then(() => {
			if (Array.isArray(this.props.chatList)) {
				this.props.currentChat = this.props.chatList.find(item => item.id === +data.chatId);
				this.updateDialogUserList();
			}
		});
	}
	cleanupWebSocket() {
		if (this.batchingTimeout) {
			clearTimeout(this.batchingTimeout);
			this.batchingTimeout = null;
		}
		this.messageQueue = [];
	}

	// Буферизуем обработку сообщений
	onReceivedMessage(message: ChatMessage) {
		this.messageQueue.push(message);
		if (this.batchingTimeout) return;

		this.batchingTimeout = setTimeout(() => {
			this.batchingTimeout = null;
			this.processMessageBatch();
		}, 100);
	}

	// Обрабатываем сообщения из очереди
	processMessageBatch() {
		if (this.messageQueue.length === 0) return;

		const messages = [...(this.props.messages as ChatMessage[]), ...this.messageQueue];

		// this.messageQueue = [];
		messages.forEach((message: ChatMessage) => {
			if (message.time) {
				const date = new Date(message.time);
				message.time = date.toLocaleString("en-En", { hour12: false });
			}
		});
		// Сортируем по времени
		messages.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

		this.children.MessagesListComponent.setProps({
			messages,
			currentUser: this.state.userId,
		});

		const list = document.querySelector("#messages") as HTMLElement;
		const messageList = document.querySelector("#messages-list") as HTMLElement;
		if (list && messageList) {
			list.scrollTo(0, messageList.scrollHeight);
		}
	}

	// TODO?: требуется рефакторинг, т.к. повторяющиеся методы (пока не понимаю как универсальный метод получить)
	// Добавление чата
	clickAddChat() {
		const addChatBtn = document.querySelector("#addChatBtn") as HTMLElement;
		const addChatForm = document.querySelector("#addChat") as HTMLElement;
		if (!addChatBtn || !addChatForm) return;
		addChatBtn.addEventListener("click", () => {
			addChatForm.style.display = "block";
		});
	}
	// Добавление пользователей в чат
	clickAddUserInChat() {
		const addChatBtn = document.querySelector("#addUserInChat") as HTMLElement;
		const addChatForm = document.querySelector("#addUser") as HTMLElement;
		if (!addChatBtn || !addChatForm) return;
		addChatBtn.addEventListener("click", () => {
			addChatForm.style.display = "block";
		});
	}
	// Посмотреть юзеров в чате
	clickUserInChatList() {
		const userInChatForm = document.querySelector("#chat-user-list") as HTMLElement;
		const userInChatBtn = document.querySelector("#usersInChat") as HTMLElement;
		userInChatBtn.addEventListener("click", () => {
			userInChatForm.style.display = "block";
		});
	}
	// Переход на страницу профиля
	clickProfile() {
		window.router.go(PagesPaths.PROFILE);
	}
	// Выход из профиля
	onLogout() {
		logout();
	}

	renderPublic() {
		return `
		<main class='main main-chat'>
					<section class="main-chat__list">
						<header class='header header-chat'>
							<div class='header__menu'>
								<div class='header__menu-btn-container'>
									<div class='header__menu-btn'></div>
								</div>
								<div class='header__menu-content'>
									<ul class='header__menu-list'>
										{{{ itemListLogoutComponent }}}
										{{{ ItemListProfileComponent }}}
										{{{ itemListAddChatComponent }}}
									</ul>
								</div>
							</div>
							{{{ InputSearchComponent }}}
						</header>
						{{{ DialogListComponent }}}
					</section>
					<section class='main-chat__dialog'>
						{{{ PopUpComponent }}}
						<div class='main-chat__messages' id='messages'>
							{{{ MessagesListComponent }}}
						</div>
						<form onsubmit="return false;" class='main-chat__dialog-form'>
						<div class="chat-settings">
							<div class="chat-settings__btn-container">
								<div class="chat-settings__btn"></div>
							</div>
							<div class="chat-settings__modal">
								<ul class="chat-settings__list">
									{{{ logoutItemComponent }}}
									{{{ addNewUserInChatComponent }}}
									{{{ userInChatItemComponent }}}
									{{{ deleteChatItemComponent }}}
								</ul>
							</div>
						</div>
							<div class="message-input-container">
								<textarea class="message-input" placeholder="Написать сообщение..." name="message" id="message"></textarea>
								<button class="send-btn" aria-label="Send message" id="send-btn">➤</button>
							</div>
							
						</form>
					</section>
					{{{ addUserModalComponent }}}
					{{{ addChatModalComponent }}}
					{{{ modalChatUserList }}}
				</main>
	  `;
	}
}

const mapStateToPropsShort = ({ isLoading, errorMessage, chatId, massageStack }: { [key: string]: unknown }) => ({
	isLoading,
	errorMessage,
	chatId,
	massageStack,
});

export default connect(mapStateToPropsShort)(ChatPage);
