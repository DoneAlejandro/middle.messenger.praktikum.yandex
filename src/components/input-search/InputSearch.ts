import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import inputSearchTemplate from './input-search.hbs?raw';

export class InputSearch extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}

	render() {
		return this.compile(inputSearchTemplate, this.props);
	}
}
