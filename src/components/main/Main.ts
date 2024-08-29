import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import main from './main.hbs?raw';

export class Main extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	render(): HTMLElement {
		console.log(`main ${main} ${JSON.stringify(this.props)}`);
		return this.compile(main, {...this.props});
	}
}
