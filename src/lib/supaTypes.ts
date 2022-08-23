export interface CustomerRecord {
	id: number;
	created_at: Date | string;
	updated_at: string;
	first_name: string;
	last_name: string;
	business: string;
	phone: string;
	email: string;
}
export interface ProjectRecord {
	id: number;
	name: string;
	start_date: string;
	address: string;
	city: string;
	zip: string;
	state: string;
	status: string;
	'representative-first'?: string;
	'representative-last'?: string;
	'representative-phone'?: string;
	'representative-email'?: string;
	customer: Partial<CustomerRecord>;
}
