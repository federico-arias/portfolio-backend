import { parse, Options } from "csv-parse"
import { promisify } from "util"

export interface Entity {}

const parseCsv = <T>() => promisify<Buffer | string, Options, T>(parse)

/**
 * Repository layer that queries the in-memory CSV.
 */
export class Repository<T extends Entity> {
	//<T extends Entity> {
	records: Promise<T[]>

	constructor(csvString: string) {
		this.records = parseCsv<T[]>()(csvString, {
			columns: true,
			skip_empty_lines: true,
		})
	}

	async findAll(column: string, value: string) {
		const records = await this.records
		return records.filter((r: any) => r[column] === value)
	}
}
