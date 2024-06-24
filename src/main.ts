import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import { Components as ComponentsType } from './type/types';

interface Pages {
	[key: string]: [string, any?];
}

const pages: Pages = {
	signin: [Pages.SigninPage],
	registration: [Pages.RegistrationPage],
	error: [Pages.ErrorPage],
	chat: [Pages.ChatPage],
	profile: [Pages.ProfilePage],
	errorFourth: [Pages.ErrorPageFourth],
};

Object.entries(Components as ComponentsType).forEach(([name, component]) => {
	Handlebars.registerPartial(name, component);
});

function navigate(page: string): void {
	const [sours, args] = pages[page];
	const handlebarsCompile = Handlebars.compile(sours);
	const app = document.getElementById('app')!;
	app.innerHTML = handlebarsCompile(args);
}

document.addEventListener('DOMContentLoaded', () => {
	navigate('signin');
});

document.addEventListener('click', e => {
	const target = e.target as HTMLElement;
	const page = target.getAttribute('page');
	if (page) {
		navigate(page);
		e.preventDefault();
		e.stopImmediatePropagation();
	}
});
