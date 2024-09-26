import { DialogItem, DialogList, InputSearch, Link, MenuBurger, PopUp } from '../../components';
import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import Chat from './chat.hbs?raw';

export class ChatPage extends Block {
	constructor(props: TBlock) {
		super({
			...props,
			MenuBurgerComponent: new MenuBurger({}),
			InputSearchComponent: new InputSearch({
				placeholder: 'Поиск',
			}),
			DialogListComponent: new DialogList({
				DialogItemComponent: dialogElement,
			}),
			PopUpComponent: new PopUp({
				linkSignIn: new Link({
					text: 'Войти',
					href: '/',
				}),
				linkRegistration: new Link({
					text: 'Регистрация',
					href: '/registration',
				}),
				linkProfile: new Link({
					text: 'Профиль',
					href: '/settings',
				}),
				linkChat: new Link({
					text: 'Чат',
					href: '/messenger',
				}),
				linkErrorFifth: new Link({
					text: 'Ошибка 500',
					linkStyle: 'popup__link-errorFiveHundredth',
					href: '/error-fifth',
				}),
				linkErrorFourth: new Link({
					text: 'Ошибка 404',
					linkStyle: 'popup__link-errorFourHundredth',
					href: '/error-fourth',
				}),
			}),
		});
	}

	render() {
		return this.compile(Chat, this.props);
	}
}
const dialogsData = [
	{
		name: 'Опоссум',
		message: 'Изображение',
		unread: '2',
		avatar: 'https://github.com/DoneAlejandro/yandex-praktikum/blob/sprint_1/src/assets/img/kchay.jpg?raw=true',
	},
	{ name: 'Енот', message: 'Go на свалку!' },
	{ name: 'Барсук', message: 'А у кого ключи от сарая?', unread: '4' },
];

const dialogElement = dialogsData.map(dialog => {
	return new DialogItem({
		avatar: dialog.avatar,
		name: dialog.name,
		message: dialog.message,
	});
});
