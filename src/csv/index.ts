import { parse, Options } from "csv-parse"
import * as fs from "fs"
import { promisify } from "util"
import { join } from "path"
import { injectable } from "inversify"
import "reflect-metadata"

const parseCsv = <T>() => promisify<Buffer | string, Options, T>(parse)

/**
 * Repository layer that stores CSV in memory and queries against it.
 * TODO: a file should have been passed as a File class which abstracts operations on
 * the filesystem.
 */
@injectable()
export class Repository<T = any> {
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

	async findAll(column?: keyof T, value?: any) {
		if (!column || !value) {
			return this.records
		}
		const records = await this.records
		return records.filter((r: T) => r[column] === value)
	}
}
