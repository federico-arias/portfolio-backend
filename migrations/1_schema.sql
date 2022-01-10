create table if not exists reservation (
	id serial,
  first_name text not null,
  last_name text not null,
  booking_from date not null,
  booking_to date not null,
  billing_address text not null,
  billing_country text not null,
  postal_code integer not null,
  email text not null,
  guests integer not null,
  city text not null,
  phone text not null,

	constraint pk_booking primary key (id)
);
