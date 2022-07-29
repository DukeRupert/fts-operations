// human.ts
import type { Race } from '$lib/constants';

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

interface Cantrip {
	name: string;
	description: string;
	image: Image;
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
	special?: {
		cantrips?: Cantrip[];
		racialAbilities?: RacialAbility[];
	};
	proficiencies?: Proficiency[];
}

const human: playableRace = {
	name: 'human',
	speed: 9,
	description:
		'The most common face to see in Faerun, humans are known for their tenacity, creativity, and endless capacity for growth',
	size: 'medium'
};

export default human;
