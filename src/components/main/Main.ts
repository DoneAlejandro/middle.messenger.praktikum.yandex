import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";

export class Main extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	renderPublic() {
		return `
		<main class='main {{#if mainStyle}} {{mainStyle}}{{/if}}'>
			{{{ formComponent }}}
		</main>
		`;
	}
}
