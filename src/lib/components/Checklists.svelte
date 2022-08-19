<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient';
	import { activeChecklist } from '$lib/stores/app';

	export let activeProject: number;
	let checklistCopy: Checklist[];
	let active: number;

	interface Checklist {
		id: number;
		date: string;
		type: 'start' | 'daily' | 'end';
		start_checklist_id?: number;
		end_checklist_id?: number;
		daily_checklist_id?: number;
	}

	async function getChecklists(id: number) {
		try {
			let { data, error, status } = await supabaseClient!
				.from('checklists')
				.select(`id, type, date, start_checklist_id, end_checklist_id, daily_checklist_id`)
				.eq('project_id', id)
				.order('date', { ascending: true });

			if (error && status !== 406) throw error;
			checklistCopy = data ?? [];
			return data as Checklist[];
		} catch (error) {
			console.log(error.message);
		}
	}

	function handleClick(e: MouseEvent) {
		active = e?.currentTarget.id;
		let checklist = checklistCopy.find((el) => el.id == active);
		let type = checklist?.type ?? 'start';
		let id;
		switch (type) {
			case 'start':
				id = checklist?.start_checklist_id;
				break;
			case 'end':
				id = checklist?.end_checklist_id;
				break;
			case 'daily':
				id = checklist?.daily_checklist_id;
				break;
			default:
				id = checklist?.start_checklist_id;
				break;
		}

		$activeChecklist = { type, id };
	}
</script>

<div class="px-4 sm:px-6 lg:px-8 mt-6 md:mt-8 lg:mt-10">
	<div class="sm:flex sm:items-center">
		<div class="sm:flex-auto">
			<h1 class="text-xl font-semibold text-gray-900">Checklists</h1>
			<p class="mt-2 text-sm text-gray-700">All the checklists for FIXME project.</p>
		</div>
		<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
			<button type="button" class="btn btn-primary">Add Checklist</button>
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
				{#await getChecklists(activeProject)}
					<!-- getProjects() is pending -->
					<p>Loading ...</p>
				{:then checklists}
					{#if checklists}
						{#each checklists as checklist}
							<tr
								id={checklist.id.toString()}
								on:click={handleClick}
								class="{checklist.id == active
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
					<p class="text-red-500">Error</p>
				{/await}
			</tbody>
		</table>
	</div>
</div>
