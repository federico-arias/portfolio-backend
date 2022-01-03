create table if not exists booking (
	id serial,
  first_name text not null,
  last_name text not null,
  booking_from date not null,
  booking_to date not null,
  billing_address text not null,
  postal_code number not null,
  email text not null,
  guests number not null,
  city text not null,
  phone integer not null,

	constraint pk_booking primary key (id)
);
