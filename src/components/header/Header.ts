import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import { Title } from '../title';
import headerTemplate from './header.hbs?raw';

export class Header extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	render() {
		// const title = new Title({
		// 	titleText: this.props.titleText,
		// });
		return this.compile(headerTemplate, { ...this.props,  });
	}
}


