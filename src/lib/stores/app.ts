import { writable, type Writable } from 'svelte/store';
import type {
	ProjectRecord,
	StartChecklistRecord,
	DailyChecklistRecord,
	EndChecklistRecord
} from '$lib/supaTypes';

type ModalComponents = 'CreateProject' | 'EditProject' | 'CreateChecklist' | '';

export const user = writable(false);

// flags to track application display state
export const isMobileMenuOpen = writable(false);
export const isAvatarMenuOpen = writable(false);
export const showSlideOver = writable(false);
export const modalComponent: Writable<ModalComponents> = writable('');
export const isLoading = writable(false);

// flags to track which Project/Checklist is being operated on by the user.
export const activeProject: Writable<ProjectRecord> = writable({ id: 0 });
export const activeChecklist: Writable<
	StartChecklistRecord | DailyChecklistRecord | EndChecklistRecord | undefined
> = writable(undefined);

// flags to trigger database calls after Crud operation is complete
export const refreshProjects = writable(false);
export const refreshChecklists = writable(false);
