import { Reservation } from "./domain"

interface Dao {
	query: (q: string, values: any[]) => void
}

export class ReservationRepository {
	dao: Dao

	constructor(dao: Dao) {
		this.dao = dao
	}

	async persist(entity: Reservation) {
		await this.dao.query(
			`insert into reservation (
        first_name,
        last_name,
        booking_from,
        booking_to,
        billing_address,
        billing_country,
        postal_code,
        email,
        guests,
        city,
        phone) 
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
			[
				entity.firstName,
				entity.lastName,
				entity.startDate,
				entity.endDate,
				entity.billingAddress,
				entity.billingCountry,
				entity.postalCode,
				entity.email,
				entity.numberOfGuests,
				entity.city,
				entity.phone,
			],
		)
	}
}
