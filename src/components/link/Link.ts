import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";

export class Link extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}

	renderPublic() {
		return `
		<div class='link'>
			<a href='{{href}}' class='link {{#if linkStyle}} {{linkStyle}}{{/if}}' page='{{page}}'>{{text}}</a>
		</div>
		`;
		// this.compile(linkTemplate, this.props);
	}
}
