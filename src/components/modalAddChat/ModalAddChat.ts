import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { connect } from "../../globalFunction/utils/connect";
import Block from "../../parentClasses/Block/BLock";

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

export class ModalAddChat extends Block {
	initPublic() {
		const closeModalBind = this.closeModal.bind(this);

		const InputTitle = new Input({ ...data.input, inputId: "inputId", inputPlaceholder: "Enter Login" });
		const SubmitButton = new Button({ ...data.submit, text: "Add", buttonStyle: "button", onClick: this.props.onSubmit });
		const closeBtnComponent = new Button({
			type: "button",
			idBtn: "close",
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
		const btn = document.querySelector("#close") as HTMLElement;
		const modal = document.querySelector("#addChat") as HTMLElement;
		btn.addEventListener("click", () => {
			modal.style.display = "none";
		});
	}

	renderPublic(): string {
		return `
    <div id="addChat" class="modal text-center {{#if isLoading}}loading{{/if}}">
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

const mapStateToPropsShort = ({ isLoading, errorMessage }: { [key: string]: unknown }) => ({ isLoading, errorMessage });

export default connect(mapStateToPropsShort)(ModalAddChat);
