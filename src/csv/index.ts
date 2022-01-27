import * as fs from "fs"

interface Entity {
	getColumns: () => string[]
}

/**
 * Repository layer that interacts with the CSV.
 * const tracking = new Model('user', ['name', 'address'])
 * const tracking = new Tracking()
 * tracking.setColumn('email', 'someone@mail.com')
 * const dto = this.repository.findOne(tracking)
 * return new Tracking(dto)
 */
class Repository<T extends Entity> {
	model: T

	constructor(csv: string, model: T) {
		this.model = model
	}

	private parseQuery(entity: T) {
		let query = []
		for (let [key, val] of Object.entries(entity)) {
			if (val && this.model.columns.includes(key)) {
				query.push([key, val])
			}
		}
		for (let [k, v] of query) {
		}
	}

	async findAll(entity: T) {
		const cols = entity.getColumns()
		return entity.columns.indexOf(key)
	}

	async findOne() {}
}
