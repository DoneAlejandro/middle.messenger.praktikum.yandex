import Handlebars from 'handlebars';
import './dialog-list.scss';
export { default as DialogList } from './dialog-list.hbs?raw';
Handlebars.registerHelper('chat-page-list', () => {
	return [
		{
			name: 'Опоссум',
			message: 'Изображение',
			unread: '2',
			avatar: 'https://github.com/DoneAlejandro/yandex-praktikum/blob/sprint_1/src/assets/img/kchay.jpg?raw=true',
		},
		{ name: 'Енот', message: 'Go на свалку!' },
		{ name: 'Барсук', message: 'А у кого ключи от сарая?', unread: '4' },
	];
});
