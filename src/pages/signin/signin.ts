import { Header, Main, Title } from '../../components';
import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import SigninPage from './signin.hbs?raw';

export class SignIn extends Block {
	constructor(props: TBlock) {
		super({ ...props, header, main });
	}
	render() {
		return this.compile(SigninPage, this.props);
	}
}

export const header = new Header({
	title: new Title({
		titleText: 'ONE-on-ONE Social',
	})
});

export const main = new Main({
	
})
