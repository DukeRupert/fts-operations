<script lang="ts">
	import type {
		AllChecklists,
		StartChecklistRecord,
		DailyChecklistRecord,
		EndChecklistRecord
	} from '$lib/supaTypes';
	import { supabaseClient } from '$lib/supabaseClient';
	import {
		activeChecklist,
		activeProject,
		modalComponent,
		showSlideOver,
		refreshChecklists
	} from '$lib/stores/app';
	import { fade } from 'svelte/transition';
	import { quintIn } from 'svelte/easing';
	import { FLY_DURATION } from '$lib/constants';

	let loading = false;
	$: ({ id: projectId } = $activeProject);
	let checklists: AllChecklists;
	let selectedId: number;

	async function getStartChecklists(id: number) {
		try {
			const { data, error } = await supabaseClient!
				.from('start_checklists')
				.select()
				.eq('project_id', id);

			if (error) throw error;
			return data as StartChecklistRecord[];
		} catch (error) {
			console.log(error.message);
		}
	}

	async function getDailyChecklists(id: number) {
		try {
			const { data, error } = await supabaseClient!
				.from('daily_checklists')
				.select()
				.eq('project_id', id);

			if (error) throw error;
			return data as DailyChecklistRecord[];
		} catch (error) {
			console.log(error.message);
		}
	}

	async function getEndChecklists(id: number) {
		try {
			const { data, error } = await supabaseClient!
				.from('end_checklists')
				.select()
				.eq('project_id', id);

			if (error) throw error;
			return data as EndChecklistRecord[];
		} catch (error) {
			console.log(error.message);
		}
	}

	function formatDate(str: string) {
		return str.replaceAll('-', '');
	}

	async function getChecklists(id: number) {
		const arr: AllChecklists = [];
		try {
			loading = true;
			const starts = (await getStartChecklists(id)) ?? [];
			arr.push(...starts);
			const dailies = (await getDailyChecklists(id)) ?? [];
			arr.push(...dailies);
			const ends = (await getEndChecklists(id)) ?? [];
			arr.push(...ends);

			arr.sort((a, b) => {
				// descending by date
				const aDate = formatDate(a.date);
				const bDate = formatDate(b.date);
				return aDate < bDate ? 1 : aDate > bDate ? -1 : 0;
			});
			checklists = arr;
			return;
		} catch (error) {
			console.log(error.message);
		} finally {
			loading = false;
		}
	}

	function handleClick(e: MouseEvent) {
		const record = e?.currentTarget.id;
		const [id, type] = record.split('-');
		const result = checklists.find((el) => el.id == id && el.type == type);
		$activeChecklist = result;
	}

	function addChecklist() {
		$modalComponent = 'CreateChecklist';
		$showSlideOver = true;
	}

	$: if ($refreshChecklists) {
		$refreshChecklists = false;
		getChecklists(projectId);
	}
</script>

<div
	in:fade={{ duration: FLY_DURATION, easing: quintIn }}
	class="px-4 sm:px-6 lg:px-8 mt-6 md:mt-8 lg:mt-10"
>
	<div class="sm:flex sm:items-center">
		<div class="sm:flex-auto">
			<h1 class="text-xl font-semibold text-gray-900">Checklists</h1>
			<p class="mt-2 text-sm text-gray-700">All the checklists for FIXME project.</p>
		</div>
		<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
			<button
				on:click|preventDefault={addChecklist}
				type="button"
				class="btn btn-primary {projectId ? '' : 'btn-disabled'}">Add Checklist</button
			>
		</div>
	</div>
	<div
		class="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg"
	>
		<table class="min-w-full divide-y divide-gray-300">
			<thead class="bg-gray-50">
				<tr>
					<th
						scope="col"
						class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Type</th
					>
					<th
						scope="col"
						class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">Date</th
					>

					<!-- <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
						>Status</th
					> -->
					<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
						<span class="sr-only">Edit</span>
					</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200 bg-white">
				{#await getChecklists(projectId)}
					<!-- getProjects() is pending -->
					<p>Loading ...</p>
				{:then}
					{#if checklists}
						{#each checklists as checklist}
							<tr
								id={checklist.id.toString() + '-' + checklist.type}
								on:click={handleClick}
								class="{checklist.id == selectedId
									? 'bg-primary text-white'
									: 'text-gray-900'} hover:bg-primary hover:text-white selection:bg-primary"
							>
								<td class="py-4 pl-4 pr-3 text-sm font-medium">
									{checklist.type}
								</td>
								<td class="py-4 pl-4 pr-3 text-sm font-medium">
									{checklist.date}
								</td>
								<td />
							</tr>
						{/each}
					{/if}
				{:catch error}
					<!-- getProjects() was rejected -->
					<p class="text-red-500">{error}</p>
				{/await}
			</tbody>
		</table>
	</div>
</div>
