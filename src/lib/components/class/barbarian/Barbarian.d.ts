// Barbarian.ts
import type { playerClass } from '$lib/types';

interface BarbarianClass extends playerClass {
	subClass: Record<SubClasses, any>;
}

export type SubClasses = 'berserker' | 'wildheart';
