import { getConfig } from "./config"
import { Server } from "./http/Server"

const config = getConfig(process.env)
const { port, path } = config

const server = new Server(path, port)
server.start()
