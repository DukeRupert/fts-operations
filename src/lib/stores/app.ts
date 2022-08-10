import { writable, type Writable } from 'svelte/store';

interface AciveChecklist {
	type: 'start' | 'end' | 'daily' | '';
	id: number;
}

export const isMobileMenuOpen = writable(false);
export const isAvatarMenuOpen = writable(false);
export const activeProject: Writable<number> = writable(0);
export const activeChecklist: Writable<AciveChecklist> = writable({ type: '', id: 0 });
