import { Header } from '../../components';
import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import SigninPage from './signin.hbs?raw';

export class SignIn extends Block {
	constructor(props: TBlock) {
		super({ ...props, header });
	}
	render() {
		return this.compile(SigninPage, this.props);
	}
}

export const header = new Header({});
