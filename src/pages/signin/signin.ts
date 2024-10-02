import { Button, Copyright, Footer, Form, Header, Input, InputField, Link, Main, PopUp, Title } from '../../components';
import { connect } from '../../globalFunction/utils/connect';
import { handleFormSubmit } from '../../globalFunction/validation/formSubmit/formSubmit';
import { checkValidate, loginValidation, passwordValidation } from '../../globalFunction/validation/validation';
import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
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
					events: {
						submit: (event: Event) => {
							handleFormSubmit(event);
						},
					},
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
						href: '/messenger',
					}),
					LinkComponent: new Link({
						text: 'Нет аккаунта?',
						href: '/registration',
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
						href: '/',
					}),
					linkRegistration: new Link({
						text: 'Регистрация',
						href: '/registration',
					}),
					linkProfile: new Link({
						text: 'Профиль',
						href: '/settings',
					}),
					linkChat: new Link({
						text: 'Чат',
						href: '/messenger',
					}),
					linkErrorFifth: new Link({
						text: 'Ошибка 500',
						linkStyle: 'popup__link-errorFiveHundredth',
						href: '/error-fifth',
					}),
					linkErrorFourth: new Link({
						text: 'Ошибка 404',
						linkStyle: 'popup__link-errorFourHundredth',
						href: '/error-fourth',
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
				checkValidate(event, loginValidation, 'login');
			},
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
		events: {
			blur: (event: Event) => {
				checkValidate(event, passwordValidation, 'password');
			},
		},
	}),
});
const mapStateToPropsShort = ({ isLoading, errorMessage }: { [key: string]: any }) => ({ isLoading, errorMessage });

export default connect(mapStateToPropsShort)(SignIn);