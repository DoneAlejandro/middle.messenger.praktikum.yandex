import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";

export class Subtitle extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	renderPublic() {
		return `
		<h3 class='subtitle'>
			{{subtitleText}}
		</h3>
		`;
	}
}
