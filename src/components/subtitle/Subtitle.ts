import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";
import subtitle from "./subtitle.hbs?raw";


export class Subtitle extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	render() {
		console.log(`subtitle ${subtitle} ${JSON.stringify(this.props)}`);
		return this.compile(subtitle, this.props);
	}
}