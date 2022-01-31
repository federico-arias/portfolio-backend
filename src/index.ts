/*import { iocContainer } from "./inversify.config"
import { TYPES } from "./ioc/types"

//type TrackingRepository = Repository<Tracking>
iocContainer.get<any>(TYPES.HttpServer)
*/
import { Config } from "./config"
import { Server } from "./http/Server"

const config = new Config()
new Server(config)
