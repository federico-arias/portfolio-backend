import { Pool, PoolClient } from "pg"

export class Db {
	client: Promise<PoolClient>

	constructor(connectionString: string) {
		const client = new Pool({ connectionString })
		this.client = client.connect()
	}

	async migrate() {}

	async query(q: string, params: any[]) {
		const client = await this.client
		return client.query(q, params)
	}
}
