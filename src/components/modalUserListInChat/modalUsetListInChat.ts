import Block from "../../parentClasses/Block/BLock";
import { Button } from "../button";

export class ModalUserList extends Block {
	public initPublic() {
		const closeModalBind = this.closeModal.bind(this);
		const closeBtnComponent = new Button({
			type: "button",
			idBtn: "closeUserList",
			text: "✕",
			buttonStyle: "user-list__close-btn",
			onClick: closeModalBind,
		});
		this.children = {
			...this.children,
			closeBtnComponent,
		};
	}
	closeModal() {
		const btn = document.querySelector("#closeUserList") as HTMLElement;
		const modal = document.querySelector("#chat-user-list") as HTMLElement;
		btn.addEventListener("click", () => {
			console.log(`btn ${btn} modal ${modal}`);

			modal.style.display = "none";
		});
	}
	renderPublic() {
		return `
    <div id="chat-user-list" class="user-list">
		<div class="user-list__close">
		{{{ closeBtnComponent }}}
		</div>
        <form class="user-list__form">
        	<h4 class="user-list__title">User in this chat</h4>
        	<ul class="user-list__list">
        		{{#each list}}
            		<li class="user-list__item">{{ first_name }} {{ second_name }} <b class="user-list__delete" data-id="{{id}}">Delete user </b> <b class="">{{login}}</b></li>
        		{{/each}}
        	</ul>
        </form>
    </div>
    `;
	}
}
