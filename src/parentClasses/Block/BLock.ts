// import * as Handlebars from 'handlebars';
// import { nanoid } from 'nanoid';
// import EventBus from '../eventBus/EventBus';
// import { ChildrenType, ListType, TBlock } from '../types';

// export default class Block {
// 	// События
// 	public static EVENTS = {
// 		INIT: 'init',
// 		FLOW_CDM: 'flow:component-did-mount',
// 		FLOW_CDU: 'flow:component-did-update',
// 		FLOW_RENDER: 'flow:render',
// 	};

// 	// Свойства
// 	public props: TBlock = { добавлено
// 		id: '',
// 		events: {},
// 		attr: {},
// 	};
// 	public children: ChildrenType = {}; добавлено
// 	public list: ListType = {}; добавлено
// 	public firstRender = false;добавлено
// 	private element: HTMLElement = document.createElement('div');добавлено
// 	private id: string;добавлено
// 	public eventBus: () => EventBus;добавлено

// 	constructor(propsWithChildren: TBlock) {
// 		const { props, children, list } = this.getChildrenAndProps(propsWithChildren);
// 		this.id = nanoid(6);
// 		this.children = children;
// 		this.list = this.makePropsProxy({ ...list }) as typeof this.list;
// 		this.props = this.makePropsProxy({ ...props, id: this.id });
// 		const eventBus = new EventBus();
// 		this.eventBus = () => eventBus;
// 		this.registerEvents(eventBus);
// 		eventBus.emit(Block.EVENTS.INIT);
// 	}

// 	// Метод для компиляции шаблона с пропсами
// 	public compile(template: string, props: TBlock) {
// 		const propsAndStubs = { ...props };

// 		// Используем заглушки
// 		Object.entries(this.children).forEach(([key, child]) => {
// 			propsAndStubs[key] = `<div data-id="${child.props.id}"></div>`;
// 		});

// 		const tmpId = nanoid(6);
// 		Object.entries(this.list).forEach(([key]) => {
// 			propsAndStubs[key] = `<div data-id="__l_${tmpId}"></div>`;
// 		});

// 		// Создаем шаблон
// 		const fragment = document.createElement('template') as HTMLTemplateElement;
// 		fragment.setAttribute('data-id', this.id);
// 		fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

// 		// Заменяем заглушки на реальные компоненты
// 		Object.values(this.children).forEach(child => {
// 			const stub = fragment.content.querySelector(`[data-id="${child.props.id}"]`);
// 			stub?.replaceWith(child.getContent());
// 		});

// 		// Меняем заглушки списка на реальные элементы списка
// 		Object.entries(this.list).forEach(([key]) => {
// 			const child = this.list[key];
// 			const listTemp = document.createElement('template') as HTMLTemplateElement;
// 			child.forEach(item => {
// 				item instanceof Block ? listTemp.content.append(item.getContent()) : listTemp.content.append(`${item}`);
// 			});
// 			const stub = fragment.content.querySelector(`[data-id="__l_${tmpId}"]`);
// 			stub?.replaceWith(listTemp.content);
// 		});

// 		return fragment.content.firstChild as unknown as HTMLElement;
// 	}

// 	// Метод для рендеринга элемента
// 	private renderElement() {
// 		const templ = this.render();
// 		this.removeEvents();
// 		if (this.element) {
// 			this.element.replaceWith(templ);
// 		}
// 		this.element = templ;
// 		this.addEvents();
// 		this.addAttributes();
// 	}

// 	// Метод для рендеринга компонента
// 	public render(): HTMLElement | any {
// 		return this.getContent();
// 	}

// 	// Инициализация компонента
// 	public init() {
// 		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
// 	}

// 	// Установка новых пропсов
// 	public setProps(nextProps: typeof this.props) {
// 		if (!nextProps) {
// 			return;
// 		}
// 		const { props, list } = this.getChildrenAndProps(nextProps);
// 		Object.assign(this.props, props);
// 		Object.assign(this.list, list);
// 	}

// 	// Получаем содержимое элемента
// 	public getContent(): HTMLElement {
// 		return this.element;
// 	}

// 	// Метод, вызываемый при монтировании компонента
// 	private componentDidMount(props: TBlock) {
// 		this.componentDidMountPublic(props);
// 		Object.values(this.children).forEach(child => {
// 			child.dispatchComponentDidMount();
// 		});
// 		if (!this.firstRender) {
// 			this.firstRender = true;
// 		}
// 	}

// 	// Метод для диспатча события монтирования
// 	public dispatchComponentDidMount() {
// 		this.eventBus().emit(Block.EVENTS.FLOW_CDM, this.props);
// 	}

// 	// Метод монтирования компонента, может быть переопределен в наследуемых классах
// 	public componentDidMountPublic(props: TBlock) {
// 		return !props ? false : true;
// 	}

