// constants.ts
import type { Background, BackgroundDetails, PrimaryClasses, SubClass } from './types';

export enum CLASSES {
	CLERIC = 'cleric',
	FIGHTER = 'fighter',
	RANGER = 'ranger',
	ROGUE = 'rogue',
	WARLOCK = 'warlock',
	WIZARD = 'wizard',
	DRUID = 'druid',
	SORCERER = 'sorcerer',
	BARBARIAN = 'barbarian',
	BARD = 'bard'
}

export const ClassOptions = Object.values(CLASSES);

export const SubClassOptions: Record<PrimaryClasses, SubClass[]> = {
	cleric: [{ title: 'life domain' }, { title: 'light domain' }, { title: 'trickery domain' }],
	fighter: [{ title: 'battle master' }, { title: 'eldritch knight' }],
	ranger: [{ title: 'beast master' }, { title: 'hunter' }],
	rogue: [{ title: 'thief' }, { title: 'arcane trickster' }],
	warlock: [{ title: 'the fiend' }, { title: 'the great old one' }],
	wizard: [{ title: 'abjuration school' }, { title: 'evocation school' }],
	druid: [{ title: 'circle of the moon' }, { title: 'circle of the land' }],
	sorcerer: [{ title: 'draconic bloodline' }, { title: 'wild magic' }],
	barbarian: [{ title: 'berserker' }, { title: 'wildheart' }],
	bard: [{ title: 'college of lore' }, { title: 'college of valour' }]
};

export enum RACE {
	HUMAN = 'human',
	HIGH_ELF = 'high elf',
	WOOD_ELF = 'wood elf',
	HIGH_HALF_ELF = 'high half-elf',
	WOOD_HALF_ELF = 'wood half-elf',
	LOLTH_DROW = 'lolth-sworn drow',
	SELDARINE_DROW = 'seldarine drow',
	DROW_HALF_ELF = 'drow half-elf',
	LIGHTFOOT = 'lightfoot halfling',
	STRONGHEART = 'strongheart halfling',
	GOLD_DWARF = 'gold dwarf',
	SHIELD_DWARF = 'shield dwarf',
	DEEP_GNOME = 'deep gnome',
	FOREST_GNOME = 'forest gnome',
	ROCK_GNOME = 'rock gnome',
	ASMODEUS = 'asmodeus tiefling',
	MEPHISTOPHELES = 'mephistopheles tiefling',
	ZARIEL = 'zariel tiefling',
	GITHYANKI = 'githyanki'
}

export const RaceOptions = Object.values(RACE);

export enum ABILITY {
	STRENGTH = 'strength',
	DEXTERITY = 'dexterity',
	CONSTITUTION = 'constitution',
	INTELLIGENCE = 'intelligence',
	WISDOM = 'wisdom',
	CHARISMA = 'charisma'
}

export const AbilityOptions = Object.values(ABILITY);

export enum BACKGROUND {
	ACCOLYTE = 'accolyte',
	CHARLATAN = 'charlatan',
	CRIMINAL = 'criminal',
	ENTERTAINER = 'entertainer',
	FOLK_HERO = 'folk hero',
	GUILD_ARTISAN = 'guild artisan',
	NOBLE = 'noble',
	HERMIT = 'hermit',
	OUTLANDER = 'outlander',
	SAGE = 'sage',
	SAILOR = 'sailor',
	SOLDIER = 'soldier',
	URCHIN = 'urchin'
}

export const BackgroundOptions = Object.values(BACKGROUND);

export const Backgrounds: Record<Background, BackgroundDetails> = {
	accolyte: {
		title: 'accolyte',
		description:
			'You have spent your life in service to a temple, learning sacred rites and providing sacrifices to the god or gods you worship. Serving the gods and discovering their sacred works will you to greatness.',
		skills: ['insight', 'religion']
	},
	charlatan: {
		title: 'charlatan',
		description:
			"You're an expert in manipulation, prone to exaggeration and more than happy to profit from it. Bending the truth and turning allies against each other will bring you success down the road.",
		skills: ['deception', 'sleight of hand']
	},
	criminal: {
		title: 'criminal',
		description:
			'You have a history of breaking the law and survive by leveraging less-than-legal connections. Profiting from criminal enterprise will lead to greater opportunities in the future.',
		skills: ['deception', 'stealth']
	},
	entertainer: {
		title: 'entertainer',
		description:
			'You live to sway and subvert your audience, engaging common crowds and high society alike.',
		skills: ['acrobatics', 'performance']
	},
	'folk hero': {
		title: 'folk hero',
		description:
			"You're a champion of the common people, challenging tyrants and monsters to protect the helpless. Saving innocents in imminent danger will make your legend grow.",
		skills: ['animal handling', 'survival']
	},
	'guild artisan': {
		title: 'guild artisan',
		description:
			'Your skill in a particular craft has earned you membership in a mercantile guild, offering privileges and protection while engaging in your art. Repairing and discovering rare crafts will bring new inspiration.',
		skills: ['insight', 'persuasion']
	},
	noble: {
		title: 'noble',
		description:
			'You were raised in a family among the social elite, accustomed to power and privilege. Accumulating renown, power, and loyalty will raise your status.',
		skills: ['history', 'persuasion']
	},
	hermit: {
		title: 'hermit',
		description:
			'You were once sworn to seclusion and continue to prefer solitude over the chaos of society.',
		skills: ['medicine', 'religion']
	},
	outlander: {
		title: 'outlander',
		description:
			'You grew up in the wilds, learning to survive far from the comforts of civilization. Surviving unusual hazards of the wild will enhance your prowess and understanding.',
		skills: ['athletics', 'survival']
	},
	sage: {
		title: 'sage',
		description:
			'You are curious and well-read, with an unending thirst for knowledge. Learning about rare lore of the world will inspire you to put this knowledge to greater purpose.',
		skills: ['arcana', 'history']
	},
	sailor: {
		title: 'sailor',
		description:
			'You are familiar with the workings of ships and life at sea, having spent years weathering storms and battling creatures of the deep. ',
		skills: ['athletics', 'perception']
	},
	soldier: {
		title: 'soldier',
		description:
			'You are trained in battlefield tactics and combat, having served in a militia, mercenary company, or officer corps. Show smart tactics and bravery on the battlefield to enhance your prowess.',
		skills: ['athletics', 'intimidation']
	},
	urchin: {
		title: 'urchin',
		description:
			'After surviving a childhood on the streets, you know how to make the most out of very little. Using your street smarts bolsters your spirit for the journey ahead.',
		skills: ['sleight of hand', 'stealth']
	}
};

export const BASE_ABILITY_SCORE = 8;
export const MAX_BASE_ABILITY_SCORE = 15;
