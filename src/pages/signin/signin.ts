import { Button, Copyright, Footer, Form, Header, Input, InputField, Link, Main, PopUp, Title } from '../../components';
import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import { checkValidate, loginValidation } from '../../validation/validation';
import { Subtitle } from './../../components/subtitle/Subtitle';
import SigninPageTemplate from './signin.hbs?raw';

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
				mainStyle: 'main-signin',

				formComponent: new Form({
					formStyle: 'signin-form',
					sectionStyle: 'signin',
					formContainerStyle: 'signin-form__container',
					formInputsStyle: 'signin-form__inputs',
					subtitleComponent: new Subtitle({
						subtitleText: 'Войти',
					}),
					InputContentComponent: [InputFieldLoginComponent, InputFieldPasswordComponent],
					ButtonComponent: new Button({
						text: 'Войти',
						buttonStyle: 'signin-form__button',
						page: 'chat',
					}),
					LinkComponent: new Link({
						text: 'Нет аккаунта?',
						page: 'registration',
					}),
				}),
			}),
			footerComponent: new Footer({
				footerStyle: 'footer-signin',
				copyrightComponent: new Copyright({
					copyright: '© 2024 DoneAlejandro. Все права защищены.',
				}),
				popUpComponent: new PopUp({
					linkSignIn: new Link({
						text: 'Войти',
						page: 'signin',
					}),
					linkRegistration: new Link({
						text: 'Регистрация',
						page: 'registration',
					}),
					linkProfile: new Link({
						text: 'Профиль',
						page: 'profile',
					}),
					linkChat: new Link({
						text: 'Чат',
						page: 'chat',
					}),
					linkErrorFifth: new Link({
						text: 'Ошибка 500',
						linkStyle: 'popup__link-errorFiveHundredth',
						page: 'errorPage',
					}),
					linkErrorFourth: new Link({
						text: 'Ошибка 404',
						linkStyle: 'popup__link-errorFourHundredth',
						page: 'errorFourth',
					}),
				}),
			}),
		});
	}

	render() {
		return this.compile(SigninPageTemplate, this.props);
	}
}

export const InputFieldLoginComponent = new InputField({
	inputFieldStyle: 'input-field',
	inputFieldLabelStyle: 'input-field__label',
	labelInput: 'Логин',
	labelTitle: 'Логин',
	
	inputComponent: new Input({
		inputType: 'text',
		inputTitle: 'Логин',
		inputName: 'login',
		inputPlaceholder: 'ГрандМастерБит',
		events: {
			blur: (event: Event) => {
				console.log('asdasd');
				
				checkValidate(event, loginValidation, 'login')
			}
		},
	}),
});
export const InputFieldPasswordComponent = new InputField({
	inputFieldStyle: 'input-field',
	inputFieldLabelStyle: 'input-field__label',
	labelInput: 'Пароль',
	labelTitle: 'Пароль',
	inputComponent: new Input({
		inputType: 'password',
		inputTitle: 'Пароль',
		inputName: 'password',
		inputPlaceholder: 'Пароль',
	}),
});
