// fighter.ts
import type { playerClass } from '$lib/types';

interface FighterClass extends playerClass {
	actions: Action[];
	fightingStyle: fightingStyle;
}

interface Action {
	name: string;
	description: string;
}

export type FightingStyle =
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

interface fightingStyle {
	name: FightingStyle;
	description: string;
}

export const FightingStyleOptions: fightingStyle[] = [
	{
		name: 'archery',
		description: 'You gain a +2 bonus to attack rolls you make with ranged weapons.'
	},
	{ name: 'defense', description: '' },
	{
		name: 'dueling',
		description:
			'When you are wielding melee weapons in one hand and the other hand is empty, you gain a +2 bonus to damage rolls with that weapon, increasing your chance to do heavy damage.'
	},
	{
		name: 'great weapon fighting',
		description:
			'When you roll a 1 or 2 on a damage die for an attack with a two-handed melee weapon, you can reroll the die and must use the new roll.'
	},
	{
		name: 'protection',
		description:
			'When you have a shield, impose disadvantage on an enemy who attacks one of your allies when you are within 1.5 m. You must be able to see the enemy.'
	},
	{
		name: 'two-weapon fighting style',
		description:
			'When you attack with two weapons, you can add your ability modifier to the damage of the offhand attack.'
	}
];

export const FightingStyles: Record<FightingStyle, fightingStyle> = {
	archery: {
		name: 'archery',
		description: 'You gain a +2 bonus to attack rolls you make with ranged weapons.'
	},
	defense: {
		name: 'defense',
		description: 'You gain a +1 bonus to Armor Class while wearing armor.'
	},
	dueling: {
		name: 'dueling',
		description:
			'When you are wielding melee weapons in one hand and the other hand is empty, you gain a +2 bonus to damage rolls with that weapon, increasing your chance to do heavy damage.'
	},
	'great weapon fighting': {
		name: 'great weapon fighting',
		description:
			'When you roll a 1 or 2 on a damage die for an attack with a two-handed melee weapon, you can reroll the die and must use the new roll.'
	},
	protection: {
		name: 'protection',
		description:
			'When you have a shield, impose disadvantage on an enemy who attacks one of your allies when you are within 1.5 m. You must be able to see the enemy.'
	},
	'two-weapon fighting style': {
		name: 'two-weapon fighting style',
		description:
			'When you attack with two weapons, you can add your ability modifier to the damage of the offhand attack.'
	}
};

const FIGHTER: FighterClass = {
	name: 'fighter',
	description:
		'Fighters have mastered the art of combat, wielding weapons with unmatched skill and wearing armour like a second skin.',
	hp: 10,
	savingThrows: ['strength', 'constitution'],
	armorProfs: ['light', 'medium', 'heavy', 'shield'],
	weaponProfs: ['simple', 'martial'],
	actions: [
		{
			name: 'second wind',
			description: 'Once per day, you can regain 1d10+1 hit points.'
		}
	],
	fightingStyle: {
		name: 'archery',
		description: 'You gain a +2 bonus to attack rolls you make with ranged weapons.'
	}
};

export default FIGHTER;
