import { AddChat, AddUserToChat, ChatDTO, ChatUser, UserDTO } from "../../api/types";
import { DialogList, InputSearch } from "../../components";
import { connect } from "../../globalFunction/utils/connect";
import Block from "../../parentClasses/Block/BLock";
import { userinfo } from "../../services/authorization";
import { addChat, getChats, getChatUsers } from "../../services/chats";
// import { TBlock } from "../../parentClasses/types";

export class ChatPage extends Block {
	chats: object[] | undefined;
	state: object | undefined;
	currentChat: ChatDTO | undefined;

	initPublic() {
		this.chats = [];
		this.state = window.store.getState();
		this.props.chatList = [];
		this.props.messages = [];
		console.log("Creating DialogList with dialogs:", this.props.chatList);
		const DialogListComponent = new DialogList({
			dialogs: this.props.chatList,
		});
		const InputSearchComponent = new InputSearch({
			placeholder: "Поиск",
		});
		this.children = {
			...this.children,
			DialogListComponent,
			InputSearchComponent,
		};
		console.log(this.props.dialogs);
	}
	beforeMount(): void {
		this.updateDialogsList();
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
	a = {
		"element": {},
		"id": "lauFqu",
		"props": { "id": "lauFqu" },
		"children": {},
		"list": {
			"dialogs": [
				{ "id": 35738, "title": " kolyaaaa", "avatar": null, "created_by": 2714, "unread_count": 0, "last_message": null },
			],
		},
		"firstRender": false,
	};
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
			const chatListArr = document.querySelectorAll(".dialogs");
			console.log(`chatListArr ${JSON.stringify(chatListArr)}`);

			if (chatListArr) {
				chatListArr.forEach(chat => {
					chat.removeEventListener("click", () => {});
					chat.addEventListener("click", () => {});
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
						<div class='main-chat__messages'>
							messages
						</div>
						<form class='main-chat__dialog-form'>
							<div class='main-chat__textarea-container'>
								<textarea class='main-chat__textarea'></textarea>
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
// export class ChatPage extends Block {
// 	constructor(props: TBlock) {
// 		super({
// 			...props,
// 			MenuBurgerComponent: new MenuBurger({}),
// 			InputSearchComponent: new InputSearch({
// 				placeholder: "Поиск",
// 			}),
// 			DialogListComponent: new DialogList({
// 				// DialogItemComponent: dialogElement,
// 			}),
// 			PopUpComponent: new PopUp({
// 				linkSignIn: new Link({
// 					text: "Войти",
// 					href: "/",
// 				}),
// 				linkRegistration: new Link({
// 					text: "Регистрация",
// 					href: "/registration",
// 				}),
// 				linkProfile: new Link({
// 					text: "Профиль",
// 					href: "/settings",
// 				}),
// 				linkChat: new Link({
// 					text: "Чат",
// 					href: "/messenger",
// 				}),
// 				linkErrorFifth: new Link({
// 					text: "Ошибка 500",
// 					linkStyle: "popup__link-errorFiveHundredth",
// 					href: "/error-fifth",
// 				}),
// 				linkErrorFourth: new Link({
// 					text: "Ошибка 404",
// 					linkStyle: "popup__link-errorFourHundredth",
// 					href: "/error-fourth",
// 				}),
// 			}),
// 		});
// 	}

// 	renderPublic() {
// 		return `
// 		<main class='main main-chat'>
// 			<section class="main-chat__list">
// 				<header class='header header-chat'>
// 					{{{ MenuBurgerComponent }}}
// 					{{{ InputSearchComponent }}}
// 				</header>
// 				{{{ DialogListComponent }}}
// 			</section>
// 			<section class='main-chat__dialog'>
// 				{{{ PopUpComponent }}}
// 			</section>
// 		</main>
// 		`;
// 		// this.compile(Chat, this.props);
// 	}
// }
// const dialogsData = [
// 	{
// 		name: "Опоссум",
// 		message: "Изображение",
// 		unread: "2",
// 		avatar: "https://github.com/DoneAlejandro/yandex-praktikum/blob/sprint_1/src/assets/img/kchay.jpg?raw=true",
// 	},
// 	{ name: "Енот", message: "Go на свалку!" },
// 	{ name: "Барсук", message: "А у кого ключи от сарая?", unread: "4" },
// ];

// const dialogElement = dialogsData.map(dialog => {
// 	return new DialogItem({
// 		avatar: dialog.avatar,
// 		name: dialog.name,
// 		message: dialog.message,
// 	});
// });
