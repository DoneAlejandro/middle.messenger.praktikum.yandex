import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";

export class Header extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	renderPublic() {
		return `
		<header class='header {{#if className}} {{className}}{{/if}}'>
			{{{ title }}}
		</header>
		`;
	}
}
