// import Handlebars from 'handlebars';
// import EventBus from '../eventBus/EventBus';
// import { ChildrenType, IEventBus, ListType, PropsType } from '../types';

// export default class Block {
// 	static EVENTS = {
// 		INIT: 'init',
// 		FLOW_CDM: 'flow:component-did-mount',
// 		FLOW_CDU: 'flow:component-did-update',
// 		FLOW_RENDER: 'flow:render',
// 	};

// 	_element: HTMLElement | null = null;
// 	_id = Math.floor(100000 + Math.random() * 900000);
// 	private props: PropsType;
// 	private children: ChildrenType;
// 	private lists: ListType;
// 	private eventBus: () => IEventBus;

// 	constructor(propsWithChildren: PropsType = {}) {
// 		const eventBus = new EventBus() as IEventBus;
// 		const { props, children, lists } = this._getChildrenPropsAndProps(propsWithChildren);
// 		this.props = this._makePropsProxy({ ...props });
// 		this.children = children;
// 		this.lists = lists;
// 		this.eventBus = () => eventBus;
// 		this._registerEvents(eventBus);
// 		eventBus.emit(Block.EVENTS.INIT);
// 	}

// 	_addEvents(): void {
// 		const { events = {} } = this.props;
// 		Object.keys(events).forEach(eventName => {
// 			if (this._element) {
// 				(this._element as HTMLElement).addEventListener(eventName, events[eventName]);
// 			}
// 		});
// 	}

// 	_registerEvents(eventBus: IEventBus): void {
// 		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
// 		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
// 		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
// 		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
// 	}

// 	init(): void {
// 		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
// 	}

// 	_componentDidMount(): void {
// 		this.componentDidMount();
// 		Object.values(this.children).forEach(child => {
// 			child.dispatchComponentDidMount();
// 		});
// 	}

// 	componentDidMount(oldProps?: PropsType): void {}

// 	dispatchComponentDidMount(): void {
// 		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
// 	}

// 	_componentDidUpdate(oldProps: PropsType, newProps: PropsType): void {
// 		const response = this.componentDidUpdate(oldProps, newProps);
// 		if (!response) {
// 			return;
// 		}
// 		this._render();
// 	}

// 	componentDidUpdate(oldProps: PropsType, newProps: PropsType): boolean {
// 		return true;
// 	}

// 	_getChildrenPropsAndProps(propsAndChildren: PropsType): { children: ChildrenType; props: PropsType; lists: ListType } {
// 		const children: ChildrenType = {};
// 		const props: PropsType = {};
// 		const lists: ListType = {};

// 		Object.entries(propsAndChildren).forEach(([key, value]) => {
// 			if (value instanceof Block) {
// 				children[key] = value;
// 			} else if (Array.isArray(value)) {
// 				lists[key] = value;
// 			} else {
// 				props[key] = value;
// 			}
// 		});

// 		return { children, props, lists };
// 	}

// 	addAttributes(): void {
// 		const { attr = {} } = this.props;

// 		Object.entries(attr).forEach(([key, value]) => {
// 			if (typeof value === 'string') {
// 				(this._element as HTMLElement).setAttribute(key, value);
// 			}
// 		});
// 	}

// 	setProps = (nextProps: PropsType): void => {
// 		if (!nextProps) {
// 			return;
// 		}

// 		Object.assign(this.props, nextProps);
// 	};

// 	get element(): HTMLElement | null {
// 		return this._element;
// 	}

// 	_render(): void {
// 		console.log('Render');
// 		const propsAndStubs = { ...this.props };
// 		const _tmpId = Math.floor(100000 + Math.random() * 900000);

// 		Object.entries(this.children).forEach(([key, child]) => {
// 			propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
// 		});

// 		Object.entries(this.lists).forEach(([key, child]) => {
// 			propsAndStubs[key] = `<div data-id="__l_${_tmpId}"></div>`;
// 		});

// 		const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
// 		fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

// 		//comment if you want to see
// 		Object.values(this.children).forEach(child => {
// 			const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
// 			if (stub && child.getContent()) {
// 				const content = child.getContent();
// 				if (content) {
// 					stub.replaceWith(content);
// 				}
// 			}
// 		});

// 		Object.entries(this.lists).forEach(([key, child]) => {
// 			const listCont = this._createDocumentElement('template') as HTMLTemplateElement;
// 			child.forEach(item => {
// 				if (item instanceof Block) {
// 					const content = item.getContent();
// 					if (content) {
// 						listCont.content.append(content);
// 					}
// 				} else {
// 					listCont.content.append(`${item}`);
// 				}
// 			});
// 			const stub = fragment.content.querySelector(`[data-id="__l_${_tmpId}"]`);
// 			if (stub) {
// 				stub.replaceWith(listCont.content);
// 			}
// 		});

// 		const newElement = fragment.content.firstElementChild as HTMLElement | null;
// 		if (this._element && newElement) {
// 			this._element.replaceWith(newElement);
// 		}
// 		this._element = newElement;
// 		this._addEvents();
// 		this.addAttributes();
// 	}

// 	render(): string {
// 		return '';
// 	}

// 	getContent(): HTMLElement | null {
// 		return this.element;
// 	}

// 	_makePropsProxy(props: PropsType): PropsType {
// 		const self = this;

// 		return new Proxy(props, {
// 			get(target, prop: string) {
// 				const value = target[prop];
// 				return typeof value === 'function' ? value.bind(target) : value;
// 			},
// 			set(target, prop: string, value) {
// 				const oldTarget = { ...target };
// 				target[prop] = value;
// 				self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
// 				return true;
// 			},
// 			deleteProperty() {
// 				throw new Error('No access');
// 			},
// 		});
// 	}

// 	_createDocumentElement(tagName: string) {
// 		return document.createElement(tagName);
// 	}

// 	show() {
// 		const content = this.getContent();
// 		if (content) {
// 			content.style.display = 'block';
// 		}
// 	}

// 	hide() {
// 		const content = this.getContent();
// 		if (content) {
// 			content.style.display = 'none';
// 		}
// 	}
// }

