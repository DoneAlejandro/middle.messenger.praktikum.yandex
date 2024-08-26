import { Header, Title } from '../../components';
import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import SigninPage from './signin.hbs?raw';

export class SignIn extends Block {
	constructor(props: TBlock) {
		super(props);
	}
	render() {
		return this.compile(SigninPage, this.props);
	}
}

export const headerT = new Header({
	title: new Title({
		title: 'ONE-on-ONE Social',
	})
	
});
