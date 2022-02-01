const { getOrder } = require("./getOrder")

describe("getOrder", () => {
	it("should merge both tables", () => {
		const input = [
			{ tracking_number: "xyz", title: "A" },
			{ tracking_number: "xyz", title: "AX" },
			{ tracking_number: "abc", title: "B" },
		]
		const input2 = [
			{ tracking_number: "xyz", timestamp: "2018-04-01T00:00:00.000Z" },
			{ tracking_number: "abc", timestamp: "2018-04-01T00:00:00.000Z" },
			{ tracking_number: "xyz", timestamp: "2039-04-01T00:00:00.000Z" },
			{ tracking_number: "xyz", timestamp: "2039-04-02T00:00:00.000Z" },
		]
		const got = getOrder(input, input2)
		const want = [
			{
				timestamp: new Date("2039-04-02T00:00:00.000Z"),
				title: "A",
				tracking_number: "xyz",
			},
			{
				timestamp: new Date("2018-04-01T00:00:00.000Z"),
				title: "B",
				tracking_number: "abc",
			},
		]
		expect(got).toStrictEqual(want)
	})
})
