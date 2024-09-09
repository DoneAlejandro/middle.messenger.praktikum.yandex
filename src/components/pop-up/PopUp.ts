import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import popUpTemplate from './pop-up.hbs?raw';

export class PopUp extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}

	render() {
		return this.compile(popUpTemplate, this.props);
	}
}
