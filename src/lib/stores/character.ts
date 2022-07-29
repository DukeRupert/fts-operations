import { writable, derived, type Writable, type Readable } from 'svelte/store';
import { RACE, BASE_ABILITY_SCORE, MAX_BASE_ABILITY_SCORE, AbilityOptions } from '$lib/constants';
import type { PrimaryClasses, Race, Background, Ability } from '$lib/types';

export const primaryClass: Writable<PrimaryClasses> = writable('fighter');

export const subClass: Writable<string> = writable('battle master');

export const race: Writable<Race> = writable('human');

export const background: Writable<Background> = writable('accolyte');

export const level: Writable<number> = writable(1);

function ifHalfElf(race: string): number {
	switch (race) {
		case RACE.HIGH_HALF_ELF:
			return 2;
		case RACE.WOOD_HALF_ELF:
			return 2;
		case RACE.DROW_HALF_ELF:
			return 2;
		default:
			return 0;
	}
}

// total points the user can allocate
export const abilityPoints: Readable<number> = derived([level, race], ([$level, $race]) => {
	const basePoints = 27;
	const levelPoints = Math.floor($level / 4);
	const racePoints: number = ifHalfElf($race);
	return basePoints + levelPoints + racePoints;
});

// max number of points the user can assign to a single ability
export const maxAbilityPointAllocation: Readable<number> = derived(level, ($level) => {
	const levelPoints = Math.floor($level / 4);
	return MAX_BASE_ABILITY_SCORE + levelPoints - BASE_ABILITY_SCORE;
});

// total number of points assigned to abilities
export const abilityPointAllocation: Writable<Record<Ability, number>> = writable({
	strength: 0,
	dexterity: 0,
	constitution: 0,
	intelligence: 0,
	wisdom: 0,
	charisma: 0
});

export const totalAllocatedPoints: Readable<number> = derived(
	abilityPointAllocation,
	($abilityPointAllocation) => {
		const arr = Object.values($abilityPointAllocation);
		const total = arr.reduce((pre, cur) => pre + cur);
		return total;
	}
);

// track racial ability modifiers
function getRaceStrMod(race: Race): number {
	switch (race) {
		case RACE.HUMAN:
			return 1;
		case RACE.SHIELD_DWARF:
			return 2;
		case RACE.GITHYANKI:
			return 2;
		case RACE.ZARIEL:
			return 1;
		default:
			return 0;
	}
}

function getRaceDexMod(race: Race): number {
	switch (race) {
		case RACE.HUMAN:
			return 1;
		case RACE.HIGH_ELF:
			return 2;
		case RACE.WOOD_ELF:
			return 2;
		case RACE.LOLTH_DROW:
			return 2;
		case RACE.SELDARINE_DROW:
			return 2;
		case RACE.LIGHTFOOT:
			return 2;
		case RACE.STRONGHEART:
			return 2;
		case RACE.DEEP_GNOME:
			return 1;
		case RACE.FOREST_GNOME:
			return 1;
		default:
			return 0;
	}
}

function getRaceConMod(race: Race): number {
	switch (race) {
		case RACE.HUMAN:
			return 1;
		case RACE.STRONGHEART:
			return 1;
		case RACE.ROCK_GNOME:
			return 1;
		case RACE.GOLD_DWARF:
			return 2;
		case RACE.SHIELD_DWARF:
			return 2;
		default:
			return 0;
	}
}

function getRaceIntMod(race: Race): number {
	switch (race) {
		case RACE.HUMAN:
			return 1;
		case RACE.HIGH_ELF:
			return 1;
		case RACE.ROCK_GNOME:
			return 2;
		case RACE.FOREST_GNOME:
			return 2;
		case RACE.DEEP_GNOME:
			return 2;
		case RACE.GITHYANKI:
			return 1;
		case RACE.ASMODEUS:
			return 1;
		case RACE.MEPHISTOPHELES:
			return 1;
		default:
			return 0;
	}
}

function getRaceWisMod(race: Race): number {
	switch (race) {
		case RACE.HUMAN:
			return 1;
		case RACE.WOOD_ELF:
			return 1;
		case RACE.GOLD_DWARF:
			return 1;
		default:
			return 0;
	}
}

function getRaceChaMod(race: Race): number {
	switch (race) {
		case RACE.HUMAN:
			return 1;
		case RACE.LOLTH_DROW:
			return 1;
		case RACE.SELDARINE_DROW:
			return 1;
		case RACE.HIGH_HALF_ELF:
			return 2;
		case RACE.WOOD_HALF_ELF:
			return 2;
		case RACE.DROW_HALF_ELF:
			return 2;
		case RACE.LIGHTFOOT:
			return 1;
		case RACE.ASMODEUS:
			return 2;
		case RACE.MEPHISTOPHELES:
			return 2;
		case RACE.ZARIEL:
			return 2;
		default:
			return 0;
	}
}

export const raceAbilityModifier = derived(race, ($race) => {
	const str = getRaceStrMod($race);
	const dex = getRaceDexMod($race);
	const con = getRaceConMod($race);
	const int = getRaceIntMod($race);
	const wis = getRaceWisMod($race);
	const cha = getRaceChaMod($race);
	return {
		strength: str,
		dexterity: dex,
		constitution: con,
		intelligence: int,
		wisdom: wis,
		charisma: cha
	};
});

function getAbilityScore(pointAllocation: number, racialMod: number) {
	const base = BASE_ABILITY_SCORE;
	const modifiers = [pointAllocation, racialMod];
	const totalModifiers = modifiers.reduce((pre, cur) => pre + cur);
	return base + totalModifiers;
}

export const abilityScores = derived(
	[abilityPointAllocation, raceAbilityModifier],
	([$abilityPointAllocation, $raceAbilityModifier]) => {
		const abilityScores: Record<Ability, number> = {
			strength: 0,
			dexterity: 0,
			constitution: 0,
			intelligence: 0,
			wisdom: 0,
			charisma: 0
		};
		AbilityOptions.map(
			(v) =>
				(abilityScores[v] = getAbilityScore($abilityPointAllocation[v], $raceAbilityModifier[v]))
		);
		return abilityScores;
	}
);
