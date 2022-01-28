import express, {
	NextFunction,
	Router,
	RequestHandler,
	Response,
	Request,
} from "express"
import bodyParser from "body-parser"
import { RegisterRoutes } from "../../build/routes"
import { ValidateError } from "tsoa"

import swaggerUi from "swagger-ui-express"

interface Route {
	path: string
	handler: RequestHandler
}

export class Server {
	router: Router
	logger: typeof console

	constructor(path: string, port: string, logger: typeof console = console) {
		this.logger = logger
		const server = express()
		this.router = express.Router()
		server.use(bodyParser.json())
		server.use(path, this.router)

		// Register tsoa controllers
		RegisterRoutes(server)
		// Health endpoint for AWS LB, Kubernetes, Docker Compose, etc.
		this.router.get("/healthz", (_: Request, res: Response) => {
			res.status(200).send("OK")
		})

		server.use("/docs", swaggerUi.serve, this.getDocumentation)
		server.use(this.handleErrors)
		server.listen(port, this.onServerStart)
	}

	//addRoute(fn: () => [string, RequestHandler]) {
	addRoutes = (routes: Route[]) => {
		routes.forEach(this.addRoute.bind(this))
	}

	addRoute = ({ path, handler }: Route) => {
		this.router.post(path, handler)
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
