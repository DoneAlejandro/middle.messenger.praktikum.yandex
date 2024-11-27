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
		const onChangeBind = this.onChange.bind(this);
		const closeModalBind = this.closeModal.bind(this);

		const InputTitle = new Input({ ...data.input, onInput: onChangeBind });
		const SubmitButton = new Button({ ...data.submit, text: 'Add', onClick: this.props.onSubmit });
		const closeBtnComponent = new Button({ type: "button", idBtn: "close", text: "✕", buttonStyle: "modal__close", onClick: closeModalBind });
		this.children = {
			...this.children,
			SubmitButton,
			InputTitle,
			closeBtnComponent,
		};
	}

	onChange(e: Event) {
		const target = e.target as HTMLFormElement;

		if (target.value.length > 0) this.children["SubmitButton"].setProps({ disabled: "false" });
		else this.children["SubmitButton"].setProps({ disabled: "true" });
	}
	closeModal() {
		const btn = document.querySelector("#close") as HTMLElement;
		const modal = document.querySelector("#addChat") as HTMLElement;
		btn.addEventListener("click", () => {
			console.log(`btn ${btn} modal ${modal}`);

			modal.style.display = "none";
		});
	}

	renderPublic(): string {
		return `
    <div id="addChat" class="modal text-center {{#if isLoading}}loading{{/if}}">
        {{{ closeBtnComponent }}}
		<form class="modal__form" onkeydown="return event.key != 'Enter';">
        <h4 class="modal__title">Add new chat</h4>
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

export default connect(mapStateToPropsShort)(ModalAddChat);
