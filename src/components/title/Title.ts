import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";

export class Title extends Block {
	constructor(props: TBlock) {
		super(props);
	}
	renderPublic() {
		return `
		<h1 class='title'>
			{{titleText}}
		</h1>
		`;
	}
}
