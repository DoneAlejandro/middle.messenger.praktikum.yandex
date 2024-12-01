import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";
export class Input extends Block {
	constructor(props: TBlock) {
		super({ ...props });
		console.log(`this.props ${JSON.stringify(this.props)}`);
	}
	renderPublic() {
		return `
		{{log "Input content:" props}}
		<input type='{{inputType}}' title='{{inputTitle}}' id='{{name}}' value='{{value}}' name='{{name}}' placeholder='{{inputPlaceholder}}' class='input {{#if className}} {{className}}{{/if}}'>
		`
	}

}

