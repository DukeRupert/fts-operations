import { writable, derived, type Writable, type Readable } from 'svelte/store';
import type { PrimaryClasses, Race, Background } from './constants';

export const primaryClass: Writable<PrimaryClasses> = writable('fighter');

export const subClass: Writable<string> = writable('battle master');

export const race: Writable<Race> = writable('human');

export const background: Writable<Background> = writable('accolyte');

export const level: Writable<number> = writable(1);

export const allocatedPoints: Writable<number> = writable(0);

export const abilityPoints: Readable<number> = derived(
	[level, allocatedPoints],
	([$level, $allocatedPoints]) => {
		const basePoints = 27;
		const levelPoints = Math.floor($level / 4);
		return basePoints + levelPoints - $allocatedPoints;
	}
);
