import * as Pages from './pages';
import Block from './parentClasses/Block/BLock';
import Router from './parentClasses/Router/Router';
import { PagesPaths } from './parentClasses/Router/pathEnum';
import { Store } from './parentClasses/Store/Store';

// eslint-disable-next-line no-redeclare
interface Pages {
	[key: string]: Block;
}
declare global {
	interface Window {
		router: Router;
		store: Store;
	}
}
window.store = new Store({
	isLoading: false,
	user: null,
	profileDisabled: true,
	errorMessage: null,
	successMessage: null,
	userName: null,
	userId: null,
	chatId: null,
});
// Object.entries(Components).forEach(([name, component]) => {
// 	if (typeof component === 'string') {
// 		Handlebars.registerPartial(name, component);
// 	}
// });
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
};
const router = new Router('#app');
window.router = router;
router
	.use(PagesPaths.SIGNIN, pages.signin)
	.use(PagesPaths.REGISTRATION, pages.registration)
	.use(PagesPaths.CHAT, pages.chat)
	.use(PagesPaths.ERROR_FOURTH, pages.errorFourth)
	.use(PagesPaths.ERROR_FIFTH, pages.errorPage)
	.use(PagesPaths.PROFILE, pages.profile)
	.start();

// function render(root: HTMLElement, block: Block) {
// 	root?.appendChild(block.getContent());
// 	block.dispatchComponentDidMount();
// 	return root;
// }
// function navigate(page: string) {
// 	const app = document.getElementById('app');
// 	const Component = pages[page];
// 	if (app !== null) {
// 		app.innerHTML = '';
// 		render(app, Component);
// 	}
// }
// document.addEventListener('DOMContentLoaded', () => {
// 	navigate('registration');
// });

// document.addEventListener('click', e => {
// 	const target = e.target as HTMLElement;
// 	const page = target.getAttribute('page');
// 	if (page) {
// 		navigate(page);
// 		e.preventDefault();
// 		e.stopImmediatePropagation();
// 	}
// });
