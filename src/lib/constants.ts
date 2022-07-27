// constants.ts
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

export type PrimaryClasses =
	| 'cleric'
	| 'fighter'
	| 'ranger'
	| 'rogue'
	| 'warlock'
	| 'wizard'
	| 'druid'
	| 'sorcerer'
	| 'barbarian'
	| 'bard';

export interface SubClass {
	title: string;
}

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
	ELF = 'elf',
	DWARF = 'dwarf',
	HALF_ELF = 'half-elf',
	HALFLING = 'halfling',
	TIEFLING = 'tiefling',
	DROW = 'drow',
	HALF_DROW = 'half-drow',
	GITHYANKI = 'githyanki',
	VAMPIRE = 'vampire spawn'
}

export type Race =
	| 'human'
	| 'elf'
	| 'half-elf'
	| 'halfling'
	| 'dwarf'
	| 'tiefling'
	| 'drow'
	| 'half-drow'
	| 'githyanki'
	| 'vampire';

export const RaceOptions = Object.values(RACE);

export type Background =
	| 'accolyte'
	| 'charlatan'
	| 'criminal'
	| 'entertainer'
	| 'folk hero'
	| 'guild artisan'
	| 'noble'
	| 'hermit'
	| 'outlander'
	| 'sage'
	| 'sailor'
	| 'soldier'
	| 'urchin';

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

export type Proficiency =
	| 'acrobatics'
	| 'animal handling'
	| 'arcana'
	| 'athletics'
	| 'deception'
	| 'history'
	| 'insight'
	| 'intimidation'
	| 'investigation'
	| 'medicine'
	| 'perception'
	| 'performance'
	| 'persuasion'
	| 'religion'
	| 'sleight of hand'
	| 'stealth'
	| 'survival';

export interface BackgroundDetails {
	title: string;
	description: string;
	proficiencies: Proficiency[];
}

export const BackgroundDetails: Record<Background, BackgroundDetails> = {
	accolyte: {
		title: 'accolyte',
		description:
			'You have spent your life in service to a temple, learning sacred rites and providing sacrifices to the god or gods you worship. Serving the gods and discovering their sacred works will you to greatness.',
		proficiencies: ['insight', 'religion']
	},
	charlatan: {
		title: 'charlatan',
		description:
			"You're an expert in manipulation, prone to exaggeration and more than happy to profit from it. Bending the truth and turning allies against each other will bring you success down the road.",
		proficiencies: ['deception', 'sleight of hand']
	},
	criminal: {
		title: 'criminal',
		description:
			'You have a history of breaking the law and survive by leveraging less-than-legal connections. Profiting from criminal enterprise will lead to greater opportunities in the future.',
		proficiencies: ['deception', 'stealth']
	},
	entertainer: {
		title: 'entertainer',
		description:
			'You live to sway and subvert your audience, engaging common crowds and high society alike.',
		proficiencies: ['acrobatics', 'performance']
	},
	'folk hero': {
		title: 'folk hero',
		description:
			"You're a champion of the common people, challenging tyrants and monsters to protect the helpless. Saving innocents in imminent danger will make your legend grow.",
		proficiencies: ['animal handling', 'survival']
	},
	'guild artisan': {
		title: 'guild artisan',
		description:
			'Your skill in a particular craft has earned you membership in a mercantile guild, offering privileges and protection while engaging in your art. Repairing and discovering rare crafts will bring new inspiration.',
		proficiencies: ['insight', 'persuasion']
	},
	noble: {
		title: 'noble',
		description:
			'You were raised in a family among the social elite, accustomed to power and privilege. Accumulating renown, power, and loyalty will raise your status.',
		proficiencies: ['history', 'persuasion']
	},
	hermit: {
		title: 'hermit',
		description:
			'You were once sworn to seclusion and continue to prefer solitude over the chaos of society.',
		proficiencies: ['medicine', 'religion']
	},
	outlander: {
		title: 'outlander',
		description:
			'You grew up in the wilds, learning to survive far from the comforts of civilization. Surviving unusual hazards of the wild will enhance your prowess and understanding.',
		proficiencies: ['athletics', 'survival']
	},
	sage: {
		title: 'sage',
		description:
			'You are curious and well-read, with an unending thirst for knowledge. Learning about rare lore of the world will inspire you to put this knowledge to greater purpose.',
		proficiencies: ['arcana', 'history']
	},
	sailor: {
		title: 'sailor',
		description:
			'You are familiar with the workings of ships and life at sea, having spent years weathering storms and battling creatures of the deep. ',
		proficiencies: ['athletics', 'perception']
	},
	soldier: {
		title: 'soldier',
		description:
			'You are trained in battlefield tactics and combat, having served in a militia, mercenary company, or officer corps. Show smart tactics and bravery on the battlefield to enhance your prowess.',
		proficiencies: ['athletics', 'intimidation']
	},
	urchin: {
		title: 'urchin',
		description:
			'After surviving a childhood on the streets, you know how to make the most out of very little. Using your street smarts bolsters your spirit for the journey ahead.',
		proficiencies: ['sleight of hand', 'stealth']
	}
};

export interface Effect {
	id: number;
	modifier: number;
	description: string;
}

export const BASE_ABILITY_SCORE = 8;
export const MAX_BASE_ABILITY_SCORE = 15;
