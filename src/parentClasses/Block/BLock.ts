import * as Handlebars from 'handlebars';
import { nanoid } from 'nanoid';
import EventBus from '../eventBus/EventBus';
import { ChildrenType, ListType, TBlock } from '../types';

export default class Block {
	// События
	public static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	};

	// Свойства
	public props: TBlock = {
		id: '',
		events: {},
		attr: {},
	};
	public children: ChildrenType = {};
	public list: ListType = {};
	public firstRender = false;
	private element: HTMLElement = document.createElement('div');
	private id: string;
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

	// Метод для компиляции шаблона с пропсами
	public compile(template: string, props: TBlock) {
		const propsAndStubs = { ...props };

		// Используем заглушки
		Object.entries(this.children).forEach(([key, child]) => {
			propsAndStubs[key] = `<div data-id="${child.props.id}"></div>`;
		});

		const tmpId = nanoid(6);
		Object.entries(this.list).forEach(([key]) => {
			propsAndStubs[key] = `<div data-id="__l_${tmpId}"></div>`;
		});

		// Создаем шаблон
		const fragment = document.createElement('template') as HTMLTemplateElement;
		fragment.setAttribute('data-id', this.id);
		fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

		// Заменяем заглушки на реальные компоненты
		Object.values(this.children).forEach(child => {
			const stub = fragment.content.querySelector(`[data-id="${child.props.id}"]`);
			stub?.replaceWith(child.getContent());
		});

		// Меняем заглушки списка на реальные элементы списка
		Object.entries(this.list).forEach(([key]) => {
			const child = this.list[key];
			const listTemp = document.createElement('template') as HTMLTemplateElement;
			child.forEach(item => {
				item instanceof Block ? listTemp.content.append(item.getContent()) : listTemp.content.append(`${item}`);
			});
			const stub = fragment.content.querySelector(`[data-id="__l_${tmpId}"]`);
			stub?.replaceWith(listTemp.content);
		});

		return fragment.content as unknown as HTMLElement;
	}

	// Метод для рендеринга элемента
	private renderElement() {
		const templ = this.render();
		console.log(`templ ${templ}`);
		if (this.element) {
			this.element.replaceWith(templ);
		}
		this.element = templ;
		this.addEvents();
		this.addAttributes();
	}

	// Метод для рендеринга компонента
	public render(): HTMLElement {
		console.log('asdda');

		return this.getContent();
	}

	// Инициализация компонента
	public init() {
		console.log('sdfsdfsdfsdf3442');

		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	// Установка новых пропсов
	public setProps(nextProps: typeof this.props) {
		if (!nextProps) {
			return;
		}
		const { props, list } = this.getChildrenAndProps(nextProps);
		Object.assign(this.props, props);
		Object.assign(this.list, list);
	}

	// Получаем содержимое элемента
	public getContent(): HTMLElement {
		return this.element;
	}

	// Метод, вызываемый при монтировании компонента
	private componentDidMount(props: TBlock) {
		this.componentDidMountPublic(props);
		Object.values(this.children).forEach(child => {
			child.dispatchComponentDidMount();
		});
		if (!this.firstRender) {
			this.firstRender = true;
		}
	}

	// Метод для диспатча события монтирования
	public dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM, this.props);
	}

	// Метод монтирования компонента, может быть переопределен в наследуемых классах
	public componentDidMountPublic(props: TBlock) {
		return !props ? false : true;
	}

	// Обновление компонента при изменении пропсов
	private componentDidUpdatePrivate(oldProps: TBlock, newProps: TBlock) {
		if (oldProps?.events) {
			const { events } = oldProps;
			Object.keys(events).forEach(eventName => {
				this.element.removeEventListener(eventName, events[eventName]);
			});
			const response = this.componentDidUpdate(oldProps, newProps);
			if (!response) {
				return;
			}
			this.renderElement();
		}
	}

	// Метод обновления компонента, может быть переопределен в наследуемых классах
	public componentDidUpdate(oldProps: TBlock, newProps: TBlock): boolean {
		return !oldProps || !newProps ? false : true;
	}

	// Регистрация событий в EventBus
	private registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this.componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this.componentDidUpdatePrivate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this.renderElement.bind(this));
	}

	// Добавление событий к элементу
	private addEvents() {
		console.log(`event added: ${this.props.events}`);
		const { events = {} } = this.props;
		Object.keys(events).forEach(eventName => {
			this.element.addEventListener(eventName, events[eventName]);
			console.log(`Event ${eventName} added to`, this.element);
			console.log(`event removed: ${eventName}`);
		});
	}

	// Метод вытаскивания переменных из пропсов
	private getChildrenAndProps(propsWithChildren: TBlock) {
		const props: TBlock = {};
		const children: ChildrenType = {};
		const list: ListType = {};

		Object.entries(propsWithChildren).forEach(([key, value]) => {
			if (value instanceof Block) {
				children[key] = value;
			} else if (Array.isArray(value)) {
				list[key] = value;
			} else {
				props[key] = value;
			}
		});
		return { props, children, list };
	}

	// Добавление атрибутов к элементу
	public addAttributes() {
		const { attr = {} } = this.props;

		Object.entries(attr).forEach(([key, value]) => {
			if (typeof value === 'string') {
				this.element.setAttribute(key, value);
			}
		});
	}

	// Метод для создания прокси объекта
	private makePropsProxy(props: TBlock) {
		return new Proxy(props, {
			get: (target, prop: string | symbol) => {
				const value = target[prop as string];
				return typeof value === 'function' ? value.bind(target) : value; // Если значение - функция, биндим контекст
			},

			set: (target, prop: string, value) => {
				const oldTarget = { ...target };
				target[prop] = value;
				this.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...oldTarget }, { ...target });
				return true;
			},

			deleteProperty: () => {
				throw new Error('Нет доступа');
			},
		});
	}
}
