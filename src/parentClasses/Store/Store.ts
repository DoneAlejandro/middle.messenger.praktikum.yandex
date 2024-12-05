import EventBus from "../eventBus/EventBus";

export enum StoreEvents {
	Updated = "Updated",
}

type TState = {
	[key: string]: unknown | any;
};

export class Store extends EventBus {
	private state: TState = {};

	public static __instance: Store;

	constructor(defaultState: TState) {
		if (Store.__instance) {
			return Store.__instance;
		}
		super();

		this.state = defaultState;
		this.set(defaultState);

		Store.__instance = this;
	}

	public getState() {
		return this.state;
	}

	public set(nextState: TState) {
		const prevState = { ...this.state };

		this.state = { ...this.state, ...nextState };

		this.emit(StoreEvents.Updated, prevState, nextState);
	}
}
