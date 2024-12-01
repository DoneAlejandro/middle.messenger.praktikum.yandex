import { UpdateUserData, UserDTO } from "../../api/types";
import { Avatar, Button, ChangePasswordModal, Form, Input, InputField, Main, Title } from "../../components";
import { connect } from "../../globalFunction/utils/connect";
import { handleFormSubmit } from "../../globalFunction/validation/formSubmit/formSubmit";
import {
	checkValidate,
	emailValidation,
	loginValidation,
	nameValidation,
	phoneValidation,
} from "../../globalFunction/validation/validation";
import Block from "../../parentClasses/Block/BLock";
import { userinfo } from "../../services/authorization";
import { update } from "../../services/user";

const data = {
	avatar: {
		path: null,
	},
	email: {
		name: "email",
		type: "email",
	},
	login: {
		name: "login",
		type: "text",
	},
	first_name: {
		name: "first_name",
		type: "text",
	},
	second_name: {
		name: "second_name",
		type: "text",
	},
	display_name: {
		name: "display_name",
		type: "text",
	},
	phone: {
		name: "phone",
		type: "tel",
	},
};
export class ProfilePage extends Block {
	state: object | undefined | any;
	public initPublic() {
		this.state = window.store.getState();
		const changeUserDataBind = this.changeUserData.bind(this);
		console.log(`this.state ${JSON.stringify(this.state)}`);

		const avatarComponent = new Avatar({ ...data.avatar });
		const titleComponent = new Title({ titleText: "Профиль" });
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

		const inputLogin = new Input({
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
		const inputName = new Input({
			...data.first_name,
		});
		const InputFieldNameComponent = new InputField({
			inputFieldStyle: "input-field",
			inputFieldLabelStyle: "input-field__label",
			inputComponent: inputName,
		});
		const inputSecondName = new Input({
			...data.second_name,
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
		const changePasswordModalComponent = new ChangePasswordModal({});

		const ButtonComponent = new Button({
			text: "Сохранить",
			href: "/messenger",
			onClick: changeUserDataBind,
		});
		const changeUserPasswordComponent = new Button({
			buttonStyle: "button profile__button-password",
			text: "Изменить пароль",
			onClick: () => this.toggleModalVisibility(true),
		});
		const form = new Form({
			formStyle: "profile-form",
			sectionStyle: "profile",
			formId: "profileForm",
			InputFieldMailComponent: InputFieldMailComponent,
			InputFieldLoginComponent: InputFieldLoginComponent,
			InputFieldNameComponent: InputFieldNameComponent,
			InputFieldSecondNameComponent: InputFieldSecondNameComponent,
			InputFieldPhoneComponent: InputFieldPhoneComponent,
			ButtonComponent: ButtonComponent,
		});
		const mainComponent = new Main({
			mainStyle: "main-profile",
			formComponent: form,
		});

		this.children = {
			...this.children,
			mainComponent,
			avatarComponent,
			titleComponent,
			inputMail,
			inputName,
			inputLogin,
			inputSecondName,
			inputPhone,
			changeUserPasswordComponent,
			changePasswordModalComponent,
		};
		console.log(`this.children ${JSON.stringify(this.children)}`);
	}
	beforeMount() {
		this.getUserInfo();
		this.addModalCloseListener();
	}
	toggleModalVisibility(isVisible: boolean) {
		const modal = document.getElementById("changePasswordModal");
		if (modal) {
			modal.style.display = isVisible ? "flex" : "none";
		}
	}
	addModalCloseListener() {
		const modal = document.getElementById("changePasswordModal");
		if (modal) {
			modal.addEventListener("click", event => {
				if (event.target === modal) {
					this.toggleModalVisibility(false); // Скрыть модальное окно
				}
			});
		}
	}
	getUserInfo() {
		userinfo()
			.then((response: UserDTO | any) => {
				console.log(`response ${JSON.stringify(response)}`);

				if (response) {
					window.store.set({
						userName: response["first_name"],
					});

					Object.entries(response).forEach(([key, value]) => {
						console.log(`key: ${key}, value: ${value}`);
						const dataObject: Record<string, () => void> = {
							"avatar": () => this.children.avatarComponent.setProps({ path: value }),
							"login": () => this.children.inputLogin.setProps({ value: value }),
							"first_name": () => this.children.inputName.setProps({ value }),
							"second_name": () => this.children.inputSecondName.setProps({ value }),
							"email": () => this.children.inputMail.setProps({ value }),
							"phone": () => this.children.inputPhone.setProps({ value }),
						};

						if (key in dataObject) {
							dataObject[key]!();
						}
					});
				}
			})
			.catch(error => {
				console.error("Ошибка получения информации о пользователе:", error);
			});
	}

	changeUserData(e: Event) {
		console.log(`changeUserData ${JSON.stringify(e)}`);

		e.preventDefault();
		const formElem = document.querySelector("#profileForm") as HTMLFormElement;
		if (!formElem) return;
		const isFormValid = handleFormSubmit({ ...e, target: formElem });
		if (isFormValid) {
			const output: UpdateUserData = {} as UpdateUserData;
			const formData = new FormData(formElem);
			formData.forEach((value, key) => {
				output[key] = value.toString();
			});
			update(output).then(() => {
				window.store.set({
					errorMessage: null,
					profileDisabled: true,
				});
				this.getUserInfo();
			});
		}
	}

	renderPublic() {
		return `
		<div class="page">
			<header class="header header-profile">
				<div class='header-profile__avatar'>
					{{{ avatarComponent }}}
				</div>
				{{{ titleComponent }}}
			</header>
			{{{ mainComponent }}}
			{{{ changeUserPasswordComponent }}}
			<div class="profile__change-password-modal" id="changePasswordModal">
				{{{ changePasswordModalComponent }}}
			</div>
		</div>
		`;
	}
}
const mapStateToPropsShort = ({ isLoading, errorMessage, profileDisabled, userName }: { [key: string]: any }) => ({
	isLoading,
	errorMessage,
	profileDisabled,
	userName,
});

export default connect(mapStateToPropsShort)(ProfilePage);
