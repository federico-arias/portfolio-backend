import Joi from "joi"
import { injectable } from "inversify"
import "reflect-metadata"

const envSchema = Joi.object({
	PORT: Joi.string().required(),
	ROUTER_PATH: Joi.string().required(),
}).unknown()

@injectable()
export class Config {
	port: string
	path: string
	constructor(env: typeof process.env = process.env) {
		const { error, value: v } = envSchema.validate(env)
		if (error) {
			throw error
		}
		this.port = v.PORT
		this.path = v.ROUTER_PATH
	}
}
