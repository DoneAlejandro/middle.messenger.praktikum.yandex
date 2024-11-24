import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";

export class DialogList extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	renderPublic() {
		return `
		<ul class='dialogs'>
		{{#each dialogs}}
			<li class='dialog' data-id="{{id}}">
				<div class='dialog__line'></div>
				<div class='dialog__container {{#if current}} dialog__container--current{{/if}}'>
					{{#if avatar}}
					<div>
						<img class='dialog__avatar' src={{avatar}} alt={{name}}>
					</div>
					{{else}}
					<div>
						<img class='dialog__avatar' src='https://github.com/DoneAlejandro/yandex-praktikum/blob/sprint_1/src/assets/img/profile.jpg?raw=true' alt='profile'>
					</div>
					{{/if}}
					<div class='dialog__name'>
						{{title}}
					</div>
					<div class='dialog__message'>
						<span>{{last_message.content}}</span>
					</div>
				</div>
			</li>
		{{/each}}
	</ul>
		`;
		// this.compile(DialogListTemplate, this.props);
	}
}
