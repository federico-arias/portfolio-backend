import { inject } from "inversify"
import { provideSingleton } from "../ioc"
import "reflect-metadata"
import { Controller, Get, Query, Route, Path } from "tsoa"
import { Tracking, TrackingCheckpoint } from "./domain"
import { NotFoundError } from "../http/errors"
import { getOrder } from "./getOrder"

export interface IRepository<T> {
	findAll: (colName?: keyof T, colValue?: any) => Promise<T[]>
}

@Route("orders")
@provideSingleton(Presentation)
export class Presentation extends Controller {
	@inject("Repository<Tracking>")
	private _tracking!: IRepository<Tracking>

	@inject("Repository<TrackingCheckpoint>")
	private _checkpoint!: IRepository<TrackingCheckpoint>

	@Get()
	public async getOrders(@Query() email: string): Promise<Tracking[]> {
		const tracking = await this._tracking.findAll("email", email)
		if (tracking.length === 0)
			throw new NotFoundError(`no records for ${email}`)
		const checkpoint = await this._checkpoint.findAll()
		return getOrder(tracking, checkpoint)
	}

	@Get("{orderNo}")
	public async getOrder(@Path() orderNo: string): Promise<Tracking[]> {
		const tracking = await this._tracking.findAll("orderNo", orderNo)
		if (tracking.length === 0)
			throw new NotFoundError(`no records for ${orderNo}`)
		const checkpoint = await this._checkpoint.findAll()
		return getOrder(tracking, checkpoint)
	}

	@Get("{orderNo}/articles")
	public async getTracking(@Path() orderNo: string) {
		return this._tracking.findAll("orderNo", orderNo)
	}
}
