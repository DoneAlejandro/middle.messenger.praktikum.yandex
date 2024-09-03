import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";
import ErrorCodeTemplate from "./error-code.hbs?raw";

export class ErrorCode extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	render() {
		return this.compile(ErrorCodeTemplate, this.props);
	}
}