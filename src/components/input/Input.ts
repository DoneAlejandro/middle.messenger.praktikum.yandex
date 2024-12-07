import Block from "../../parentClasses/Block/BLock.ts";
import { TBlock } from "../../parentClasses/types.ts";
export class Input extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}

	renderPublic() {
		return `
		<input type='{{inputType}}' title='{{inputTitle}}' id='{{name}}' value='{{value}}' name='{{name}}' placeholder='{{inputPlaceholder}}' class='input {{#if className}} {{className}}{{/if}}'>
		`;
	}
}
