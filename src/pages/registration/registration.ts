import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";
import RegistrationPage from "./registration.hbs?raw";

export class Registration extends Block {

	constructor(props: TBlock) {
		super({
			...props,

		})
	}

	render() {
		return this.compile(RegistrationPage, this.props);
	}
}