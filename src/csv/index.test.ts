import { Repository } from "."

describe("Repository Class", () => {
	it("should filter records by values", async () => {
		const repository = new Repository("checkpoints.csv")
		expect(
			(await repository.findAll("status", "PickUpPlanned")).length,
		).toStrictEqual(1)
	})
})
