import { LoginRequestData } from "../../api/types";
import { Button, Form, Header, Input, InputField, Link, Main, Subtitle, Title } from "../../components";
// import WSTransport from "../../globalFunction/connectionWebsoket";
import { connect } from "../../globalFunction/utils/connect";
import { handleFormSubmit } from "../../globalFunction/validation/formSubmit/formSubmit";
import { checkValidate, loginValidation, passwordValidation } from "../../globalFunction/validation/validation";
import Block from "../../parentClasses/Block/BLock";
import { PagesPaths } from "../../parentClasses/Router/pathEnum";
import { login } from "../../services/authorization";

const data = {
	login: {
		label: "Login",
		type: "text",
		name: "login",
		value: "",
	},
	password: {
		label: "Password",
		type: "password",
		name: "password",
		value: "",
	},
};
export class SignIn extends Block {
	initPublic() {
		const onSubmitBind = this.onSubmit.bind(this);
		const inputLogin = new Input({
			...data.login,
			inputType: "text",
			inputTitle: "Логин",
			inputName: "login",
			inputPlaceholder: "ГрандМастерБит",
			events: {
				blur: (event: Event) => {
					checkValidate(event, loginValidation, "login");
				},
			},
		});
		const InputFieldLoginComponent = new InputField({
			inputFieldStyle: "input-field",
			inputFieldLabelStyle: "input-field__label",
			labelInput: "Логин",
			labelTitle: "Логин",

			inputComponent: inputLogin,
		});
		const inputPassword = new Input({
			...data.password,
			inputType: "password",
			inputTitle: "Пароль",
			inputName: "password",
			inputPlaceholder: "Пароль",
			events: {
				blur: (event: Event) => {
					checkValidate(event, passwordValidation, "password");
				},
			},
		});
		const InputFieldPasswordComponent = new InputField({
			inputFieldStyle: "input-field",
			inputFieldLabelStyle: "input-field__label",
			labelInput: "Пароль",
			labelTitle: "Пароль",
			inputComponent: inputPassword,
		});
		const subtitleComponent = new Subtitle({
			subtitleText: "Войти",
		});
		const ButtonComponent = new Button({
			text: "Войти",
			href: "/messenger",
			onClick: onSubmitBind,
		});
		const LinkComponent = new Link({
			text: "Нет аккаунта?",
			href: "/sign-up",
		});
		const formComponent = new Form({
			formId: "signin-form",
			events: {
				submit: (event: Event) => {
					console.log(`SignIn27 event ${JSON.stringify(event)}`);
					handleFormSubmit(event);
				},
			},
			formStyle: "signin-form",
			sectionStyle: "signin",
			formContainerStyle: "signin-form__container",
			formInputsStyle: "signin-form__inputs",
			subtitleComponent: subtitleComponent,
			InputFieldLoginComponent: InputFieldLoginComponent,
			InputFieldPasswordComponent: InputFieldPasswordComponent,
			ButtonComponent: ButtonComponent,
			LinkComponent: LinkComponent,
		});
		const mainComponent = new Main({
			mainStyle: "main-signin",
			formComponent: formComponent,
		});
		const headerComponent = new Header({
			title: new Title({
				titleText: "ONE-on-ONE Social",
			}),
		});

		this.children = {
			...this.children,
			headerComponent,
			mainComponent,
		};
	}
	// constructor(props: TBlock) {
	// 	super({
	// 		...props,
	// 		headerComponent: new Header({
	// 			title: new Title({
	// 				titleText: "ONE-on-ONE Social",
	// 			}),
	// 		}),
	// 		mainComponent: new Main({
	// 			mainStyle: "main-signin",

	// 			formComponent: new Form({
	// 				events: {
	// 					submit: (event: Event) => {
	// 						console.log(`SignIn27 event ${JSON.stringify(event)}`);
	// 						handleFormSubmit(event);
	// 					},
	// 				},
	// 				formStyle: "signin-form",
	// 				sectionStyle: "signin",
	// 				formContainerStyle: "signin-form__container",
	// 				formInputsStyle: "signin-form__inputs",
	// 				subtitleComponent: new Subtitle({
	// 					subtitleText: "Войти",
	// 				}),

	// 				InputFieldLoginComponent,
	// 				InputFieldPasswordComponent,

	// 				ButtonComponent: new Button({
	// 					text: "Войти",
	// 					href: "/messenger",
	// 				}),
	// 				LinkComponent: new Link({
	// 					text: "Нет аккаунта?",
	// 					href: "/sign-up",
	// 				}),
	// 			}),
	// 		}),
	// 		footerComponent: new Footer({
	// 			footerStyle: "footer-signin",
	// 			copyrightComponent: new Copyright({
	// 				copyright: "© 2024 DoneAlejandro. Все права защищены.",
	// 			}),
	// 			popUpComponent: new PopUp({
	// 				linkSignIn: new Link({
	// 					text: "Войти",
	// 					href: "/",
	// 				}),
	// 				linkRegistration: new Link({
	// 					text: "Регистрация",
	// 					href: "/registration",
	// 				}),
	// 				linkProfile: new Link({
	// 					text: "Профиль",
	// 					href: "/settings",
	// 				}),
	// 				linkChat: new Link({
	// 					text: "Чат",
	// 					href: "/messenger",
	// 				}),
	// 				linkErrorFifth: new Link({
	// 					text: "Ошибка 500",
	// 					linkStyle: "popup__link-errorFiveHundredth",
	// 					href: "/error-fifth",
	// 				}),
	// 				linkErrorFourth: new Link({
	// 					text: "Ошибка 404",
	// 					linkStyle: "popup__link-errorFourHundredth",
	// 					href: "/error-fourth",
	// 				}),
	// 			}),
	// 		}),
	// 	});
	// }
	clickForCreateAccountBind = this.clickForCreateAccount.bind(this);
	clickForCreateAccount() {
		window.router.go(PagesPaths.REGISTRATION);
	}
	onSubmit(e: Event) {
		e.preventDefault();

		// const isValid = this.validateForm();

		// if (!isValid) return;
		const formElem = document.querySelector("#signin-form") as HTMLFormElement;
		if (!formElem) return;
		const isFormValid = handleFormSubmit({ ...e, target: formElem });
		if (isFormValid) {
			const target = e.target as HTMLFormElement;
			const form = target!.form;
			const formData = new FormData(form);
			const output: LoginRequestData = {} as LoginRequestData;

			formData.forEach((value, key) => {
				output[key] = value.toString();
			});

			login(output);
		}
	}

	renderPublic() {
		return `
		<div class='page'>
			{{{ headerComponent }}}
			{{{ mainComponent }}}
			{{{ footerComponent }}}
		</div>
		`;
	}
}

const mapStateToPropsShort = ({ isLoading, errorMessage }: { [key: string]: any }) => ({ isLoading, errorMessage });

export default connect(mapStateToPropsShort)(SignIn);
