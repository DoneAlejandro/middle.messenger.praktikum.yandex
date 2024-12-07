import { expect } from "chai";
import { JSDOM } from "jsdom";
import sinon from "sinon";
import Block from "../Block/BLock.ts";
import Route from "./Route.ts";
import { PagesPaths } from "./pathEnum.ts";

describe("Route", () => {
	let route: Route;
	let blockMock: Block;
	let dom: JSDOM;

	const rootQuery = "#app";

	beforeEach(() => {
		// Эмулируем DOM
		dom = new JSDOM("<!DOCTYPE html><html><body><div id='app'></div></body></html>");

		// Присваиваем глобальные объекты с кастомизацией типов
		(globalThis as any).document = dom.window.document;
		(globalThis as any).window = dom.window;

		// Создаем мок для блока
		blockMock = new Block({});

		const mockElement = document.createElement("div");
		mockElement.textContent = "Mock Block Content";
		sinon.stub(blockMock, "getContent").returns(mockElement);

		sinon.spy(blockMock, "show");

		// Инициализация Route
		route = new Route(PagesPaths.SIGNIN, blockMock, { rootQuery });
	});

	afterEach(() => {
		sinon.restore();
		document.body.innerHTML = "";
	});

	it("should initialize correctly", () => {
		// Проверка, что роут был правильно инициализирован
		expect(route).to.have.property("_blockClass");
		expect(route).to.have.property("_root").that.equals(document.querySelector(rootQuery));
	});

	it("should navigate to the correct route", () => {
		const renderSpy = sinon.spy(route, "render");

		// Убедимся, что текущий маршрут не совпадает с PagesPaths.REGISTRATION
		expect(route.match(PagesPaths.REGISTRATION)).to.be.false;

		// Навигация на другой маршрут
		route.navigate(PagesPaths.REGISTRATION);

		// Убедимся, что метод render был вызван
		expect(renderSpy.calledOnce).to.be.true;

		// Проверим, что адрес правильно обновился
		expect(route.match(PagesPaths.REGISTRATION)).to.be.true;
	});

	it("should leave and clear the content", () => {
		const root = document.querySelector(rootQuery) as HTMLElement;
		root.innerHTML = "<div>Initial content</div>";

		route.leave();

		expect(root.innerHTML).to.equal("");
	});

	it("should match the correct route", () => {
		expect(route.match(PagesPaths.SIGNIN)).to.be.true;
		expect(route.match(PagesPaths.REGISTRATION)).to.be.false;
	});

	it("should render the block correctly", () => {
		const renderDomSpy = sinon.spy(route, "_renderDom");

		route.render();

		expect(renderDomSpy.calledOnce).to.be.true;

		// Проверка, что метод show был вызван
		expect((blockMock.show as sinon.SinonSpy).calledOnce).to.be.true;
	});

	it("should render block with correct content", () => {
		route.render();

		const content = document.querySelector(rootQuery);
		expect(content?.textContent).to.equal("Mock Block Content");
	});
});
