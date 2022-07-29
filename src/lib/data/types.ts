// data/types.ts
import type { Race, PrimaryClasses } from '$lib/constants';

export interface Cantrip {
	name: string;
	description: string;
	school: string;
	castingTime: string;
	concentration: boolean;
	classes: PrimaryClasses[] | Race[] | ['AmuletOfSelûne'];
}
interface Image {
	src: string;
	alt: string;
}
interface RacialAbility {
	id: number;
	title: string;
	description: string;
	classification: string;
	image?: Image;
}

interface Proficiency {
	name: string;
	description: string;
}

export interface playableRace {
	name: Race;
	speed: number;
	size: string;
	description: string;
	image?: Image;
	subraces?: string[];
	cantrips?: Cantrip[];
	racialAbilities?: RacialAbility[];
	proficiencies?: Proficiency[];
}
