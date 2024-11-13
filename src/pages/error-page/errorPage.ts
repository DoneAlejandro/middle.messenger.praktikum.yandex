import { Copyright, ErrorCode, ErrorText, Footer, Header, Link, Title } from "../../components";
import Block from "../../parentClasses/Block/BLock";
import { TBlock } from "../../parentClasses/types";

export class ErrorPage extends Block {
	constructor(props: TBlock) {
		super({
			...props,
			HeaderComponent: new Header({
				title: new Title({
					titleText: "ONE-on-ONE Social",
				}),
			}),
			ErrorCodeComponent: new ErrorCode({
				code: "500",
				className: "error__code",
			}),
			ErrorTextComponent: new ErrorText({
				text: "Мы уже фиксим",
				className: "error__text",
			}),
			ErrorLinkComponent: new Link({
				text: "Назад к чатам",
				href: "/messenger",
				className: "error__link",
			}),
			FooterComponent: new Footer({
				copyrightComponent: new Copyright({
					copyright: "© 2024 DoneAlejandro. Все права защищены.",
				}),
			}),
		});
	}

	renderPublic() {
		return `
		<div class='page'>
			{{{ HeaderComponent }}}
			<main class='main main-error'>
				<section class='error'>
					{{{ ErrorCodeComponent }}}
					<img src='https://github.com/DoneAlejandro/yandex-praktikum/blob/sprint_1/src/assets/img/fixiki.png?raw=true' alt='fixiki'>
					{{{ ErrorTextComponent }}}
					{{{ ErrorLinkComponent }}}
				</section>
			</main>
		{{{ FooterComponent }}}
		</div>
		`;
		// this.compile(ErrorPageTemplate, this.props);
	}
}
