import { Button, Copyright, Footer, Form, Input, InputField, Link, Main, PopUp, Title } from '../../components';
import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import profilePageTemplate from './profile.hbs?raw';

export class ProfilePage extends Block {
	constructor(props: TBlock) {
		super({
			...props,
			titleComponent: new Title({
				titleText: 'Иван',
			}),
			mainComponent: new Main({
				mainStyle: 'main-profile',
				formComponent: new Form({
					formStyle: 'profile-form',
					sectionStyle: 'profile',
					formContainerStyle: 'profile-form__container',
					formInputsStyle: 'profile-form__inputs',
					InputContentComponent: [
						InputFieldMailComponent,
						InputFieldLoginComponent,
						InputFieldNameComponent,
						InputFieldSecondNameComponent,
						InputFieldPhoneComponent,
						InputFieldPasswordComponent,
						InputFieldPasswordRetryComponent,
					],
					ButtonComponent: new Button({
						text: 'Сохранить',
						page: 'chat',
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
		return this.compile(profilePageTemplate, this.props);
	}
}
export const InputFieldMailComponent = new InputField({
	inputFieldStyle: 'input-field',
	inputFieldLabelStyle: 'input-field__label',
	labelInput: 'Почта',
	labelTitle: 'Почта',
	inputComponent: new Input({
		inputType: 'email',
		inputTitle: 'Почта',
		inputName: 'email',
		inputPlaceholder: 'логин@почта.рф',
	}),
});

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
	}),
});

export const InputFieldNameComponent = new InputField({
	inputFieldStyle: 'input-field',
	inputFieldLabelStyle: 'input-field__label',
	labelInput: 'Имя',
	labelTitle: 'Имя',
	inputComponent: new Input({
		inputType: 'text',
		inputTitle: 'Имя',
		inputName: 'first_name',
		inputPlaceholder: 'Мастер',
	}),
});

export const InputFieldSecondNameComponent = new InputField({
	inputFieldStyle: 'input-field',
	inputFieldLabelStyle: 'input-field__label',
	labelInput: 'Фамилия',
	labelTitle: 'Фамилия',
	inputComponent: new Input({
		inputType: 'text',
		inputTitle: 'Фамилия',
		inputName: 'second_name',
		inputPlaceholder: 'Бит',
	}),
});

export const InputFieldPhoneComponent = new InputField({
	inputFieldStyle: 'input-field',
	inputFieldLabelStyle: 'input-field__label',
	labelInput: 'Телефон',
	labelTitle: 'Телефон',
	inputComponent: new Input({
		inputType: 'text',
		inputTitle: 'Телефон',
		inputName: 'phone',
		inputPlaceholder: 'ГрандМастерБит',
		pattern: '+7[0-9]{10}',
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
export const InputFieldPasswordRetryComponent = new InputField({
	inputFieldStyle: 'input-field',
	inputFieldLabelStyle: 'input-field__label',
	labelInput: 'Пароль (ещё раз)',
	labelTitle: 'Пароль (ещё раз)',
	inputComponent: new Input({
		inputType: 'password',
		inputTitle: 'Пароль (ещё раз)',
		inputName: 'password',
		inputPlaceholder: 'Пароль (ещё раз)',
	}),
});
