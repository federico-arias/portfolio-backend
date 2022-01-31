export interface Tracking {
	orderNo: string
	tracking_number: number
	courier: string
	street: string
	zip_code: string
	city: string
	destination_country_iso3: string
	email: string
	articleNo: string
	articleImageUrl: string
	quantity: string
	product_name: string
}

export interface TrackingCheckpoint {
	tracking_number: number
	location: string
	timestamp: string
	status: string
	status_text: string
	status_detail: string
}
