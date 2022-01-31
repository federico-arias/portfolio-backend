import express, { NextFunction, Router, Response, Request } from "express"
import bodyParser from "body-parser"
import { RegisterRoutes } from "./api/routes" // eslint-disable-line no-eval
import { ValidateError } from "tsoa"
import { HttpError } from "./errors"
//import { TYPES } from "../ioc/types"

import swaggerUi from "swagger-ui-express"

export interface ServerOptions {
	path: string
	port: string
}

export class Server {
	router: Router
	logger: typeof console

	constructor(
		private _opts: ServerOptions,
		logger: typeof console = console,
	) {
		this.logger = logger
		const server = express()
		this.router = express.Router()
		server.use(bodyParser.json())
		server.use(this._opts.path, this.router)

		// Health endpoint for AWS LB, Kubernetes, Docker Compose, etc.
		this.router.get("/healthz", (_: Request, res: Response) => {
			res.status(200).send("OK")
		})

		// Register tsoa controllers
		RegisterRoutes(server.bind(server))

		server.use("/docs", swaggerUi.serve, this.getDocumentation)
		server.use(this.handleErrors)
		server.listen(this._opts.port, this.onServerStart)
	}

	getDocumentation = async (_req: Request, res: Response) => {
		return res.send(
			swaggerUi.generateHTML(await import("./swagger.json")), // eslint-disable-line no-eval
		)
	}

	handleErrors = (
		err: unknown,
		req: Request,
		res: Response,
		next: NextFunction,
	): Response | void => {
		if (err instanceof ValidateError) {
			this.logger.warn(
				`Caught Validation Error for ${req.path}:`,
				err.fields,
			)
			return res.status(422).json({
				message: "Validation Failed",
				details: err?.fields,
			})
		}
		if (err instanceof HttpError) {
			this.logger.error(`caught an error when processing ${req.url}`)
			this.logger.error(err)
			return res.status(err.status).json({
				message: err.detail,
				title: err.title,
			})
		}
		if (err instanceof Error) {
			this.logger.error(`caught an error when processing ${req.url}`)
			this.logger.error(err)
			return res.status(500).json({
				message: "Internal Server Error",
			})
		}
		next()
	}

	onServerStart = () => {
		this.logger.info(`server started`)
	}
}
