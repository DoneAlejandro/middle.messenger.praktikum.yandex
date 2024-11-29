import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";
export class Form extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}


	renderPublic() {
		return `
		<section class="{{#if sectionStyle}} {{sectionStyle}}{{/if}}">
			{{{ subtitleComponent }}}
			<form class="{{formStyle}}" onsubmit="return false;">
				<div class="{{formContainerStyle}}">
					<div class="{{formInputsStyle}}">
						{{{ InputFieldLoginComponent }}}
						{{{ InputFieldPasswordComponent }}}
						{{{ InputFieldPasswordRetryComponent }}}
						{{{ InputFieldNameComponent }}}
						{{{ InputFieldSecondNameComponent }}}
						{{{ InputFieldPhoneComponent }}}
						{{{ InputFieldMailComponent }}}
					</div>
					{{{ ButtonComponent}}}
				</div>
				{{{ LinkComponent }}}
			</form>
		</section>
		`;
		// this.compile(form, this.props);
	}
}
