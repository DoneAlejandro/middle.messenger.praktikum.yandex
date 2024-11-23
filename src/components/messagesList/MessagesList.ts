import { connect } from "../../globalFunction/utils/connect";
import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";

export class MessagesList extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	public renderPublic() {
		return `
		<div class='messages-list__container' id='messages-list'>
		{{log "MessagesList content:" messages}}
		{{log "MessagesList Props:" this}}
		{{#each messages}}
			<div class='messages-list__item {{#if sent}}sent{{else}}received{{/if}}'>
				{{content}} {{userId}}
				dfdddddddddddMessagesList
				<div class='messages-list__date'>{{date}}</div>
			</div>
		{{/each}}
		</div>
		`;
	}
}
const mapStateToPropsShort = ({ userId }: { [key: string]: any }) => ({ userId });

export default connect(mapStateToPropsShort)(MessagesList);