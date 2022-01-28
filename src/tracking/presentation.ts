import { Controller, Get, Query, Route } from "tsoa"
import { Order } from "./Order"
//import { ApplicationService } from "./application"

@Route("orders")
export class Presentation extends Controller {
	@Get()
	public async getOrders(@Query() email: string): Promise<Order[]> {
		return [{ order_id: "foo", email }]
	}

	public async getTrackings(@Query() email: string): Promise<Order[]> {
		return [{ order_id: "foo", email }]
	}
}
