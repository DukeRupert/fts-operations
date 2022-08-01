// fighter.ts
import type { playerClass } from '$lib/types';

interface FighterClass extends playerClass {
	fightingStyle: fightingStyle;
	fightingStyleOptions: Record<FightingStyles, FightingStyle>;
	subClass: Record<SubClasses, any>;
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

export type SubClasses = 'battle master' | 'eldritch knight';

// export enum FIGHTINGSTYLE {
// 	ARCHERY = 'archery',
// 	DEFENSE = 'defense',
// 	DUELING = 'dueling',
// 	GREAT_WEAPON = 'great weapon fighting',
// 	PROTECTION = 'protection',
// 	TWO_WEAPON = 'two-weapon fighting style'
// }
