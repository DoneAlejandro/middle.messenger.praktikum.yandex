import Block from "../../parentClasses/Block/BLock.ts";

type ButtonProps = {
	idBtn?: string;
	buttonStyle?: string;
	text?: string;
	page?: string;
	onClick: (event: Event ) => void;
};

export class Button extends Block {
	constructor(props: ButtonProps) {
		super({
			...props,
			events: {
				click: props.onClick,
			},
		});
	}
	renderPublic() {
		return `
		 <button id="{{idBtn}}" class="{{#if buttonStyle}}{{buttonStyle}}{{else}}button{{/if}}" page="{{page}}">{{text}}</button>
		`;
	}
}
