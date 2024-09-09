import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import main from './main.hbs?raw';

export class Main extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	render() {
		return this.compile(main, { ...this.props });
	}
}
