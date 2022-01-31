import { parse, Options } from "csv-parse"
import * as fs from "fs"
import { promisify } from "util"
import { join } from "path"
import { injectable } from "inversify"

const parseCsv = <T>() => promisify<Buffer | string, Options, T>(parse)

/**
 * Repository layer that stores CSV in memory and queries against it.
 */
@injectable()
export abstract class Repository<T = any> {
	records: Promise<T[]>

	constructor(filename: string) {
		const csvString = fs.readFileSync(join(__dirname, filename), {
			encoding: "utf8",
			flag: "r",
		})
		this.records = parseCsv<T[]>()(csvString.trim(), {
			delimiter: ";",
			relax_column_count: true,
			columns: true,
			skip_empty_lines: true,
		})
	}

	async findAll(column: keyof T, value: any) {
		const records = await this.records
		console.log(records)
		return records.filter((r: T) => r[column] === value)
	}
}
