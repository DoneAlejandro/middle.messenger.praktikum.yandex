import { Copyright, ErrorCode, ErrorText, Footer, Header, Link, Title } from '../../components';
import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import ErrorPageTemplate from './error-page.hbs?raw';

export class ErrorPage extends Block {
	constructor(props: TBlock) {
		super({
			...props,
			HeaderComponent: new Header({
				title: new Title({
					titleText: 'ONE-on-ONE Social',
				}),
			}),
			ErrorCodeComponent: new ErrorCode({
				code: '500',
				className: 'error__code',
			}),
			ErrorTextComponent: new ErrorText({
				text: 'Мы уже фиксим',
				className: 'error__text',
			}),
			ErrorLinkComponent: new Link({
				text: 'Назад к чатам',
				page: 'signin',
				className: 'error__link',
			}),
			FooterComponent: new Footer({
				copyrightComponent: new Copyright({
					copyright: '© 2024 DoneAlejandro. Все права защищены.',
				}),
			}),
		});
	}

	render() {
		return this.compile(ErrorPageTemplate, this.props);
	}
}
