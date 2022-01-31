import { Tracking, TrackingCheckpoint } from "./domain"
import { Repository } from "../csv"
import { injectable } from "inversify"
import "reflect-metadata"

@injectable()
export class TrackingRepository extends Repository<Tracking> {
	constructor() {
		super("./trackings.csv")
	}
}

@injectable()
export class TrackingCheckpointRepository extends Repository<TrackingCheckpoint> {
	constructor() {
		super("./checkpoints.csv")
	}
}
