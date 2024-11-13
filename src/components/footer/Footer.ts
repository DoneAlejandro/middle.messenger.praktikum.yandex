import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";

export class Footer extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	renderPublic() {
		return `
		<footer class='footer {{#if footerStyle}} {{footerStyle}}{{/if}}'>
			{{{ copyrightComponent }}}
			{{{ popUpComponent }}}
		</footer>
		`;
		// this.compile(footerTemplate, this.props);
	}
}
