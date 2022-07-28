// human.ts
import type { Race, Effect } from '$lib/constants';
import { generateId } from '$lib/utils';

interface playableRace {
	name: Race;
	speed: number;
	description: string;
	subraces?: string[];
	effects?: Effect[];
}

const human: playableRace = {
	name: 'human',
	speed: 9,
	description:
		'The most common face to see in Faerun, humans are known for their tenacity, creativity, and endless capacity for growth',
	effects: [
		{
			id: generateId(1000),
			modifier: 1,
			description: 'Racial Bonus',
			attribute: 'strength'
		},
		{
			id: generateId(1000),
			modifier: 1,
			description: 'Racial Bonus',
			attribute: 'dexterity'
		},
		{
			id: generateId(1000),
			modifier: 1,
			description: 'Racial Bonus',
			attribute: 'constitution'
		},
		{
			id: generateId(1000),
			modifier: 1,
			description: 'Racial Bonus',
			attribute: 'intelligence'
		},
		{
			id: generateId(1000),
			modifier: 1,
			description: 'Racial Bonus',
			attribute: 'wisdom'
		},
		{
			id: generateId(1000),
			modifier: 1,
			description: 'Racial Bonus',
			attribute: 'charisma'
		}
	]
};

export default human;
