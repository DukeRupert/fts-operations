import { writable, type Writable } from 'svelte/store';
import type { ProjectRecord } from '$lib/supaTypes';

type ModalComponents = 'CreateProject' | 'EditProject' | '';

export const user = writable(false);
export const showModal = writable(false);
export const modalComponent: Writable<ModalComponents> = writable('');
interface AciveChecklist {
	type: 'start' | 'end' | 'daily' | '';
	id: number;
}

export const isMobileMenuOpen = writable(false);
export const isAvatarMenuOpen = writable(false);
export const refreshProjects = writable(false);
export const activeProject: Writable<ProjectRecord> = writable({});
export const activeChecklist: Writable<AciveChecklist> = writable({ type: '', id: 0 });
