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
	name?: string;
	start_date?: string;
	address?: string;
	city?: string;
	zip?: string;
	state?: string;
	status?: string;
	customer?: Partial<CustomerRecord>;
}

export interface StartChecklistRecord {
	id: number;
	type: 'start';
	created_at: string;
	project_id: number;
	locates: boolean;
	locates_items: string[];
	approved_plans: boolean;
	date: string;
	status: boolean;
	customer_contact: string;
	signed_contract_url: string;
	updated_at: string;
	scope_of_work: string;
	hazard: boolean;
	hazard_list: string[];
}

export interface DailyChecklistRecord {
	id: number;
	type: 'daily';
	created_at: string;
	project_id: number;
	date: string;
	site_secure: boolean;
	machines_parked: boolean;
	tracks_shoveled: boolean;
	customer_satisfaction: string;
	soil_site_conditions: string;
	change_order: boolean;
	set_up_for_tomorrow: boolean;
	updated_at: string;
}

export interface EndChecklistRecord {
	id: number;
	created_at: string;
	project_id: number;
	date: string;
	site_secure: boolean;
	machines_parked: boolean;
	tracks_shoveled: boolean;
	customer_satisfaction: string;
	soil_site_conditions: string;
	change_order: boolean;
	set_up_for_tomorrow: boolean;
	updated_at: string;
	type: string;
}

export type AllChecklists =
	| (StartChecklistRecord | DailyChecklistRecord | EndChecklistRecord)[]
	| [];
