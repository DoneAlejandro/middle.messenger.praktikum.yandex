import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";

export class ErrorCode extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	renderPublic() {
		return `
		<div class='error-code'>
			<h3 class='error-code__title {{#if className}} {{className}}{{/if}}'>{{code}}</h3>
		</div>
		`;
		// this.compile(ErrorCodeTemplate, this.props);
	}
}
