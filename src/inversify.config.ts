import { Container, decorate, injectable } from "inversify"
import { buildProviderModule } from "inversify-binding-decorators"
import { TYPES } from "./ioc/types"
import { ServerOptions, Server } from "./http/Server"
import { Config } from "./config"
import { Controller } from "tsoa"
import { TrackingRepository, TrackingCheckpointRepository } from "./tracking"
import { IRepository } from "./tracking/presentation"
import "reflect-metadata"
import { Tracking, TrackingCheckpoint } from "./tracking"

interface HttpServer {}

const iocContainer = new Container({ skipBaseClassChecks: true })
iocContainer.bind<ServerOptions>(TYPES.ServerOpts).to(Config)
iocContainer.bind<HttpServer>(TYPES.HttpServer).to(Server)

iocContainer
	.bind<IRepository<Tracking>>("Repository<Tracking>")
	.to(TrackingRepository)
	.inSingletonScope()

iocContainer
	.bind<IRepository<TrackingCheckpoint>>("Repository<TrackingCheckpoint>")
	.to(TrackingCheckpointRepository)
	.inSingletonScope()

decorate(injectable(), Controller)

iocContainer.load(buildProviderModule())

export { iocContainer }

/*
iocContainer
	.bind<interfaces.Factory<Repository>>("Factory<Repository>")
	.toFactory<Repository, ["order", "tracking"]>(
		(context: interfaces.Context) => (type: "order" | "tracking") => {
			if (type === "order") return context.container.g<et<Katana>("Katana")
		},
	)
 */
