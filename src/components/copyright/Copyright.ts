import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";

export class Copyright extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	renderPublic() {
		return `
		<p class='copyright'>{{copyright}}</p>
		`;
		// this.compile(copyrightTemplate, this.props);
	}
}
