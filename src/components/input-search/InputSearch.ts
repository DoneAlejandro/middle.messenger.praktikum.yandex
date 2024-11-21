import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";

export class InputSearch extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}

	renderPublic() {
		return `
		<div class='input-container'>
			<input class='input-container__input' type='text' placeholder='{{placeholder}}'>
			<div class='input-container__icon'></div>
		</div>
		`;
		// this.compile(inputSearchTemplate, this.props);
	}
}
