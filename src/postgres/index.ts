import { Pool } from "pg"

export const getDatabaseConnection = async (
	connectionString: string,
): Promise<Pool> => {
	const client = new Pool({ connectionString })
	await client.connect()
	return client
}
