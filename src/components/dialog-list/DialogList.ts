import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";
import DialogListTemplate from "./dialog-list.hbs?raw";

export class DialogList extends Block {

	constructor(props: TBlock) {
		super({...props})
	}

	render() {
		return this.compile(DialogListTemplate, this.props);
	}
}