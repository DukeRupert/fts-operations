<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient';
	import { activeProject, activeChecklist } from '$lib/stores/app';
	import DesktopSidebar from './DesktopSidebar.svelte';
	import MobileSidebar from './MobileSidebar.svelte';
	import Header from './Header.svelte';
	import Projects from './Projects.svelte';
	import Checklists from './Checklists.svelte';
	import StartChecklist from './Start_Checklist.svelte';

	let username: string, website: string, avatar_url: string;

	async function getProfile() {
		try {
			const user = supabaseClient!.auth.user();

			let { data, error, status } = await supabaseClient!
				.from('profiles')
				.select(`username, website, avatar_url`)
				.eq('id', user.id)
				.single();

			if (error && status !== 406) throw error;

			if (data) {
				username = data.username;
				website = data.website;
				avatar_url = data.avatar_url;
			}
		} catch (error) {
			console.log(error.message);
		}
	}

	getProfile();

	$: currentProject = $activeProject;
	$: checklistType = $activeChecklist.type;
	$: checklistId = $activeChecklist.id;
</script>

<div>
	<!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
	<MobileSidebar />

	<!-- Static sidebar for desktop -->
	<DesktopSidebar />

	<!-- Dashboard Body -->
	<div class="md:pl-64 flex flex-col flex-1">
		<Header {username} {avatar_url} />

		<main class="flex-1">
			<div class="py-6">
				<div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
					<h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
				</div>
				<div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
					<div class="py-4 flex flex-col gap-y-8">
						<Projects />
						<Checklists activeProject={currentProject} />
						{#if checklistType == 'start'}
							<StartChecklist id={checklistId} />
						{/if}
					</div>
				</div>
			</div>
		</main>
	</div>
</div>
