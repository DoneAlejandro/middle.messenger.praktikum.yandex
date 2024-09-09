import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import linkTemplate from './link.hbs?raw';

export class Link extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}

	render() {
		return this.compile(linkTemplate, this.props);
	}
}
