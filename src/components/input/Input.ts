import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";
export class Input extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	renderPublic() {
		return `
		<input type='{{inputType}}' title='{{inputTitle}}' id='{{inputId}}' value='{{value}}' name='{{inputName}}' placeholder='{{inputPlaceholder}}' class='input {{#if className}} {{className}}{{/if}}'>
		`
	}

}

