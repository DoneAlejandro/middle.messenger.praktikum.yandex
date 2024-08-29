import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import headerTemplate from './header.hbs?raw';

export class Header extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	render() {
		// console.log(`header ${headerTemplate} ${JSON.stringify(this.props)}`);
		return this.compile(headerTemplate, { ...this.props });
	}
}
