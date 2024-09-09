import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import form from './form.hbs?raw';
export class Form extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}

	render() {
		return this.compile(form, this.props);
	}
}
