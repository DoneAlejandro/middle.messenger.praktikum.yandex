import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import subtitle from './subtitle.hbs?raw';

export class Subtitle extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	render() {
		return this.compile(subtitle, this.props);
	}
}
