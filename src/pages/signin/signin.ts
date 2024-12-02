import { LoginRequestData } from "../../api/types";
import { Button, Form, Header, Input, InputField, Main, Subtitle, Title } from "../../components";
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
		const clickForCreateAccountBind = this.clickForCreateAccount.bind(this);
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
			idBtn: "signin-button",
			href: "/messenger",
			onClick: onSubmitBind,
		});
		const LinkComponent = new Button({
			text: "Нет аккаунта?",
			buttonStyle: "link",
			idBtn: "signin-link",
			onClick: clickForCreateAccountBind,
		});
		const formComponent = new Form({
			formId: "signin-form",
			events: {
				submit: (event: Event) => {
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

	clickForCreateAccount() {
		window.router.go(PagesPaths.REGISTRATION);
	}
	onSubmit(e: Event) {
		e.preventDefault();

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

const mapStateToPropsShort = ({ isLoading, errorMessage }: { [key: string]: unknown }) => ({ isLoading, errorMessage });

export default connect(mapStateToPropsShort)(SignIn);
