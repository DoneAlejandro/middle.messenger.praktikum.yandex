import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";

export class DialogList extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}

	renderPublic() {
		return `
		<ul class='dialogs'>
			{{{ DialogItemComponent }}}
		</ul>
		`;
		// this.compile(DialogListTemplate, this.props);
	}
}
