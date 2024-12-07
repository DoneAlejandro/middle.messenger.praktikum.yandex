import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";

interface ItemListProps extends TBlock {
	onClick: (event: Event) => void;
	className?: string;
	idItem?: string;
	title?: string;
}

export class ItemList extends Block {
	constructor(props: TBlock) {
		super({
			...props,
			events: {
				click: (event: Event) => {
					const props = this.props as unknown as ItemListProps;
					props.onClick(event);
				},
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
