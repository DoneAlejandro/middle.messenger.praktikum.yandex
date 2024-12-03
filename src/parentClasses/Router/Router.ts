import Block from "../Block/BLock";
import { PagesPaths } from "./pathEnum";
import Route from "./Route";

class Router {
	private routes: Route[] = [];
	private history: History = window.history;
	private _currentRoute: Route | undefined = undefined;
	private _rootQuery: string = "";
	static __instance: Router;

	constructor(rootQuery: string) {
		if (Router.__instance) {
			return Router.__instance;
		}

		this.routes = [];
		this.history = window.history;
		this._currentRoute = undefined;
		this._rootQuery = rootQuery;

		Router.__instance = this;
	}

	use(pathname: PagesPaths, block: Block) {
		const route = new Route(pathname, block, { rootQuery: this._rootQuery });
		this.routes.push(route);
		return this;
	}

	start() {
		window.onpopstate = ((event: PopStateEvent) => {
			const targetWindow = event.currentTarget as Window;
			this._onRoute(targetWindow!.location.pathname as PagesPaths);
		}).bind(this);
		this._onRoute(window.location.pathname as PagesPaths);
	}

	_onRoute(pathname: PagesPaths) {
		console.log(`Routing to: ${pathname}`);
		let route = this.getRoute(pathname);

		if (!route) {
			route = this.getRoute(PagesPaths.ERROR_FOURTH);
		}

		if (this._currentRoute) {
			this._currentRoute.leave();
		}

		this._currentRoute = route;

		if (route) {
			route.render();
		} else {
			console.error(`Route not found for: ${pathname}`);
		}
	}

	go(pathname: PagesPaths) {
		this.history.pushState({}, "", pathname);
		this._onRoute(pathname);
	}

	back() {
		this.history.back();
	}

	forward() {
		this.history.forward();
	}

	getRoute(pathname: PagesPaths) {
		const route = this.routes.find(route => route.match(pathname));
		if (!route) {
			return this.routes.find(route => route.match(pathname));
		}
		return route;
	}
}

export default Router;
