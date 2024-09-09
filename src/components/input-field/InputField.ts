import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import inputTemplate from './input-field.hbs?raw';

export class InputField extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	render() {
		return this.compile(inputTemplate, this.props);
	}
}
