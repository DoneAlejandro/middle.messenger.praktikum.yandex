import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import ErrorTextTemplate from './error-text.hbs?raw';

export class ErrorText extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	render() {
		return this.compile(ErrorTextTemplate, this.props);
	}
}
