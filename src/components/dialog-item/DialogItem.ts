import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import DialogItemTemplate from './dialog-item.hbs?raw';

export class DialogItem extends Block {
	constructor(props: TBlock) {
		super({
			...props,
		});
	}

	render() {
		return this.compile(DialogItemTemplate, this.props);
	}
}
