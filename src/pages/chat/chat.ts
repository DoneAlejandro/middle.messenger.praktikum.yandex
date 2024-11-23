import { AddChat, AddUserToChat, ChatDTO, ChatMessage, ChatUser, UserDTO } from "../../api/types";
import { DialogList, InputSearch, MessagesList } from "../../components";
import { connect } from "../../globalFunction/utils/connect";
import Block from "../../parentClasses/Block/BLock";
import { userinfo } from "../../services/authorization";
import { addChat, getChats, getChatUsers, openChat } from "../../services/chats";
// import { TBlock } from "../../parentClasses/types";

export class ChatPage extends Block {
	chats: object[] | undefined;
	state: object | undefined | any;
	currentChat: ChatDTO | undefined;

	initPublic() {
		const addChatBind = this.addChat.bind(this);
		const onClickChatBind = this.onClickChat.bind(this);
		this.chats = [];
		this.state = window.store.getState();
		this.props.chatList = [];
		this.props.messages = [];
		console.log("Creating DialogList with dialogs:", this.props.chatList);
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
		this.children = {
			...this.children,
			DialogListComponent,
			InputSearchComponent,
			MessagesListComponent,
		};
		console.log(`this.children ${JSON.stringify(this.children)}`);

		console.log(`this.props.dialogs 41 ${this.props.dialogs}`);
		console.log(`this.props.contacts 42 ${this.props.contacts}`);
	}
	beforeMount(): void {
		this.updateDialogsList();
		// this.inputAutoResize();
		userinfo().then(response => {
			const data: UserDTO | any = response;
			console.log(`userinfo ${JSON.stringify(data)}`);
			window.store.set({ userId: data.id });
			this.state = window.store.getState();
		});
	}
	addChat(e: Event) {
		e.preventDefault();
		e.stopPropagation();

		const target = e.target as HTMLFormElement;
		const form = target!.form;

		const output: AddChat = {
			title: form.querySelector("input").value,
		};

		addChat(output).then(() => {
			this.updateDialogsList();
		});
	}

	updateDialogsList() {
		getChats().then(response => {
			const data: ChatDTO[] = response as any;
			this.props.chatList = data;
			console.log(`62 dialogs: data ${JSON.stringify(this.props.chatList)}`);

			this.children.DialogListComponent.setProps({ dialogs: data });
			console.log(
				`65 dialogs: data ${JSON.stringify(data)} this.children.DialogListComponent ${JSON.stringify(
					this.children.DialogListComponent
				)}`
			);

			this.chats = data;
			const chatListArr = document.querySelectorAll(".dialog");
			console.log(`chatListArr ${JSON.stringify(chatListArr)}`);

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
		console.log(`chat_id ${chat_id}`);

		getChatUsers(chat_id).then(response => {
			const responseList: ChatUser[] = response as any;
			const data = responseList.filter((item: ChatUser) => item.id !== store.userId);
			// this.children.modalChatUserList.setProps({ list: data });

			const list = document.querySelectorAll("#chat-user-list li .delete");
			list.forEach(item => {
				const element = item as HTMLElement;
				return element.addEventListener("click", () => this.chatUserDelete(+element.dataset.id!));
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
		// 	this.updateChatUserList();
		//   });
	}
	onClickChat(e: Event) {
		console.log(`click ${JSON.stringify(e)}`);
		e.stopPropagation();

		const elem = e.target as HTMLElement;
console.log(`elem ${JSON.stringify(elem)}`);

console.log(`elem.dataset.id ${elem.dataset.id}`);
		if (!elem.dataset.id) return;
		
		const data = {
			chatId: elem.dataset.id,
			user: {
				id: this.state.userId,
			},
		};

		window.store.set({ chatId: elem.dataset.id });
		const messages: ChatMessage[] = [];
		this.children.MessagesListComponent.setProps({ messages });
		const onReceivedMessage = (message: ChatMessage) => {
			console.log(`onReceivedMessage ${JSON.stringify(message)}`);
			
			if (message.type === "user connected") {
				message.content = "User added";
			}
			if (message.time) {
				const date = new Date(message.time);
				message.time = date.toLocaleTimeString("en-En", { hour12: false });
			}
			if (message.user_id && message.user_id === this.state.userId) {
				message.user_id = "user";
			} else {
				message.user_id = "guest";
			}
			messages.push(message);
			messages.sort((a, b) => {
				const timeA = new Date(a.time).getTime();
				const timeB = new Date(b.time).getTime();
				return timeA - timeB;
			});
			this.children.MessagesListComponent.setProps({ messages, currentUser: this.state.userId });
			const list = document.querySelector("#messages") as HTMLElement;
			const messageList = document.querySelector("#messages-list") as HTMLElement;
			const messagesHeight = messageList.scrollHeight;
			list.scrollTo(0, messagesHeight);
		};
		console.log(`messages ${JSON.stringify(messages)}`);
		
		openChat(data, onReceivedMessage).then(() => {
			
				console.log(`this.props.chatList 171 ${JSON.stringify(this.props.chatList)}`);
				
				this.props.currentChat = this.props.chatList?.find(item => item.id === +data.chatId);
			
			console.log(`openChat ${JSON.stringify(this.props.currentChat)}`);
			this.updateDialogUserList();
		});
	}
	// inputAutoResize() {
	// 	const textarea = document.querySelector(".message-input") as HTMLTextAreaElement;
	// 	console.log(`textarea ${JSON.stringify(textarea)}`);
	// 	debugger;
	// 	if (!textarea) {
	// 		console.warn("Textarea element not found.");
	// 		return;
	// 	}

	// 	console.log("Adding input event listener to textarea...");
	// 	textarea.addEventListener("input", () => {
	// 		console.log(`Input event triggered, value: ${textarea.value}`);
	// 		textarea.style.height = "auto";
	// 		textarea.style.height = `${textarea.scrollHeight}px`;
	// 	});
	// }

	renderPublic() {
		return `
				<main class='main main-chat'>
					<section class="main-chat__list">
						<header class='header header-chat'>
							Header
							{{{ InputSearchComponent }}}
						</header>
						CHATS
						{{{ DialogListComponent }}}
					</section>
					<section class='main-chat__dialog'>
						{{{ PopUpComponent }}}
						<div class='main-chat__messages' id='messages'>
							{{{ MessagesListComponent }}}
						</div>
						<form class='main-chat__dialog-form'>
							<div class="message-input-container">
								<button class="attach-btn" aria-label="Attach file">📎</button>
								<textarea class="message-input" placeholder="Написать сообщение..."></textarea>
								<button class="emoji-btn" aria-label="Emoji">😊</button>
								<button class="send-btn" aria-label="Send message">➤</button>
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
