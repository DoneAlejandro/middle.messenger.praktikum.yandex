import Block from '../../parentClasses/Block/BLock';
import { TBlock } from '../../parentClasses/types';
import menuBurgerTemplate from './menu-burger.hbs?raw';

export class MenuBurger extends Block {
	constructor(props: TBlock) {
		super({ ...props });
	}
	render() {
		return this.compile(menuBurgerTemplate, this.props);
	}
}
