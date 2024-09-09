import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import buttonTemplate from './button.hbs?raw';

export class Button extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	render() {
		return this.compile(buttonTemplate, this.props);
	}
}
