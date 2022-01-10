import { Reservation } from "./domain"
import { httpAdapter } from "../http/decorator"
import Joi from "joi"

export type ReservationDto = {
	firstName: string
	lastName: string
	numberOfGuests: number
	startDate: string
	endDate: string
	billingAddress: string
	billingCountry: string
	postalCode: number
	city: string
	email: string
	phone: string
}

const dtoSchema = Joi.object({
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	numberOfGuests: Joi.number().required(),
	startDate: Joi.string().required(),
	endDate: Joi.string().required(),
	billingAddress: Joi.string().required(),
	billingCountry: Joi.string().required(),
	postalCode: Joi.number().required(),
	city: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
})

interface Repository {
	persist: (r: Reservation) => Promise<void>
}

export class ReservationApplication {
	repository: Repository
	constructor(repository: Repository) {
		this.repository = repository
	}

	create = async (dto: ReservationDto) => {
		const { value, error } = dtoSchema.validate(dto)
		if (error) {
			throw error
		}
		const reservation = new Reservation(value)
		await this.repository.persist(reservation)
	}

	getHttpHandlers = () => {
		return [
			{
				path: "/reservation",
				handler: httpAdapter(this.create),
			},
		]
	}
}
