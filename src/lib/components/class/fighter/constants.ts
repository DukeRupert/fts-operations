import type { FighterClass } from './Fighter';

export const BATTLE_MASTER = {
	name: 'battle master',
	description:
		'Battle Masters are paragons of tactical superiority, combining combat maneuvers and experience in the field to dominate every fight.'
};

export const ELDRITCH_KNIGHT = {
	name: 'eldritch knight',
	description:
		'Eldritch Knights study magic to supplement their weaponry, allowing them to overcome resistance from the toughest foes.'
};

export const FIGHTER: FighterClass = {
	name: 'fighter',
	description:
		'Fighters have mastered the art of combat, wielding weapons with unmatched skill and wearing armour like a second skin.',
	hp: 10,
	savingThrows: ['strength', 'constitution'],
	armorProfs: ['light', 'medium', 'heavy', 'shield'],
	weaponProfs: ['simple', 'martial'],
	fightingStyle: {
		name: 'archery',
		description: 'You gain a +2 bonus to attack rolls you make with ranged weapons.'
	},
	fightingStyleOptions: {
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
	},
	subClass: { 'battle master': BATTLE_MASTER, 'eldritch knight': ELDRITCH_KNIGHT },
	features: [
		{
			level: 1,
			type: 'proficiencies',
			name: 'proficiencies',
			description: 'These determine what you character can use without penalty.'
		},
		{
			level: 1,
			type: 'fightingStyle',
			name: 'fighting style',
			description: 'You adopt a particular style of fighting as your specialty.'
		},
		{
			level: 1,
			type: 'action',
			name: 'second wind',
			description:
				'You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level. Once you use this feature, you must finish a short or long rest before you can use it again. '
		},
		{
			level: 2,
			type: 'action',
			name: 'action surge',
			description:
				'You can push yourself beyond your normal limits for a moment. On your turn, you can take one additional action. Once you use this feature, you must finish a short or long rest before you can use it again. Starting at 17th level, you can use it twice before a rest, but only once on the same turn.'
		},
		{
			level: 3,
			type: 'subclass',
			name: 'martial archetype',
			description:
				'You choose an archetype that you strive to emulate in your combat styles and techniques.'
		}
	]
};
