import { ReservationDto } from "./application"

export class Reservation {
	firstName: string
	lastName: string
	numberOfGuests: number
	startDate: Date
	endDate: Date
	billingAddress: string
	billingCountry: string
	postalCode: number
	city: string
	email: string
	phone: string

	constructor(dto: ReservationDto) {
		this.firstName = dto.firstName
		this.lastName = dto.lastName
		this.startDate = new Date(dto.startDate)
		this.numberOfGuests = dto.numberOfGuests
		this.endDate = new Date(dto.endDate)
		this.billingAddress = dto.billingAddress
		this.billingCountry = dto.billingCountry
		this.postalCode = dto.postalCode
		this.email = dto.email
		this.city = dto.city
		this.phone = dto.phone
	}

	isInThePast(): boolean {
		// TODO: make this validation
		return false
	}
}
