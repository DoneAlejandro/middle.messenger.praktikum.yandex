import Block from '../Block/BLock';
import { PagesPaths } from './pathEnum';

interface IRoteProps {
	rootQuery: string;
}

class Route {
	private _pathname: PagesPaths;
	private _blockClass: Block;
	private _block: Block | null;
	private _props: IRoteProps;
	private _root: HTMLElement | null;
	constructor(pathname: PagesPaths, view: Block, props: IRoteProps) {
		this._pathname = pathname;
		this._blockClass = view;
		this._block = null;
		this._props = props;
		this._root = document.querySelector(this._props.rootQuery);
	}

	navigate(pathname: PagesPaths) {
		if (this.match(pathname)) {
			this._pathname = pathname;
			this.render();
		}
	}

	leave() {
		if (this._root) {
			this._root.innerHTML = '';
			this._block?.dispatchComponentDidMount();
		} else {
			console.error('Root not found');
		}
	}

	match(pathname: PagesPaths) {
		return pathname === this._pathname;
	}

	_renderDom(query: string, block: Block) {
		const root = document.querySelector(query);
		if (root) {
			root.innerHTML = '';
			root!.append(block.getContent());
		}
	}

	render() {
		if (!this._block) {
			this._block = this._blockClass;
			this._renderDom(this._props.rootQuery, this._block);
			return;
		}
	}
}

export default Route;
