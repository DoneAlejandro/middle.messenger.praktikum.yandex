import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";

export class MenuBurger extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	renderPublic() {
		return `
		<div class='menu-burger'>
			<div></div>
		</div>
		`;
	}
}
