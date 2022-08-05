<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient';

	export let id: number;

	interface StartChecklist {
		id: number;
		locates: boolean;
		locates_items: string[];
		approved_plans: boolean;
		signed_contract: boolean;
	}

	async function getChecklists(id: number) {
		try {
			let { data, error, status } = await supabaseClient
				.from('start_checklists')
				.select(`id, locates, locates_items, approved_plans, signed_contract`)
				.eq('project_id', id);

			if (error && status !== 406) throw error;

			console.log(data);

			return data as StartChecklist[];
		} catch (error) {
			console.log(error.message);
		}
	}
</script>

<div class="px-4 sm:px-6 lg:px-8">
	<div class="flex flex-col w-full border-opacity-50">
		{#await getChecklists(id)}
			<!-- getProjects() is pending -->
			<p>Loading ...</p>
		{:then projects}
			{#if projects}
				{#each projects as project}
					<div class="grid h-20 card bg-base-300 rounded-box place-items-center">content</div>
					<div class="divider">OR</div>
					<div class="grid h-20 card bg-base-300 rounded-box place-items-center">content</div>
				{/each}
			{/if}
		{:catch error}
			<!-- getProjects() was rejected -->
			<p class="text-red-500">Error</p>
		{/await}
	</div>
</div>
