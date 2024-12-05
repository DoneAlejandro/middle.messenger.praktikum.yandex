import { UpdateUserPassword } from "../../api/types";
import { handleFormSubmit } from "../../globalFunction/validation/formSubmit/formSubmit";
import { checkValidate } from "../../globalFunction/validation/validation";
import Block from "../../parentClasses/Block/BLock";
import { changePassword } from "../../services/user";
import { Button } from "../button";
import { Input } from "../input";

const data = {
	currentPassword: {
		name: "oldPassword",
		type: "password",
		inputPlaceholder: "Текущий пароль",
	},
	newPassword: {
		name: "newPassword",
		type: "password",
		inputPlaceholder: "Новый пароль",
	},
	repeatNewPassword: {
		name: "repeatPassword",
		type: "password",
		inputPlaceholder: "Повторите новый пароль",
	},
};

export class ChangePasswordModal extends Block {
	initPublic() {
		const onSubmitBind = this.onSubmit.bind(this);
		const inputCurrentPassword = new Input({ ...data.currentPassword, className: "change-password-form__input" });
		const inputNewPassword = new Input({
			...data.newPassword,
			className: "change-password-form__input",
			events: {
				blur: (event: Event) => {
					checkValidate(event, () => true, "password");
				},
			},
		});
		const inputRepeatPassword = new Input({
			...data.repeatNewPassword,
			className: "change-password-form__input",
			events: {
				blur: (event: Event) => {
					checkValidate(event, () => true, "confirm_password");
				},
			},
		});
		const changeButton = new Button({
			text: "Сохранить",
			onClick: onSubmitBind,
		});
		this.children = {
			...this.children,
			inputCurrentPassword,
			inputNewPassword,
			inputRepeatPassword,
			changeButton,
		};
	}
	onSubmit(e: Event) {
		e.preventDefault();
		const formElem = document.querySelector("#changePassword") as HTMLFormElement;
		if (!formElem) return;
		const isFormValid = handleFormSubmit({ ...e, target: formElem });
		if (isFormValid) {
			const target = e.target as HTMLFormElement;
			const form = target!.form;

			const formData = new FormData(form);

			const output: UpdateUserPassword = {
				oldPassword: formData.get("oldPassword") as string,
				newPassword: formData.get("newPassword") as string,
			};
			changePassword(output);
		}
	}

	renderPublic() {
		return `
		<form class="change-password-form" id="changePassword">
			<div class="change-password-form__input-current-password">
				{{{ inputCurrentPassword }}}
			</div>
			<div class="change-password-form__input-new-password">
				{{{ inputNewPassword }}}
			</div>
			<div class="change-password-form__input-repeat-password">
				{{{ inputRepeatPassword }}}
			</div>
			<div class="change-password-form__button">
				{{{ changeButton }}}
			</div>
		</form>
		`;
	}
}
