import { Form, Header, Main, Subtitle, Title } from '../../components';
import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import SigninPage from './signin.hbs?raw';

export class SignIn extends Block {
	constructor(props: TBlock) {
		super({ ...props, headerComponent, mainComponent });
	}

	render() {
		return this.compile(SigninPage, this.props);
	}
}
export const headerComponent = new Header({
	title: new Title({
		titleText: 'ONE-on-ONE Social',
	}),
});
export const subtitleComponent = new Subtitle({
	subtitleText: 'Войти',
});

export const formComponent = new Form({});

export const mainComponent = new Main({
	formComponent: [subtitleComponent, formComponent],
});
