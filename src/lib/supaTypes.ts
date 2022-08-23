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
