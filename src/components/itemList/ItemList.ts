import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";

export class ItemList extends Block {
	constructor(props: TBlock) {
		super({
			...props,
			events: {
				click: props.onClick,
			},
		});
	}
	renderPublic(): string {
		return `
		<li class='{{ className }}' id='{{ idItem }}'>
			{{ title }}
		</li>
		`;
	}
}
