import { connect } from "../../globalFunction/utils/connect";
import Block from "../../parentClasses/Block/BLock";
import { Button } from "../button";
import { Input } from "../input";

const data = {
	input: {
		type: "text",
		label: "Title",
		name: "title",
		style: "text-left",
	},
	submit: {
		style: "primary",
		type: "button",
		title: "Add",
	},
};

export class ModalAddUser extends Block {
	initPublic() {
		const closeModalBind = this.closeModal.bind(this);

		const InputTitle = new Input({ ...data.input, inputId: "inputId" });
		const SubmitButton = new Button({ ...data.submit, text: "Add", buttonStyle: "button", onClick: this.props.onSubmit });
		const closeBtnComponent = new Button({
			type: "button",
			idBtn: "closeUser",
			text: "✕",
			buttonStyle: "modal__close",
			onClick: closeModalBind,
		});
		this.children = {
			...this.children,
			SubmitButton,
			InputTitle,
			closeBtnComponent,
		};
	}

	closeModal() {
		const btn = document.querySelector("#closeUser") as HTMLElement;
		const modal = document.querySelector("#addUser") as HTMLElement;
		btn.addEventListener("click", () => {
			modal.style.display = "none";
		});
	}

	renderPublic(): string {
		return `
    <div id="addUser" class="modal text-center {{#if isLoading}}loading{{/if}}">
        {{{ closeBtnComponent }}}
		<form class="modal__form" onkeydown="return event.key != 'Enter';">
        <h4 class="modal__title">{{{ titleModal }}}</h4>
        {{#if errorMessage}}
        <small class="text-center text-error">{{{errorMessage}}}</small>
        {{/if}}
        {{{ InputTitle }}}
        {{{ SubmitButton }}}
        </form>
    </div>
    `;
	}
}

const mapStateToPropsShort = ({ isLoading, errorMessage }: { [key: string]: any }) => ({ isLoading, errorMessage });

export default connect(mapStateToPropsShort)(ModalAddUser);
