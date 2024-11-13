import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";

export class PopUp extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}

	renderPublic() {
		return `
		<div class='popup'>
			<div class='popup__content'>
				<nav class='popup__nav'>
					<ul class='popup__list'>
						<li class='popup__item'>
							{{{ linkSignIn }}}
						</li>
						<li>
							{{{ linkRegistration }}}
						</li>
						<li>
							{{{ linkProfile }}}
						</li>
						<li>
							{{{ linkChat }}}
						</li>
						<li>
							{{{ linkErrorFifth }}}
						</li>
						<li>
							{{{ linkErrorFourth }}}
						</li>
					</ul>
				</nav>
			</div>
		</div>
		`;
		// this.compile(popUpTemplate, this.props);
	}
}
