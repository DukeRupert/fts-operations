// cantrips.ts
import type { Cantrip } from '$lib/data/types';
export const Cantrips: Cantrip[] = [
	{
		name: 'Acid Splash',
		school: 'Conjuration',
		castingTime: '1 Action',
		concentration: false,
		description: 'Hurl a bubble of acid that deals 1d6 Acid to each creature it hits.',
		classes: ['sorcerer', 'wizard']
	},
	{
		name: 'Blade Ward',
		school: 'Abjuration',
		castingTime: '1 Action',
		concentration: false,
		description:
			'Gain resistance to Bludgeoning, Piercing and Slashing damage from weapon attacks. Inflicts Blade Ward.',
		classes: ['bard', 'sorcerer', 'warlock', 'wizard']
	},
	{
		name: 'Chill Touch',
		school: 'Necromancy',
		castingTime: '1 Action',
		concentration: false,
		description:
			'Assail a creature with the chill of the grave. It takes 1d8 Necrotic and cannot regain hit points. Undead creatures also get disadvantage on attack rolls.\nInflicts Chill Touch',
		classes: ['sorcerer', 'warlock', 'wizard']
	},
	{
		name: 'Dancing Lights',
		school: 'Evocation',
		castingTime: '1 Action',
		concentration: true,
		description: 'Create wisps of light that illuminate a 12m radius.',
		classes: ['bard', 'sorcerer', 'wizard']
	},
	{
		name: 'druidcraft',
		school: 'Transmutation',
		castingTime: '1 Action',
		concentration: false,
		description:
			'Provide various minor effects related to nature (weather forecast, flowering, sensory effect, etc).',
		classes: ['druid']
	},
	{
		name: 'Eldritch Blast',
		school: 'Evocation',
		castingTime: '1 Action',
		concentration: false,
		description: 'Conjure a beam of crackling energy that deals 1d10 Force.',
		classes: ['warlock']
	},
	{
		name: 'Fire Bolt',
		school: 'Evocation',
		castingTime: '1 Action',
		concentration: false,
		description: 'Hurl a mote of fire that deals 1d10 Fire and creates a flammable surface.',
		classes: ['sorcerer', 'wizard']
	},
	{
		name: 'Friends',
		school: 'Enchantment',
		castingTime: '1 Action',
		concentration: true,
		description: 'Enchant a non-hostile creature to gain advantage on Charisma checks against it.',
		classes: ['bard', 'sorcerer', 'warlock', 'wizard']
	},
	{
		name: 'Githyanki Psionics: Mage Hand',
		school: 'Conjuration',
		castingTime: '1 Action',
		concentration: true,
		description: 'Create an invisible spectral hand that can manipulate and interact with objects.',
		classes: ['githyanki']
	},
	{
		name: 'Guidance',
		school: 'Divination',
		castingTime: '1 Action',
		concentration: true,
		description:
			'Bestow guidance upon a creature. It receives a d4 bonus to an ability check of its choice.',
		classes: ['cleric', 'druid']
	},
	{
		name: 'Light',
		school: 'Evocation',
		castingTime: '1 Action',
		concentration: false,
		description: 'Infuse an object with an aura of light.',
		classes: ['bard', 'cleric', 'sorcerer', 'wizard']
	},
	{
		name: 'Mage Hand',
		school: 'Conjuration',
		castingTime: '1 Action',
		concentration: false,
		description: 'Create a spectral hand that can manipulate and interact with objects.',
		classes: ['bard', 'sorcerer', 'warlock', 'wizard']
	},
	{
		name: 'Mending',
		school: 'Transmutation',
		castingTime: '1 Minute',
		concentration: false,
		description:
			'Repair break or tear in an object (broken chain link, two halves of a broken key, torn cloak, leaking wineskin, etc).',
		classes: ['bard', 'cleric', 'druid', 'sorcerer', 'wizard']
	},
	{
		name: 'Message',
		school: 'Transmutation',
		castingTime: '1 Action',
		concentration: false,
		description:
			'The caster whispers a message to a creature within 120 ft who will be the only one to hear it. It can reply the same way.',
		classes: ['bard', 'sorcerer', 'wizard']
	},
	{
		name: 'Minor Illusion',
		school: 'Illusion',
		castingTime: '1 Action',
		concentration: false,
		description:
			'Create an illusory image that distracts nearby creatures compelling them to investigate.\nYou can remain hidden while casting this spell.',
		classes: ['bard', 'sorcerer', 'warlock', 'wizard']
	},
	{
		name: 'Poison Spray',
		school: 'Conjuration',
		castingTime: '1 Action',
		concentration: false,
		description: 'Project a puff of noxious gas that deals 1d12 Poison.',
		classes: ['druid', 'sorcerer', 'warlock', 'wizard']
	},
	{
		name: 'Prestidigitation',
		school: 'Transmutation',
		castingTime: '1 Action',
		concentration: false,
		description:
			'Minor magical trick (sensory effect, light a torch, clean an object, warm, make a symbol appear, create a trinket, etc).',
		classes: ['bard', 'sorcerer', 'warlock', 'wizard']
	},
	{
		name: 'Produce Flame',
		school: 'Conjuration',
		castingTime: '1 Action',
		concentration: false,
		description:
			'A flickering flame appears in your hand. It sheds bright light in a 3m radius and deals 1d8 Fire damage when thrown.\nThrowing the flame immediately after you conjure it does not cost an action. Extinguishing or throwing it on subsequent turns costs an action.',
		classes: ['druid']
	},
	{
		name: 'Ray of Frost',
		school: 'Evocation',
		castingTime: '1 Action',
		concentration: false,
		description:
			"Call forth a frigid beam of blue-white light. Deals 1d8 Cold and reduces the targe's speed by 3m\nInflicts Ray of Frost",
		classes: ['sorcerer', 'wizard']
	},
	{
		name: 'Resistance',
		school: 'Abjuration',
		castingTime: '1 Action',
		concentration: true,
		description:
			"Magically bolster a creature's defenses. It receives a d4 bonus to saving throws.",
		classes: ['cleric', 'druid']
	},
	{
		name: 'Sacred Flame',
		school: 'Evocation',
		castingTime: '1 Action',
		concentration: false,
		description: 'Conjure a flame-like radiance that deals 1d8 Radiant.',
		classes: ['cleric']
	},
	{
		name: "Selûne's Dream",
		school: 'Evocation',
		castingTime: '1 Action',
		concentration: false,
		description:
			'A creature you touch regains 1d8-1 hit points but potentially falls into a slumber.',
		classes: ["Amulet of Selûne's Chosen wearer"]
	},
	{
		name: 'Shillelagh',
		school: 'Transmutation',
		castingTime: '1 Bonus Action',
		concentration: false,
		description:
			"Imbue your staff or club with nature's power. It becomes magical deals 1d8+Wisdom Bludgeoning damage and you use your spellcasting ability for attack rolls.",
		classes: ['druid']
	},
	{
		name: 'Shocking Grasp',
		school: 'Evocation',
		castingTime: '1 Action',
		concentration: false,
		description:
			'Lightning springs from your hand. It deal 1d8 Lightning and prevents the target from taking reactions.\nInflicts Shocking Grasp',
		classes: ['sorcerer', 'wizard']
	},
	{
		name: 'Spare the Dying',
		school: 'Necromancy',
		castingTime: '1 Action',
		concentration: false,
		description: '1 living creature with 0 hit points becomes stable.',
		classes: ['cleric']
	},
	{
		name: 'Thaumaturgy',
		school: 'Transmutation',
		castingTime: '1 Action',
		concentration: false,
		description:
			'Manifest a sign of supernatural power that grants you advantage on Intimidation and Performance checks.',
		classes: ['cleric']
	},
	{
		name: 'Thorn Whip',
		school: 'Transmutation',
		castingTime: '1 Action',
		concentration: false,
		description:
			'Strike at a target with a thorny vine-like whip. It deals 1d6 Piercing damage and pulls the target 3m closer to you if it is Large or Smaller in size.',
		classes: ['druid']
	},
	{
		name: 'True Strike',
		school: 'Divination',
		castingTime: '1 Action',
		concentration: true,
		description: "Divine a character's defenses to give you advantage on attack rolls against it.",
		classes: ['bard', 'sorcerer', 'warlock', 'wizard']
	},
	{
		name: 'Vicious Mockery',
		school: 'Enchantment',
		castingTime: '1 Action',
		concentration: false,
		description:
			'The target must succeed on a Wis. save or take 1d4 psychic damage and have disadvantage on its attack roll (damage/lvl).',
		classes: ['bard']
	}
];
