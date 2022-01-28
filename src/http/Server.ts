import express, {
	NextFunction,
	Router,
	Response,
	Request,
	Express,
} from "express"
import bodyParser from "body-parser"
import { RegisterRoutes } from "../../build/routes"
import { ValidateError } from "tsoa"
import { HttpError } from "./errors"

import swaggerUi from "swagger-ui-express"

export class Server {
	router: Router
	logger: typeof console
	server: Express
	port: string

	constructor(path: string, port: string, logger: typeof console = console) {
		this.logger = logger
		this.port = port
		this.server = express()
		this.router = express.Router()
		this.server.use(bodyParser.json())
		this.server.use(path, this.router)

		// Register tsoa controllers
		RegisterRoutes(this.server)
		// Health endpoint for AWS LB, Kubernetes, Docker Compose, etc.
		this.router.get("/healthz", (_: Request, res: Response) => {
			res.status(200).send("OK")
		})

		this.server.use("/docs", swaggerUi.serve, this.getDocumentation)
		this.server.use(this.handleErrors)
	}

	start() {
		this.server.listen(this.port, this.onServerStart)
	}

	getDocumentation = async (_req: Request, res: Response) => {
		return res.send(
			swaggerUi.generateHTML(await import("../../build/swagger.json")),
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
			this.logger.error(`caught an error when processing ${req}`)
			this.logger.error(err)
			return res.status(err.status).json({
				message: err.detail,
				title: err.title,
			})
		}
		if (err instanceof Error) {
			return res.status(500).json({
				message: "Internal Server Error",
			})
		}
		next()
	}

	onServerStart = () => {
		this.logger.log(`server started`)
	}
}
