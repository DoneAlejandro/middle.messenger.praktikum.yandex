import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";

export class Avatar extends Block {
	constructor(props: TBlock) {
		super({ ...props });
		console.log(`this.props Avatar ${JSON.stringify(this.props)}`);
	}
	initPublic() {
		this.children = {
			...this.children,
		};
	}

	renderPublic() {
		return `
    <div>
        <div class="{{avatarStyle}}">
		{{log "Avatar content:" props}}
        	{{#if path}}
        	<img src="https://ya-praktikum.tech/api/v2/resources/{{ path }}" alt="Profile" />
        	{{else}}
        	<img src="https://github.com/DoneAlejandro/yandex-praktikum/blob/sprint_1/src/assets/img/kchay.jpg?raw=true" alt="name">
			{{/if}}
        </div>
    </div>
    `;
	}
}
