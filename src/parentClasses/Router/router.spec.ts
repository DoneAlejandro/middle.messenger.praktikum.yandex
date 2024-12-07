import { expect } from "chai";
import { JSDOM } from "jsdom";
import sinon from "sinon";
import Block from "../Block/BLock.ts";
import { PagesPaths } from "./pathEnum.ts";
import Router from "./Router.ts";

class MockBlock extends Block {
	constructor() {
		super({});
	}

	getContent() {
		const element = document.createElement("div");
		element.textContent = "Mock Block Content";
		return element;
	}
}

describe("Router", () => {
	let router: Router;
	let mockBlock: MockBlock;

	before(() => {
		const dom = new JSDOM("<!doctype html><html><body></body></html>", {
			url: "http://localhost/",
		});
		global.window = dom.window as unknown as Window & typeof globalThis;
		global.document = dom.window.document;
		global.history = dom.window.history;
	});

	beforeEach(() => {
		router = new Router("#app");
		mockBlock = new MockBlock();
	});

	afterEach(() => {
		sinon.restore();
	});

	it("should initialize as a singleton", () => {
		const routerInstance2 = new Router("#app");
		expect(router).to.equal(routerInstance2);
	});

	it("should add routes using the use method", () => {
		router.use(PagesPaths.SIGNIN, mockBlock);
		expect(router["routes"]).to.have.lengthOf(1);
	});

	it("should navigate to the correct route using the go method", () => {
		const onRouteSpy = sinon.spy(router as any, "_onRoute");
		router.use(PagesPaths.SIGNIN, mockBlock);
		router.go(PagesPaths.SIGNIN);

		expect(onRouteSpy.calledOnceWith(PagesPaths.SIGNIN)).to.be.true;
	});
});
