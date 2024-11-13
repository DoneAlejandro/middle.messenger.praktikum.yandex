import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";
export class Form extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}

	renderPublic() {
		return `
		<section class="{{#if sectionStyle}} {{{sectionStyle}}}{{/if}}">
			{{{ subtitleComponent }}}
			<form class="{{formStyle}}" onsubmit="return false;">
				<div class="{{formContainerStyle}}">
					<div class="{{formInputsStyle}}">
						{{{ InputContentComponent }}}
					</div>
					{{{ ButtonComponent}}}
				</div>
				<button type="submit" class="{{#if buttonStyle}} {{{ buttonStyle }}}{{/if}}">
					Отправить форму
				</button>
				{{{ LinkComponent }}}
			</form>
		</section>
		`;
		// this.compile(form, this.props);
	}
}
