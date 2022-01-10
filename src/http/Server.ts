import express, { Router, RequestHandler, Response, Request } from "express"
import bodyParser from "body-parser"

interface Route {
	path: string
	handler: RequestHandler
}

export class Server {
	router: Router

	constructor(path: string, port: string) {
		const server = express()
		this.router = express.Router()
		server.use(bodyParser.json())
		server.use(path, this.router)
		server.listen(port, this.onServerStart)

		// health endpoint for AWS LB
		this.router.get("/healthz", (_: Request, res: Response) => {
			res.status(200).send("OK")
		})
	}

	//addRoute(fn: () => [string, RequestHandler]) {
	addRoutes = (routes: Route[]) => {
		routes.forEach(this.addRoute.bind(this))
	}

	addRoute = ({ path, handler }: Route) => {
		this.router.post(path, handler)
	}

	onServerStart() {
		console.log(`server started`)
	}
}
