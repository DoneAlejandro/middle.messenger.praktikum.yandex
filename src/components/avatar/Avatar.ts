import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";
import { Button } from "../button";
import { ModalAvatar } from "../modalChangeAvatar";

export class Avatar extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	beforeMount() {
		this.addModalCloseListener(); // Добавляем обработчик кликов на модальное окно
	}
	initPublic() {
		const ModalAvatarComponent = new ModalAvatar({});
		const changeAvatarBtn = new Button({
			text: "Change avatar",
			buttonStyle: "change-avatar-btn",
			onClick: () => this.toggleModalVisibility(true),
		});
		this.children = {
			...this.children,
			ModalAvatarComponent,
			changeAvatarBtn,
		};
	}
	toggleModalVisibility(isVisible: boolean) {
		const modal = document.getElementById("changeAvatarModal");
		if (modal) {
			modal.style.display = isVisible ? "flex" : "none";
		}
	}

	addModalCloseListener() {
		const modal = document.getElementById("changeAvatarModal");
		if (modal) {
			modal.addEventListener("click", event => {
				if (event.target === modal) {
					this.toggleModalVisibility(false); // Скрыть модальное окно
				}
			});
		}
	}

	renderPublic() {
		return `
    <div>
        <div class="{{avatarStyle}}">
		{{log "Avatar content:" props}}
        	{{#if path}}
        	<img src="https://ya-praktikum.tech/api/v2/resources/{{ path }}" alt="Profile" />
        	{{else}}
        	<img src="https://github.com/DoneAlejandro/yandex-praktikum/blob/sprint_1/src/assets/img/kchay.jpg?raw=true" alt="name">
			{{/if}}
			{{{ changeAvatarBtn }}}
			</div>
			{{{ ModalAvatarComponent }}}
    </div>
    `;
	}
}
