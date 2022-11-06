<script lang="ts">
	import type {
		AllChecklists,
		StartChecklistRecord,
		DailyChecklistRecord,
		EndChecklistRecord
	} from '$lib/supaTypes';
	import { supabaseClient } from '$lib/supabaseClient';
	import { activeChecklist, activeProject, refreshChecklists } from '$lib/stores/app';
	import { fade } from 'svelte/transition';
	import { quintIn } from 'svelte/easing';
	import { FLY_DURATION } from '$lib/constants';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	let loading = false;
	$: ({ id: projectId } = $activeProject);
	let checklists: AllChecklists;
	let selectedId: string;
	let selectedType: string;

	async function getStartChecklists(id: number) {
		try {
			const { data, error } = await supabaseClient!
				.from('start_checklists')
				.select()
				.eq('project_id', id);

			if (error) throw error;
			return data as StartChecklistRecord[];
		} catch (error: any) {
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
		} catch (error: any) {
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
		} catch (error: any) {
			console.log(error.message);
		}
	}

	function formatDate(str: string) {
		return str.replaceAll('-', '');
	}

	async function getChecklists(id: number) {
		let arr: AllChecklists = [];
		try {
			loading = true;
			const starts = (await getStartChecklists(id)) ?? [];
			arr = [...arr, ...starts];
			const dailies = (await getDailyChecklists(id)) ?? [];
			arr = [...arr, ...dailies];
			const ends = (await getEndChecklists(id)) ?? [];
			arr = [...arr, ...ends];

			arr.sort((a, b) => {
				// descending by date
				const aDate = formatDate(a.date);
				const bDate = formatDate(b.date);
				return aDate < bDate ? 1 : aDate > bDate ? -1 : 0;
			});
			checklists = arr;
			return;
		} catch (error: any) {
			console.log(error.message);
		} finally {
			loading = false;
		}
	}

	function handleClick(e: MouseEvent) {
		const curTarget = e?.currentTarget as HTMLButtonElement;
		const record = curTarget?.id ?? '0';
		const [id, type] = record.split('-');
		selectedId = id;
		selectedType = type;
		const result = checklists.find((el) => el.id.toString() == id && el.type == type);
		$activeChecklist = result;
		console.log($activeChecklist);
	}

	async function createDailyChecklist() {
		try {
			loading = true;

			const currentTime = new Date();
			const table = 'daily_checklists';
			const updates = {
				project_id: $activeProject!.id,
				date: currentTime,
				updated_at: new Date()
			};

			let { data, error } = await supabaseClient.from(table).insert(updates).select();
			const { id } = data![0];
			selectedId = id;
			selectedType = 'daily';
			$activeChecklist = data![0];
			if (error) throw error;
		} catch (error: any) {
			alert(error.message);
		} finally {
			$refreshChecklists = true;
			loading = false;
		}
	}

	$: if ($refreshChecklists) {
		$refreshChecklists = false;
		getChecklists(projectId);
	}

	$: console.log(selectedId);
</script>

<div
	in:fade={{ duration: FLY_DURATION, easing: quintIn }}
	class="px-4 sm:px-6 lg:px-8 mt-6 md:mt-8 lg:mt-10"
>
	<div class="sm:flex sm:items-center">
		<div class="sm:flex-auto">
			<h1 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Checklists</h1>
			<p class="mt-2 text-sm text-gray-700 dark:text-gray-300">
				All the checklists for {$activeProject?.name} project.
			</p>
		</div>
		<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
			<button
				on:click|preventDefault={createDailyChecklist}
				type="button"
				class="btn btn-primary {projectId ? '' : 'btn-disabled'}">Add Checklist</button
			>
		</div>
	</div>
	<div
		class="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg"
	>
		<table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
			{#await getChecklists(projectId)}
				<div class="w-full flex items-center">
					<LoadingSpinner size="10" />
				</div>
			{:then}
				{#if loading}
					<div class="w-full flex items-center">
						<LoadingSpinner size="10" />
					</div>
				{:else if checklists}
					<thead class="bg-gray-50 dark:bg-gray-900">
						<tr>
							<th
								scope="col"
								class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 sm:pl-6"
								>Type</th
							>
							<th
								scope="col"
								class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 sm:table-cell"
								>Date</th
							>

							<!-- <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100"> Status</th> -->
							<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
								<span class="sr-only">Edit</span>
							</th>
						</tr>
					</thead>
					<tbody
						class="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-black text-gray-800 dark:text-gray-200"
					>
						{#each checklists as checklist}
							<tr
								id={checklist.id.toString() + '-' + checklist.type}
								on:click={handleClick}
								class="{checklist.id.toString() == selectedId && checklist.type == selectedType
									? 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
									: ''} cursor-pointer"
							>
								<td class="py-4 pl-4 pr-3 text-lg capitalize font-medium">
									{checklist.type}
								</td>
								<td class="py-4 pl-4 pr-3 text-sm font-medium">
									{checklist.date}
								</td>
								<td />
							</tr>
						{/each}
					</tbody>
				{/if}
			{:catch error}
				<!-- getProjects() was rejected -->
				<p class="text-red-500 dark:text-red-700">{error}</p>
			{/await}
		</table>
	</div>
</div>
