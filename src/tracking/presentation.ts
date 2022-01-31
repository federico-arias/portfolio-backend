import { inject } from "inversify"
import { provideSingleton } from "../ioc"
import "reflect-metadata"
import { Controller, Get, Query, Route, Path } from "tsoa"
import { Tracking, TrackingCheckpoint } from "./domain"
import { NotFoundError } from "../http/errors"

export interface IRepository<T> {
	findAll: (colName: keyof T, colValue: any) => Promise<T[]>
}

@Route("trackings")
@provideSingleton(Presentation)
export class Presentation extends Controller {
	@inject("Repository<Tracking>")
	private _tracking!: IRepository<Tracking>

	@inject("Repository<TrackingCheckpoint>")
	private _checkpoint!: IRepository<TrackingCheckpoint>

	@Get()
	public async getTrackings(@Query() email: string): Promise<Tracking[]> {
		const result = await this._tracking.findAll("email", email)
		if (result.length === 0)
			throw new NotFoundError(`no records for ${email}`)
		return result
	}

	@Get("{trackingNumber}/checkpoints")
	public async getTrackingCheckpoints(@Path() trackingNumber: number) {
		return this._checkpoint.findAll(
			"tracking_number",
			String(trackingNumber),
		)
	}
}