// 	// Обновление компонента при изменении пропсов
// 	private componentDidUpdatePrivate(oldProps: TBlock, newProps: TBlock) {
// 		if (oldProps?.events) {
// 			const { events } = oldProps;
// 			Object.keys(events).forEach(eventName => {
// 				this.element.removeEventListener(eventName, events[eventName]);
// 			});
// 			const response = this.componentDidUpdate(oldProps, newProps);
// 			if (!response) {
// 				return;
// 			}
// 			this.renderElement();
// 		}
// 	}

// 	// Метод обновления компонента, может быть переопределен в наследуемых классах
// 	public componentDidUpdate(oldProps: TBlock, newProps: TBlock): boolean {
// 		return !oldProps || !newProps ? false : true;
// 	}

// 	// Регистрация событий в EventBus
// 	private registerEvents(eventBus: EventBus) {
// 		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
// 		eventBus.on(Block.EVENTS.FLOW_CDM, this.componentDidMount.bind(this));
// 		eventBus.on(Block.EVENTS.FLOW_CDU, this.componentDidUpdatePrivate.bind(this));
// 		eventBus.on(Block.EVENTS.FLOW_RENDER, this.renderElement.bind(this));
// 	}

// 	// Добавление событий к элементу
// 	private addEvents() {
// 		const { events = {} } = this.props;

// 		Object.keys(events).forEach(eventName => {
// 			this.element.addEventListener(eventName, events[eventName]);
// 		});
// 	}

// 	// Метод для удаления событий
// 	private removeEvents() {
// 		const { events = {} } = this.props;
// 		Object.keys(events).forEach(eventName => {
// 			this.element?.removeEventListener(eventName, events[eventName]);
// 		});
// 	}

// 	// Метод вытаскивания переменных из пропсов
// 	private getChildrenAndProps(propsWithChildren: TBlock) {
// 		const props: TBlock = {};
// 		const children: ChildrenType = {};
// 		const list: ListType = {};

// 		Object.entries(propsWithChildren).forEach(([key, value]) => {
// 			if (value instanceof Block) {
// 				children[key] = value;
// 			} else if (Array.isArray(value)) {
// 				list[key] = value;
// 			} else {
// 				props[key] = value;
// 			}
// 		});
// 		return { props, children, list };
// 	}

// 	// Добавление атрибутов к элементу
// 	public addAttributes() {
// 		const { attr = {} } = this.props;

// 		Object.entries(attr).forEach(([key, value]) => {
// 			if (typeof value === 'string') {
// 				this.element.setAttribute(key, value);
// 			}
// 		});
// 	}

// 	// Метод для создания прокси объекта
// 	private makePropsProxy(props: TBlock) {
// 		return new Proxy(props, {
// 			get: (target, prop: string | symbol) => {
// 				const value = target[prop as string];
// 				return typeof value === 'function' ? value.bind(target) : value; // Если значение - функция, биндим контекст
// 			},

// 			set: (target, prop: string, value) => {
// 				const oldTarget = { ...target };
// 				target[prop] = value;
// 				this.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...oldTarget }, { ...target });
// 				return true;
// 			},

// 			deleteProperty: () => {
// 				throw new Error('Нет доступа');
// 			},
// 		});
// 	}
// 	show() {
//         this.getContent().style.display = 'flex'
//     }

//     hide() {
//         this.getContent().style.display = 'none'
//     }
// }
import Handlebars from "handlebars";
import { nanoid } from "nanoid";
import EventBus from "../eventBus/EventBus";
import { ChildrenType, ListType, TBlock } from "../types";

