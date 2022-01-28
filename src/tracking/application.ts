import { Repository } from "../csv"
import { Order } from "./Order"

export class ApplicationService {
	orderRepository: Repository<Order>
	trackingRepository: Repository<Order>

	constructor(orders: Repository<Order>, tracking: Repository<Order>) {
		this.orderRepository = orders
		this.trackingRepository = tracking
	}
	async getOrdersByEmail(email: string) {
		//validate email
		return this.orderRepository.findAll("email", email)
	}

	async getTrackingByOrder(orderId: number) {
		//validate order id
		const order = await this.orderRepository.findAll(
			"order_id",
			String(orderId),
		)
		const tracking = await this.trackingRepository.findAll(
			"order_number",
			String(orderId),
		)
		return new Order.fromTracking(order, tracking)
	}
}
