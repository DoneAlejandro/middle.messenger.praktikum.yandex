import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import inputTemplate from './input.hbs?raw';
export class Input extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	render() {
		return this.compile(inputTemplate, this.props);
	}
}
