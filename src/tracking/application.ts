// I didn't have the time to do a proper ApplicationService Layer,
// but it would have improved code separation
/*
import { inject } from "inversify"
import { NotFoundError } from "../http/errors"
import { Tracking, TrackingCheckpoint } from "./domain"

export interface IRepository<T> {
	findAll: (colName: keyof T, colValue: any) => Promise<T[]>
}

export class ApplicationService {
	@inject("Repository<Tracking>")
	private _tracking!: IRepository<Tracking>

	@inject("Repository<TrackingCheckpoint>")
	private _checkpoint!: IRepository<TrackingCheckpoint>

	async getTrackingsByEmail(email: string) {
		const result = await this._tracking.findAll("email", email)
		if (result.length === 0)
			throw new NotFoundError(`no records for ${email}`)
		return result
	}

	async getTrackingByOrder(trackingNumber: number) {
		return this._checkpoint.findAll(
			"tracking_number",
			String(trackingNumber),
		)
	}
}
*/
