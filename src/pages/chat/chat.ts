import { AddChat, AddUserToChat, ChatDTO, ChatUser, UserDTO } from "../../api/types";
import { DialogList, InputSearch } from "../../components";
import { connect } from "../../globalFunction/utils/connect";
import Block from "../../parentClasses/Block/BLock";
import { userinfo } from "../../services/authorization";
import { addChat, getChatUsers } from "../../services/chats";
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
		const DialogListComponent = new DialogList({
			dialogs: this.props.contacts,
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
		const store = window.store.getState();
		const chat_id = +store.chatId;
		getChatUsers(chat_id).then(response => {
			const data: any = response;
			this.props.chatList = data;
			this.children.DialogListComponent.setProps({ dialogs: data });
			const dialogsList = document.querySelectorAll(".dialog__container");
			if (dialogsList) {
				dialogsList.forEach(elem => {
					elem.removeEventListener("click", () => {});
					elem.addEventListener("click", () => {});
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
					</section>
				</main>
				`;
	}
}
const mapStateToPropsShort = ({ isLoading, errorMessage, chatId, massageStack }: { [key: string]: any }) => ({ isLoading, errorMessage, chatId, massageStack });

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
