import { AddChat, AddUserToChat, ChatDTO, ChatMessage, ChatUser, UserDTO } from "../../api/types";
import { DialogList, InputSearch, ItemList, MessagesList } from "../../components";
import { connect } from "../../globalFunction/utils/connect";
import Block from "../../parentClasses/Block/BLock";
import { PagesPaths } from "../../parentClasses/Router/pathEnum";
import { logout, userinfo } from "../../services/authorization";
import { addChat, getChats, getChatUsers, openChat } from "../../services/chats";

export class ChatPage extends Block {
	chats: object[] | undefined;
	state: object | undefined | any;
	currentChat: ChatDTO | undefined;
	messageQueue: ChatMessage[] = []; // Очередь сообщений
	batchingTimeout: NodeJS.Timeout | null = null; // Таймер для обработки сообщений

	initPublic() {
		const addChatBind = this.addChat.bind(this);
		const onClickChatBind = this.onClickChat.bind(this);
		const clickProfileBind = this.clickProfile.bind(this);
		const onLogoutBind = this.onLogout.bind(this);
		const clickAddChatBind  = this.clickAddChat.bind(this)
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
			idItem: "addChat",
			onClick: clickAddChatBind,
		});

		this.children = {
			...this.children,
			DialogListComponent,
			InputSearchComponent,
			MessagesListComponent,
			itemListLogoutComponent,
			ItemListProfileComponent,
			itemListAddChatComponent,
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

	addChat(e: Event) {
		e.preventDefault();
		e.stopPropagation();

		const target = e.target as HTMLFormElement;
		const form = target.form!;

		const output: AddChat = {
			title: form.querySelector("input")!.value,
		};

		addChat(output).then(() => {
			this.updateDialogsList();
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

			const list = document.querySelectorAll("#chat-user-list li .delete");
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
		// deleteUser(data)
		//   .then(() => {
		//     this.updateChatUserList();
		//   });
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

		window.store.set({ chatId: elem.dataset.id });
		this.children.MessagesListComponent.setProps({ messages: [] });

		openChat(data, (message: ChatMessage) => {
			this.onReceivedMessage(message);
			console.log(`openChat 144 message ${JSON.stringify(message)}`);
		}).then(() => {
			if (Array.isArray(this.props.chatList)) {
				this.props.currentChat = this.props.chatList.find(item => item.id === +data.chatId);
				this.updateDialogUserList();
			}
		});
	}

	// Буферизуем обработку сообщений
	onReceivedMessage(message: ChatMessage) {
		this.messageQueue.push(message);
		console.log(`messages ${JSON.stringify(this.messageQueue)}`);
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

	// Добавление чата
	clickAddChat() {
		const popover = document.querySelector("#addChat") as HTMLDialogElement;
		console.log(`popover ${popover}`);

		popover.showPopover();
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
							<div class="message-input-container">
								<button class="attach-btn" aria-label="Attach file">📎</button>
								<textarea class="message-input" placeholder="Написать сообщение..." name="message" id="message"></textarea>
								<button type="button" class="emoji-btn" aria-label="Emoji">😊</button>
								<button class="send-btn" aria-label="Send message" id="send-btn">➤</button>
							</div>
							
						</form>
					</section>
				</main>
	  `;
	}
}

const mapStateToPropsShort = ({ isLoading, errorMessage, chatId, massageStack }: { [key: string]: any }) => ({
	isLoading,
	errorMessage,
	chatId,
	massageStack,
});

export default connect(mapStateToPropsShort)(ChatPage);
