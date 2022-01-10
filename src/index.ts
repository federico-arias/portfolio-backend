import { getConfig } from "./config"
import { Db } from "./db"
import { ReservationRepository, ReservationApplication } from "./reservation"
import { Server } from "./http/Server"

const config = getConfig(process.env) // new Config(process.env) ; config.get('path')
const { port, path, pgConnString } = config

const db = new Db(pgConnString)

const r = new ReservationRepository(db)
const reservation = new ReservationApplication(r)

const server = new Server(path, port)
server.addRoutes(reservation.getHttpHandlers())
