import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import Block from './parentClasses/Block/BLock';
// import { Components as ComponentsType } from './type/types';

interface Pages {
	[key: string]: Block;
}
Object.entries(Components).forEach(([name, component]) => {
	Handlebars.registerPartial(name, component);
});
const signinPage = new Pages.SignIn({});
const registrationPage = new Pages.Registration({});
const chatPage = new Pages.ChatPage({});
const ErrorPage = new Pages.ErrorPage({});
const ErrorPageFourth = new Pages.ErrorPageFourth({});
const ProfilePage = new Pages.ProfilePage({});
const pages: Pages = {
	signin: signinPage,
	registration: registrationPage,
	chat: chatPage,
	errorPage: ErrorPage,
	errorFourth: ErrorPageFourth,
	profile: ProfilePage,
	// registration: [Pages.RegistrationPage],
	// error: [Pages.ErrorPage],
	// chat: [Pages.ChatPage],
	// profile: [Pages.ProfilePage],
	// errorFourth: [Pages.ErrorPageFourth],
};

// function render(root: HTMLElement, block: Block) {
//     root?.appendChild(block.getContent())
//     block.dispatchComponentDidMount()
//     return root;
// }
// function navigate(page: string) {
// 	const app = document.getElementById('app')!;
// 	const pageBlock = pages[page]
//     app.innerHTML = ''
//     render(app, pageBlock)
// }

// function navigate(page: string): void {
// 	// const [sours, args] = pages[page];
// 	// const handlebarsCompile = Handlebars.compile(sours);
// 	const app = document.getElementById('app')!;
// 	app.appendChild(pages[page].render());
// 	// app.innerHTML = handlebarsCompile(args);
// }
function render(root: HTMLElement, block: Block) {
	root?.appendChild(block.getContent());
	block.dispatchComponentDidMount();
	return root;
}
function navigate(page: string) {
	const app = document.getElementById('app');

	const Component = pages[page];
	// const component = new Component();
	app.innerHTML = '';
	render(app, Component);
	// app?.appendChild(Component.getContent()!);
}
document.addEventListener('DOMContentLoaded', () => {
	navigate('profile');
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
