import { SignUpRequestData } from "../../api/types";
import { Button, Form, Header, Input, InputField, Main, Subtitle, Title } from "../../components";
import { handleFormSubmit } from "../../globalFunction/validation/formSubmit/formSubmit";
import {
	checkValidate,
	emailValidation,
	loginValidation,
	nameValidation,
	passwordValidation,
	phoneValidation,
} from "../../globalFunction/validation/validation";
import Block from "../../parentClasses/Block/BLock";
import { signup } from "../../services/authorization";

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
	repeatPassword: {
		label: "Repeat password",
		type: "password",
		name: "repeatpassword",
		value: "",
	},
	first_name: {
		label: "First name",
		type: "text",
		name: "first_name",
		value: "",
	},
	last_name: {
		label: "Last name",
		type: "text",
		name: "second_name",
		value: "",
	},
	phone: {
		label: "Phone",
		type: "tel",
		name: "phone",
		value: "",
	},
	email: {
		label: "E-mail",
		type: "email",
		name: "email",
		value: "",
	},
};

export class Registration extends Block {
	initPublic() {
		const onSubmitBind = this.onSubmit.bind(this);
		const headerComponent = new Header({
			title: new Title({
				titleText: "ONE-on-ONE Social",
			}),
		});
		const subtitleComponent = new Subtitle({
			subtitleText: "Регистрация",
		});
		const inputPasswordRepeat = new Input({
			...data.repeatPassword,
			inputType: "password",
			inputTitle: "Пароль (ещё раз)",
			inputName: "password",
			inputPlaceholder: "Пароль (ещё раз)",
			events: {
				blur: (event: Event) => {
					checkValidate(event, () => true, "confirm_password");
				},
			},
		});
		const InputFieldPasswordRetryComponent = new InputField({
			inputFieldStyle: "input-field",
			inputFieldLabelStyle: "input-field__label",
			labelInput: "Пароль (ещё раз)",
			labelTitle: "Пароль (ещё раз)",
			inputComponent: inputPasswordRepeat,
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
		const inputPhone = new Input({
			...data.phone,
			inputType: "text",
			inputTitle: "Телефон",
			inputName: "phone",
			inputPlaceholder: "ГрандМастерБит",
			events: {
				blur: (event: Event) => {
					checkValidate(event, phoneValidation, "phone");
				},
			},
		});
		const InputFieldPhoneComponent = new InputField({
			inputFieldStyle: "input-field",
			inputFieldLabelStyle: "input-field__label",
			labelInput: "Телефон",
			labelTitle: "Телефон",
			inputComponent: inputPhone,
		});
		const inputSecondName = new Input({
			...data.last_name,
			inputType: "text",
			inputTitle: "Фамилия",
			inputName: "second_name",
			inputPlaceholder: "Бит",
			events: {
				blur: (event: Event) => {
					checkValidate(event, nameValidation, "last_name");
				},
			},
		});
		const InputFieldSecondNameComponent = new InputField({
			inputFieldStyle: "input-field",
			inputFieldLabelStyle: "input-field__label",
			labelInput: "Фамилия",
			labelTitle: "Фамилия",
			inputComponent: inputSecondName,
		});
		const ButtonComponent = new Button({
			text: "Зарегистрироваться",
			href: "/messenger",
			buttonStyle: "button",
			idBtn: "registration-button",
			onClick: onSubmitBind,
		});
		const inputName = new Input({
			...data.first_name,
			inputType: "text",
			inputTitle: "Имя",
			inputName: "first_name",
			inputPlaceholder: "Мастер",
			events: {
				blur: (event: Event) => {
					checkValidate(event, nameValidation, "first_name");
				},
			},
		});
		const InputFieldNameComponent = new InputField({
			inputFieldStyle: "input-field",
			inputFieldLabelStyle: "input-field__label",
			labelInput: "Имя",
			labelTitle: "Имя",
			inputComponent: inputName,
		});
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
		const inputMail = new Input({
			...data.email,
			inputType: "email",
			inputTitle: "Почта",
			inputName: "email",
			inputPlaceholder: "логин@почта.рф",
			events: {
				blur: (event: Event) => {
					checkValidate(event, emailValidation, "email");
				},
			},
		});
		const InputFieldMailComponent = new InputField({
			inputFieldStyle: "input-field",
			inputFieldLabelStyle: "input-field__label",
			labelInput: "Почта",
			labelTitle: "Почта",
			inputComponent: inputMail,
		});
		const formComponent = new Form({
			formId: "registration-form",
			events: {
				submit: (event: Event) => {
					handleFormSubmit(event);
				},
			},
			formStyle: "registration-form",
			sectionStyle: "registration",
			formContainerStyle: "registration-form__container",
			formInputsStyle: "registration-form__inputs",
			subtitleComponent: subtitleComponent,
			InputFieldMailComponent,
			InputFieldLoginComponent,
			InputFieldNameComponent,
			InputFieldSecondNameComponent,
			InputFieldPhoneComponent,
			InputFieldPasswordComponent,
			InputFieldPasswordRetryComponent,
			ButtonComponent: ButtonComponent,
		});
		const mainComponent = new Main({
			mainStyle: "main-registration",
			formComponent: formComponent,
		});
		this.children = {
			...this.children,
			headerComponent,
			mainComponent,
		};
	}
	onSubmit(e: Event) {
		e.preventDefault();

		const formElem = document.querySelector("#registration-form") as HTMLFormElement;
		if (!formElem) return;
		const isFormValid = handleFormSubmit({ ...e, target: formElem });

		if (isFormValid) {
			const target = e.target as HTMLFormElement;
			const form = target!.form;

			const formData = new FormData(form);
			const output: SignUpRequestData = {} as SignUpRequestData;
			formData.forEach((value, key) => {
				output[key] = value.toString();
			});

			signup(output);
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
