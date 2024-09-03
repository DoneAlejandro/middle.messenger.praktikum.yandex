import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import copyrightTemplate from './copyright.hbs?raw';

export class Copyright extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	render() {
		return this.compile(copyrightTemplate, this.props );
	}
}
