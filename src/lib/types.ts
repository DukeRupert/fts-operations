// data/types.ts
export interface Cantrip {
	name: string;
	description: string;
	school: string;
	castingTime: string;
	concentration: boolean;
	classes?: PrimaryClasses[] | ['AmuletOfSelûne'];
	races?: Race[];
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
	cantrips: boolean;
	racialAbilities?: RacialAbility[];
	proficiencies?: Proficiency[];
}

export interface playerClass {
	name: PrimaryClasses;
	description: string;
	hp: number;
	savingThrows: Ability[];
	armorProfs: ArmorProficiency[];
	weaponProfs: WeaponProficiency[];
	subClass: Record<SubClasses, any>;
}

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

export type SubClasses = 'battle master' | 'eldritch knight';

export interface SubClass {
	title: string;
}

export type Race =
	| 'human'
	| 'high elf'
	| 'wood elf'
	| 'high half-elf'
	| 'wood half-elf'
	| 'lolth-sworn drow'
	| 'seldarine drow'
	| 'drow half-elf'
	| 'lightfoot halfling'
	| 'strongheart halfling'
	| 'gold dwarf'
	| 'shield dwarf'
	| 'deep gnome'
	| 'forest gnome'
	| 'rock gnome'
	| 'asmodeus tiefling'
	| 'mephistopheles tiefling'
	| 'zariel tiefling'
	| 'githyanki';

export type Ability =
	| 'strength'
	| 'dexterity'
	| 'constitution'
	| 'intelligence'
	| 'wisdom'
	| 'charisma';

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

export type Skill =
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
	skills: Skill[];
}

export type ArmorProficiency = 'light' | 'medium' | 'heavy' | 'shield';

export type WeaponProficiency = 'simple' | 'martial';
