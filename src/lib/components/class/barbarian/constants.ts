import type { BarbarianClass } from './Barbarian';

export const BERSERKER = {
	name: 'berserker',
	description:
		'Violence is both a means and an end. You follow a path of untrammeled fury, slick with blood, as you thrill in the chaos of battle, heedless of your own well-being.'
};

export const WILDHEART = {
	name: 'wildheart',
	description:
		'Your attunement with nature and its beasts inspires your rage, empowering you with supernatural might.'
};

export const BARBARIAN: BarbarianClass = {
	name: 'barbarian',
	description:
		'The strong embrace the wild that hides inside - keen instincts, primal physicalityy, and most of all, an unbridled, unquenchable rage.',
	hp: 12,
	savingThrows: ['strength', 'constitution'],
	armorProfs: ['light', 'medium', 'shield'],
	weaponProfs: ['simple', 'martial'],
	subClass: { berserker: BERSERKER, wildheart: WILDHEART },
	features: [
		{
			level: 1,
			type: 'proficiencies',
			name: 'proficiencies',
			description: 'These determine what you character can use without penalty.'
		},
		{
			level: 1,
			type: 'action',
			name: 'rage',
			description:
				'While raging, you deal 2 extra damage with melee and improvised weapons, and when throwing objects.'
		},
		{
			level: 1,
			type: 'action',
			name: 'unarmoured defense',
			description:
				'Your body is as resilient as any armour. While not wearing armour, you add your Constitution modifier to your armour class. Wearing Heavy Armour impedes your Rage.'
		},
		{
			level: 2,
			type: 'action',
			name: 'danger sense',
			description:
				'you gain an uncanny sense of when things nearby aren’t as they should be, giving you an edge when you dodge away from danger. You have advantage on Dexterity saving throws against effects that you can see, such as traps and spells. To gain this benefit, you can’t be blinded, deafened, or incapacitated.'
		},
		{
			level: 2,
			type: 'action',
			name: 'reckless attack',
			description:
				'Throw all caution in the wind as you attack. You have Advantage on the Attack Roll and deal Weapon Damage Slashing Damage. Until your next turn, you have Advantage on Attack Rolls, but enemies also have Advantage on Attack Rolls against you.'
		},
		{
			level: 3,
			type: 'subclass',
			name: 'Subclass',
			description:
				'You choose an archetype that you strive to emulate in your combat styles and techniques.'
		},
		{
			level: 3,
			type: 'action',
			name: 'rage',
			description: 'You gain an additional rage charge'
		}
	]
};