class Block {
	static EVENTS: { [key: string]: string } = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render",
		BEFORE_MOUNT: "before:mount",
	};
	// Приватные свойства
	private element: HTMLElement = document.createElement("div");
	private id: string;

	// Публичные свойства
	public props: TBlock = {
		id: "",
		events: {},
		attr: {},
	};
	// name: string;
	public children: ChildrenType = {};
	public list: ListType = {};
	public firstRender = false;
	public eventBus: () => EventBus;

	constructor(propsWithChildren: TBlock) {
		const { props, children, list } = this.getChildrenAndProps(propsWithChildren);
		this.id = nanoid(6);
		this.children = children;
		this.list = this.makePropsProxy({ ...list }) as typeof this.list;
		this.props = this.makePropsProxy({ ...props, id: this.id });
		const eventBus = new EventBus();
		this.eventBus = () => eventBus;
		this.registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	// Добавление событий к элементу
	private addEvents(): void {
		const { events = {} } = this.props;

		Object.keys(events).forEach(item => {
			const [eventName, selector] = item.split("|"); // хак для случаев, когда надо навесить событие на элемент внутри шаблона

			const targetElement = selector ? this.element?.querySelector(selector) : this.element;

			if (targetElement) targetElement.addEventListener(eventName, events[item]);
		});
	}

	// Метод для удаления событий
	private removeEvents(): void {
		const { events = {} } = this.props;

		Object.keys(events).forEach(item => {
			const [eventName, selector] = item.split("|");
			const handler = events[item];
			const targetElement = selector ? this.element?.querySelector(selector) : this.element;

			if (targetElement) targetElement.removeEventListener(eventName, handler);
		});
	}

	// Регистрация событий в EventBus
	private registerEvents(eventBus: EventBus): void {
		// этапы жизненного цикла
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this.componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this.componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this.render.bind(this));
		eventBus.on(Block.EVENTS.BEFORE_MOUNT, this.beforeMount.bind(this));
	}

	// Инициализация компонента
	private init() {
		this.initPublic();
		// запуск рендера
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}
	public initPublic(): void {}

	// Метод, вызываемый при монтировании компонента
	private componentDidMount() {
		this.eventBus().emit(Block.EVENTS.BEFORE_MOUNT);
		this.componentDidMountPublic();

		Object.values(this.children).forEach(child => {
			child.dispatchComponentDidMount();
		});
	}
	public componentDidMountPublic(_oldProps: TBlock = {}): void {}
	public beforeMount(): void {}

	// Метод для диспатча события монтирования
	public dispatchComponentDidMount(): void {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	// Обновление компонента при изменении пропсов
	private componentDidUpdate(oldProps?: TBlock, newProps?: TBlock): void {
		// вызывается при обновлении свойств компонента
		const response = this.componentDidUpdatePublic(oldProps, newProps);
		if (!response) return;

		this.render();
	}
	public componentDidUpdatePublic(_oldProps?: TBlock, _newProps?: TBlock): boolean {
		return true;
	}

	// Метод вытаскивания переменных из пропсов
	private getChildrenAndProps(propsWithChildren: TBlock): { props: TBlock; children: ChildrenType; list: ListType } {
		const children: ChildrenType = {};
		const props: TBlock = {};
		const list: ListType = {};

		Object.entries(propsWithChildren).forEach(([key, value]) => {
			if (value instanceof Block) {
				children[key] = value;
			} else if (Array.isArray(value)) {
				list[key] = value;
			} else props[key] = value;
		});

		return { props, children, list };
	}

	// Установка новых пропсов
	public setProps(nextProps: TBlock) {
		if (!nextProps) return;
		Object.assign(this.props, nextProps);
		// const { props, list } = this.getChildrenAndProps(nextProps);
		// Object.assign(this.props, props);
		// Object.assign(this.list, list);
	}

	// Возвращает DOM-элемент компонента
	public getElement(): HTMLElement | null {
		return this.element;
	}

	// Метод для рендеринга шаблона с пропсами
	private render(): void {
		const propsAndStubs = { ...this.props };

		Object.entries(this.children).forEach(([key, child]) => {
			if (child instanceof Array) return;
			propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
		});

		this.removeEvents();

		const fragment = this.createDocumentElement("template") as HTMLTemplateElement;
		fragment.innerHTML = Handlebars.compile(this.renderPublic())(propsAndStubs);

		const newElement = fragment.content.firstElementChild as HTMLElement;

		Object.values(this.children).forEach(child => {
			if (child instanceof Array) return;
			const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
			stub?.replaceWith(child.getContent()!);
		});

		if (this.element) this.element.replaceWith(newElement);

		this.element = newElement;

		this.addEvents();
	}
	public renderPublic(): string {
		return "";
	}

	// возвращает DOM-элемент компонента
	public getContent(): Node | string {
		if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE)
			setTimeout(() => {
				if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) this.dispatchComponentDidMount();
			}, 100);

		return this.element;
	}

	// Метод для создания прокси объекта
	private makePropsProxy(props: TBlock): TBlock {
		// Можно и так передать this
		// Такой способ больше не применяется с приходом ES6+
		// const self = this;

		return new Proxy(props, {
			get: (target, prop: string) => {
				const value = target[prop];
				return typeof value === "function" ? value.bind(target) : value;
			},
			set: (target, prop: string, value) => {
				const oldTarget = { ...target };
				target[prop] = value;
				// Запускаем обновление компоненты
				this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
				return true;
			},
			deleteProperty: () => {
				throw new Error("Нет доступа");
			},
		});
	}

	private createDocumentElement(tagName: string): HTMLElement | HTMLTemplateElement {
		return document.createElement(tagName);
	}

	show(): void {
		const content = this.getContent() as HTMLElement | null;
		if (content) content.style.display = "block";
	}

	hide(): void {
		const content = this.getContent() as HTMLElement | null;
		if (content) content.style.display = "none";
	}
}

export default Block;
