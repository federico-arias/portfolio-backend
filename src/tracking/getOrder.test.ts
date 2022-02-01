import { getOrder } from "./getOrder"

describe("getOrder", () => {
	it("should merge both tables", () => {
		const input = [
			{ id: "xyz", title: "A" },
			{ id: "xyz", title: "AX" },
			{ id: "abc", title: "B" },
		]
		const input2 = [
			{ id: "xyz", unix_timestamp: 1 },
			{ id: "xyz", unix_timestamp: 2 },
			{ id: "xyz", unix_timestamp: 3 },
		]
		const got = getOrder(input, input2)
		expect(got).toBe(true)
	})
})
