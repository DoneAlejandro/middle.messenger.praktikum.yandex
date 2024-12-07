import { expect } from "chai";
import sinon from "sinon";
import EventBus from "./EventBus.ts";

describe("EventBus", () => {
	let eventBus: EventBus;

	beforeEach(() => {
		// Создаем новый экземпляр EventBus для каждого теста
		eventBus = new EventBus();
	});

	it("should register an event listener with 'on'", () => {
		const callback = sinon.spy();

		eventBus.on("testEvent", callback);

		expect(eventBus.listeners["testEvent"]).to.include(callback);
	});

	it("should remove an event listener with 'off'", () => {
		const callback = sinon.spy();

		eventBus.on("testEvent", callback);
		eventBus.off("testEvent", callback);

		expect(eventBus.listeners["testEvent"]).to.not.include(callback);
	});

	it("should throw an error when removing a listener for a non-existent event", () => {
		const callback = sinon.spy();

		expect(() => eventBus.off("nonExistentEvent", callback)).to.throw("Нет события: nonExistentEvent");
	});

	it("should call the event listener when 'emit' is called", () => {
		const callback = sinon.spy();

		eventBus.on("testEvent", callback);
		eventBus.emit("testEvent", "arg1", "arg2");

		expect(callback.calledOnce).to.be.true;
		expect(callback.calledWith("arg1", "arg2")).to.be.true;
	});

	it("should not throw when emitting a non-existent event", () => {
		expect(() => eventBus.emit("nonExistentEvent")).to.not.throw();
	});

	it("should allow multiple listeners for the same event", () => {
		const callback1 = sinon.spy();
		const callback2 = sinon.spy();

		eventBus.on("testEvent", callback1);
		eventBus.on("testEvent", callback2);
		eventBus.emit("testEvent");

		expect(callback1.calledOnce).to.be.true;
		expect(callback2.calledOnce).to.be.true;
	});

	it("should not call removed listeners when the event is emitted", () => {
		const callback = sinon.spy();

		eventBus.on("testEvent", callback);
		eventBus.off("testEvent", callback);
		eventBus.emit("testEvent");

		expect(callback.notCalled).to.be.true;
	});
});
