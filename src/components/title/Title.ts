import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import title from './title.hbs?raw';

export class Title extends Block {
	constructor(props: TBlock) {
		super(props);
	}
	render() {
		console.log(`title ${title} this.compile(title, this.props) ${this.compile(title, this.props)}`);
		
		return this.compile(title, this.props);
	}
}
