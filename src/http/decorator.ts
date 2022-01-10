import { Request, Response } from "express"

export const httpAdapter =
	<T, R = any>(fn: (payload: T) => Promise<R>) =>
	async (req: Request, res: Response) => {
		const payload = { ...req.body, ...req.params }
		try {
			const response = await fn(payload)
			res.status(200).send(response)
		} catch (err) {
			console.error(`error with request ${JSON.stringify(payload)}`)
			console.error(err)
			res.status(400).send({ error: err })
		}
	}

export const POST =
	() => (_: Object, __: string | symbol, descriptor: PropertyDescriptor) => {
		// target.router
		const original = descriptor.value

		descriptor.value = async <T>(req: Request, res: Response) => {
			try {
				const result = await original.call(this, { ...req.body } as T)
				res.status(200).send(result)
			} catch (err) {
				res.status(500).send({ error: err })
			}
		}

		return descriptor
	}
