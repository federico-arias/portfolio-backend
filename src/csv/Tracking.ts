export class Entity {
	private columns: string[]

	constructor(name: string, columns: string[]) {
		this.columns = columns
	}
	getColumns() {
		return this.columns
	}
	setColumn(name: string, value: string) {
		this[name] = value
	}
}

export class Tracking extends Entity {
	constructor(name: string) {
		super(name, [
			`orderNo`,
			`tracking_number`,
			`courier`,
			`street`,
			`zip_code`,
			`city`,
			`destination_country_iso3`,
			`email`,
			`articleNo`,
			`articleImageUrl`,
			`quantity`,
			`product_name`,
		])
	}
}

export class TrackingCollection {}
