import { writable, derived, type Writable, type Readable } from 'svelte/store';
import {
	type PrimaryClasses,
	type Race,
	type Background,
	type Effect,
	BASE_ABILITY_SCORE,
	MAX_BASE_ABILITY_SCORE
} from '$lib/constants';

export const primaryClass: Writable<PrimaryClasses> = writable('fighter');

export const subClass: Writable<string> = writable('battle master');

export const race: Writable<Race> = writable('human');

export const background: Writable<Background> = writable('accolyte');

export const level: Writable<number> = writable(1);

// total points the user can allocate
export const abilityPoints: Readable<number> = derived([level], ([$level]) => {
	const basePoints = 27;
	const levelPoints = Math.floor($level / 4);
	return basePoints + levelPoints;
});

// max number of points the user can assign to a single ability
export const maxAbilityPointAllocation: Readable<number> = derived(level, ($level) => {
	const levelPoints = Math.floor($level / 4);
	return MAX_BASE_ABILITY_SCORE + levelPoints;
});

// points assigned to each ability
export const strengthPointAllocation: Writable<number> = writable(0);
export const dexterityPointAllocation: Writable<number> = writable(0);
export const constitutionPointAllocation: Writable<number> = writable(0);
export const intelligencePointAllocation: Writable<number> = writable(0);
export const wisdomPointAllocation: Writable<number> = writable(0);
export const charismaPointAllocation: Writable<number> = writable(0);

// total number of points assigned to abilities
export const allocatedPoints: Readable<number> = derived(
	[
		strengthPointAllocation,
		dexterityPointAllocation,
		constitutionPointAllocation,
		intelligencePointAllocation,
		wisdomPointAllocation,
		charismaPointAllocation
	],
	([
		$strengthPointAllocation,
		$dexterityPointAllocation,
		$constitutionPointAllocation,
		$intelligencePointAllocation,
		$wisdomPointAllocation,
		$charismaPointAllocation
	]) => {
		const all = [
			$strengthPointAllocation,
			$dexterityPointAllocation,
			$constitutionPointAllocation,
			$intelligencePointAllocation,
			$wisdomPointAllocation,
			$charismaPointAllocation
		];
		const totalAllocated = all.reduce((pre, cur) => pre + cur);
		return totalAllocated;
	}
);

// track ability modifiers
export const strengthEffects: Writable<Effect[] | []> = writable([]);
export const dexterityEffects: Writable<Effect[] | []> = writable([]);
export const constitutionEffects: Writable<Effect[] | []> = writable([]);
export const intelligenceEffects: Writable<Effect[] | []> = writable([]);
export const wisdomEffects: Writable<Effect[] | []> = writable([]);
export const charismaEffects: Writable<Effect[] | []> = writable([]);

// ability scores
export const strength: Readable<number> = derived(
	[strengthEffects, strengthPointAllocation],
	([$strengthEffects, $strengthPointAllocation]) => {
		const base = BASE_ABILITY_SCORE;
		const totalEffect = 0;
		return base + totalEffect + $strengthPointAllocation;
	}
);

export const dexterity: Readable<number> = derived(
	[dexterityEffects, dexterityPointAllocation],
	([$dexterityEffects, $dexterityPointAllocation]) => {
		const base = BASE_ABILITY_SCORE;
		const totalEffect = 0;
		return base + totalEffect + $dexterityPointAllocation;
	}
);

export const constitution: Readable<number> = derived(
	[constitutionEffects, constitutionPointAllocation],
	([$constitutionEffects, $constitutionPointAllocation]) => {
		const base = BASE_ABILITY_SCORE;
		const totalEffect = 0;
		return base + totalEffect + $constitutionPointAllocation;
	}
);

export const intelligence: Readable<number> = derived(
	[intelligenceEffects, intelligencePointAllocation],
	([$intelligenceEffects, $intelligencePointAllocation]) => {
		const base = BASE_ABILITY_SCORE;
		const totalEffect = 0;
		return base + totalEffect + $intelligencePointAllocation;
	}
);

export const wisdom: Readable<number> = derived(
	[wisdomEffects, wisdomPointAllocation],
	([$wisdomEffects, $wisdomPointAllocation]) => {
		const base = BASE_ABILITY_SCORE;
		const totalEffect = 0;
		return base + totalEffect + $wisdomPointAllocation;
	}
);

export const charisma: Readable<number> = derived(
	[charismaEffects, charismaPointAllocation],
	([$charismaEffects, $charismaPointAllocation]) => {
		const base = BASE_ABILITY_SCORE;
		const totalEffect = 0;
		return base + totalEffect + $charismaPointAllocation;
	}
);
