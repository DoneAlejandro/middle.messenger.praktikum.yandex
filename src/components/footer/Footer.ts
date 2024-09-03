import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";
import footerTemplate from "./footer.hbs?raw";

export class Footer extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	render() {
		return this.compile(footerTemplate, this.props );
	}
}