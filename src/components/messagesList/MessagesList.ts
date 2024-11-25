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
		{{#each messages}}
			<div class='messages-list__item {{#if user_id}}sent{{else}}received{{/if}}'>
				{{content}} {{userId}}
				<div class='messages-list__date'>{{time}}</div>
			</div>
		{{/each}}
		</div>
		`;
	}
}
const mapStateToPropsShort = ({ userId }: { [key: string]: any }) => ({ userId });

export default connect(mapStateToPropsShort)(MessagesList);
