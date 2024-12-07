import { expect } from "chai";
import { JSDOM } from "jsdom";
import sinon from "sinon";
import Block from "./BLock.ts";

describe("Block", () => {
	let block: Block;

	before(() => {
		// Инициализация JSDOM
		const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
		(global as any).window = dom.window;
		(global as any).document = dom.window.document;
	});

	beforeEach(() => {
		// Создаем новый экземпляр Block для каждого теста
		block = new Block({
			name: "Test Block",
			events: { click: () => {} },
			children: {},
		});
	});

	afterEach(() => {
		// Сбрасываем все заглушки и шпионы
		sinon.restore();
	});

	after(() => {
		// Удаляем глобальные ссылки на JSDOM
		delete (global as any).window;
		delete (global as any).document;
	});

	it("should initialize correctly", () => {
		expect(block).to.have.property("element");
		expect(block).to.have.property("id");
		expect(block.props).to.deep.include({ name: "Test Block" });
		expect(block.eventBus).to.be.a("function");
	});

	it("should register events", () => {
		const initSpy = sinon.spy(block, "initPublic");

		block.eventBus().emit(Block.EVENTS.INIT);

		expect(initSpy.calledOnce).to.be.true;
	});

	it("should call renderPublic during rendering", () => {
		const renderSpy = sinon.spy(block, "renderPublic"); // Создаем шпион внутри теста
		block.eventBus().emit(Block.EVENTS.FLOW_RENDER);

		// Проверяем, что renderPublic был вызван
		expect(renderSpy.calledOnce).to.be.true;
	});

	it("should render correctly", () => {
		const template = "<div>{{name}}</div>";
		const renderStub = sinon.stub(block, "renderPublic").returns(template);

		block.eventBus().emit(Block.EVENTS.FLOW_RENDER);

		const element = block.getElement();
		expect(renderStub.calledOnce).to.be.true;
		expect(element).to.exist;
		expect(element?.textContent).to.equal("Test Block");
	});
});
