import { expect } from "chai";
import sinon from "sinon";
import Handlebars from "handlebars";
import { Button } from "./Button.ts";

describe("Button", function () {
	it("should create a button with the correct properties", function () {
	  const mockClickHandler = sinon.spy(); // Фейковый обработчик клика
	  const props = {
		idBtn: "test-button",
		buttonStyle: "primary",
		text: "Click Me",
		page: "home",
		onClick: mockClickHandler,
	  };
  
	  const button = new Button(props);
	  const template = Handlebars.compile(button.renderPublic()); // Рендерим шаблон с помощью Handlebars
	  const rendered = template(props); // Передаем свойства для рендеринга
  
	  // Проверяем корректность рендера
	  expect(rendered).to.include("<button");
	  expect(rendered).to.include('id="test-button"'); // Проверяем id
	  expect(rendered).to.include('class="primary"');
	  expect(rendered).to.include('page="home"');
	  expect(rendered).to.include("Click Me");
  
	  // Проверяем наличие события click
	  const events = button.props.events || {}; // Защита от undefined
	  expect(events).to.have.property("click");
	  expect(events.click).to.equal(mockClickHandler);
	});
  
	it("should call the onClick handler when clicked", function () {
	  const mockClickHandler = sinon.spy();
	  const props = {
		idBtn: "test-button",
		buttonStyle: "secondary",
		text: "Submit",
		page: "form",
		onClick: mockClickHandler,
	  };
  
	  const button = new Button(props);
  
	  // Проверяем, что событие click добавлено
	  const events = button.props.events || {}; // Защита от undefined
	  expect(events).to.have.property("click");
  
	  // Эмулируем вызов события клика
	  (events.click as (event: Event) => void)(new Event("click"));
  
	  // Проверяем, что обработчик был вызван
	  expect(mockClickHandler.calledOnce).to.be.true;
	});
  });