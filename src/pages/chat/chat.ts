import { ChatDTO } from "../../api/types";
import { DialogList, InputSearch } from "../../components";
import Block from "../../parentClasses/Block/BLock";
import { getChatUsers } from "../../services/chats";
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
