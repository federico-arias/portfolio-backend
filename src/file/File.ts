import * as fs from "fs"

export class File {
	text: string
	constructor(filename: string) {
		this.text = fs.readFileSync(filename, { encoding: "utf8", flag: "r" })
	}
	async asText(): Promise<string> {
		return ""
	}
}
