import { Form, Header, Main, Title } from '../../components';
import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import { Subtitle } from './../../components/subtitle/Subtitle';
import SigninPage from './signin.hbs?raw';

export class SignIn extends Block {
	constructor(props: TBlock) {
		super({
			...props,
			headerComponent: new Header({
				title: new Title({
					titleText: 'ONE-on-ONE Social',
				}),
			}),
			mainComponent: new Main({
				formComponent: new Form({
					subtitleComponent: new Subtitle({
						subtitleText: 'Войти',
					}),
				}),
			}),
		});
	}

	render() {
		return this.compile(SigninPage, this.props);
	}
}
