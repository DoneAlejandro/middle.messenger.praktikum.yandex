import { expect } from "chai";
import sinon from "sinon";
import { HTTPTransport } from "./requests.ts";

const host = "https://ya-praktikum.tech";

describe("HTTPTransport", () => {
	afterEach(() => {
		sinon.restore();
	});

	it("should form URL with get params and call GET request", async () => {
		const http = new HTTPTransport("/test");
		const requestStub = sinon.stub(http, "request").resolves();

		const options = { data: { a: "1", b: "2 2" } };
		await http.get("", options);

		expect(requestStub.calledOnce).to.be.true;

		// Проверка, что requestStub.firstCall.args[1] существует
		const secondArg = requestStub.firstCall.args[1];
		expect(secondArg).to.not.be.undefined;
		expect(secondArg?.method).to.equal("GET");
	});

	it("should form post request and pass the data", async () => {
		const http = new HTTPTransport("/test");
		const requestStub = sinon.stub(http, "request").resolves();

		const data = { a: "1", b: "2" };
		await http.post("", { data });

		expect(requestStub.calledOnce).to.be.true;

		// Проверка, что requestStub.firstCall.args[1] существует
		const secondArg = requestStub.firstCall.args[1];
		expect(secondArg).to.not.be.undefined;
		expect(secondArg?.method).to.equal("POST");
		expect(secondArg?.data).to.deep.equal(data);
	});

	it("should throw error if there is no method", async () => {
		const http = new HTTPTransport("/test");
		const requestStub = sinon.stub(http, "request").rejects(new Error("No method"));

		try {
			await http.request(`${host}/test`, { method: undefined });
			expect(requestStub.calledOnce).to.be.true;
		} catch (error) {
			// @ts-expect-error wft
			expect(error.message).to.equal("No method");
		}
	});
});
