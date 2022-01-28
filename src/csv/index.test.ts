import { Repository } from "."

describe("foo", () => {
	it("should filter records by values", async () => {
		const input =
			'"key_1","key_2"\n"value 1","value 2"\n"value 3","value 4"'.trim()
		const repository = new Repository(input)
		const expected = [{ key_1: "value 1", key_2: "value 2" }]
		expect(await repository.findAll("key_1", "value 1")).toStrictEqual(
			expected,
		)
	})
})
