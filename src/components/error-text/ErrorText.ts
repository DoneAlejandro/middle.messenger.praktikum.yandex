import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";

export class ErrorText extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	renderPublic() {
		return `
		<div class='error-text'>
			<span class='error-text__text {{#if className}} {{className}}{{/if}}'>{{text}}</span>
		</div>
		`;
	}
}
