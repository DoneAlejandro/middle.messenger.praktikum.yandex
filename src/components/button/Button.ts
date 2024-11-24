import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";

export class Button extends Block {
	constructor(props: TBlock) {
		super({
			...props,
			events: {
				click: props.onClick,
			},
		});
	}
	renderPublic() {
		return `
		<button class="button {{#if buttonStyle}} {{{ buttonStyle }}}{{/if}}" page="{{page}}">{{text}}</button>
		`;
		// this.compile(buttonTemplate, this.props);
	}
}
