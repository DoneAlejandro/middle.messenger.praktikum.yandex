import Handlebars from 'handlebars';
import './dialog-list.scss';
export { DialogList } from './DialogList.ts';
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
