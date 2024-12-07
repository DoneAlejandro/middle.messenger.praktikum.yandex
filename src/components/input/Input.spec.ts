import { expect } from "chai";
import { JSDOM } from "jsdom";
import sinon from "sinon";
import { Input } from "./Input.ts";

describe("Input", function () {
	let dom: JSDOM;
	let document: Document;

	// Настройка виртуального DOM перед каждым тестом
	beforeEach(() => {
		dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
		document = dom.window.document;
		// Подменяем глобальный document для компонентов
		(global as any).document = document;
	});

	afterEach(() => {
		// Убираем подмену глобального document после каждого теста
		delete (global as any).document;
	});

	it("should render input with correct properties", function () {
		const props = {
			inputType: "text",
			inputTitle: "Test Input",
			name: "test-input",
			value: "default value",
			inputPlaceholder: "Enter text here",
			className: "custom-class",
		};

		const input = new Input(props);
		input.renderPublic();
		const renderedElement = input.getContent() as HTMLElement;

		// Добавляем элемент в виртуальный DOM
		document.body.appendChild(renderedElement);

		const inputElement = document.querySelector("input");

		expect(inputElement).to.not.be.null;
		if (!inputElement) return;

		expect(inputElement.getAttribute("type")).to.equal("text");
		expect(inputElement.getAttribute("title")).to.equal("Test Input");
		expect(inputElement.getAttribute("id")).to.equal("test-input");
		expect(inputElement.getAttribute("value")).to.equal("default value");
		expect(inputElement.getAttribute("name")).to.equal("test-input");
		expect(inputElement.getAttribute("placeholder")).to.equal("Enter text here");
		expect(inputElement.classList.contains("input")).to.be.true;
		expect(inputElement.classList.contains("custom-class")).to.be.true;
	});

	it("should handle events correctly", function () {
		const mockFocusHandler = sinon.spy();
		const props = {
			inputType: "text",
			name: "test-input",
			inputPlaceholder: "Focus test",
			className: "focus-class",
			events: {
				focus: mockFocusHandler,
			},
		};

		const input = new Input(props);
		input.renderPublic();
		const renderedElement = input.getContent() as HTMLElement;

		// Добавляем элемент в виртуальный DOM
		document.body.appendChild(renderedElement);

		const inputElement = document.querySelector("input") as HTMLInputElement;

		expect(inputElement).to.not.be.null;

		// Симулируем событие focus
		inputElement.focus();

		// Проверяем, что обработчик был вызван
		expect(mockFocusHandler.calledOnce).to.be.true;
	});

	it("should update value when props change", function () {
		const props = {
			inputType: "text",
			name: "dynamic-input",
			value: "initial value",
		};

		const input = new Input(props);
		input.renderPublic();
		const renderedElement = input.getContent() as HTMLElement;

		// Добавляем элемент в виртуальный DOM
		document.body.appendChild(renderedElement);

		let inputElement = document.querySelector("input") as HTMLInputElement;
		expect(inputElement.getAttribute("value")).to.equal("initial value");

		// Обновляем пропсы и вызываем рендеринг
		input.setProps({ value: "updated value" });
		input.renderPublic();

		// Обновляем ссылку на элемент
		inputElement = document.querySelector("input") as HTMLInputElement;
		expect(inputElement.getAttribute("value")).to.equal("updated value");
	});
});
