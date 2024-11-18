import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";

export class DialogList extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	renderPublic() {
		console.log(this.props.dialogs);
		return `
		<ul class='dialogs'>
		{{#each dialogs}}
			<li class='dialog'>
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
						{{name}}
					</div>
					<div class='dialog__message'>
						<span>{{message}}</span>
					</div>
				</div>
			</li>
		{{/each}}
	</ul>
		`;
		// this.compile(DialogListTemplate, this.props);
	}
}
