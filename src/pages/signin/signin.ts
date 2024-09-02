import { Form, Header, Input, InputField, Main, Title, Button } from '../../components';
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
				mainStyle: 'main-signin',

				formComponent: new Form({
					formStyle: 'signin-form',
					signinStyle: 'signin',
					formContainerStyle: 'signin-form__container',
					formInputsStyle: 'signin-form__inputs',
					subtitleComponent: new Subtitle({
						subtitleText: 'Войти',
					}),
					InputFieldLoginComponent: new InputField({
						inputFieldStyle: 'input-field',
						inputFieldLabelStyle: 'input-field__label',
						labelInput: 'Логин',
						labelTitle: 'Логин',
						inputComponent: new Input({
							inputType: 'text',
							inputTitle: 'Логин',
							inputName: 'login',
						}),
					}),
					InputFieldPasswordComponent: new InputField({
						inputFieldStyle: 'input-field',
						inputFieldLabelStyle: 'input-field__label',
						labelInput: 'Пароль',
						labelTitle: 'Пароль',
						inputComponent: new Input({
							inputType: 'password',
							inputTitle: 'Пароль',
							inputName: 'password',
						}),
					}),
					buttonComponent: new Button({
						
					})
				}),
			}),
		});
	}

	render() {
		return this.compile(SigninPage, this.props);
	}
}
