import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import headerTemplate from './header.hbs?raw';

export class Header extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	render() {
		return this.compile(headerTemplate, { ...this.props });
	}
}
