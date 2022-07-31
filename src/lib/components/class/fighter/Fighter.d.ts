// fighter.ts
import type { playerClass } from '$lib/types';

interface FighterClass extends playerClass {
	fightingStyle: fightingStyle;
	fightingStyleOptions: Record<FightingStyles, FightingStyle>;
	features: Feature[];
}

export interface Feature {
	level: number;
	type: string;
	name: string;
	description: string;
}

export interface FightingStyle {
	name: string;
	description: string;
}

export type FightingStyles =
	| 'archery'
	| 'defense'
	| 'dueling'
	| 'great weapon fighting'
	| 'protection'
	| 'two-weapon fighting style';

// export enum FIGHTINGSTYLE {
// 	ARCHERY = 'archery',
// 	DEFENSE = 'defense',
// 	DUELING = 'dueling',
// 	GREAT_WEAPON = 'great weapon fighting',
// 	PROTECTION = 'protection',
// 	TWO_WEAPON = 'two-weapon fighting style'
// }
