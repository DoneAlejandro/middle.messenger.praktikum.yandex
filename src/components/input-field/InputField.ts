import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";

export class InputField extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	renderPublic() {
		return `
		<div class='{{inputFieldStyle}}'>
			<label for='{{labelInput}}' class='{{inputFieldLabelStyle}}'>{{labelTitle}}</label>
			{{{inputComponent}}}
			<span class="input-error"></span>
		</div>
		`;
	}
}
