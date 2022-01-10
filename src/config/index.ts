import Joi from "joi"

const envSchema = Joi.object({
	POSTGRES_DSN: Joi.string().required(),
	PORT: Joi.string().required(),
	ROUTER_PATH: Joi.string().required(),
}).unknown()

interface AppConfig {
	pgConnString: string
	port: string
	path: string
}

export const getConfig = (env: typeof process.env): AppConfig => {
	const { error, value: v } = envSchema.validate(env)
	if (error) {
		throw error
	}
	return {
		pgConnString: v.POSTGRES_DSN,
		port: v.PORT,
		path: v.ROUTER_PATH,
	}
}
