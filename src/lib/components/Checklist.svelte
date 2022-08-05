<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient';

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
	<div class="sm:flex sm:items-center">
		<div class="sm:flex-auto">
			<h1 class="text-xl font-semibold text-gray-900">Projects</h1>
			<p class="mt-2 text-sm text-gray-700">A list of all the projects.</p>
		</div>
		<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
			<button
				type="button"
				class="inline-flex items-center justify-center rounded-md border border-transparent bg-actionorange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-actionorange-700 focus:outline-none focus:ring-2 focus:ring-actionorange-500 focus:ring-offset-2 sm:w-auto"
				>Add Project</button
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
						class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
						>Address</th
					>
					<th
						scope="col"
						class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
						>City</th
					>
					<th
						scope="col"
						class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
						>Zip</th
					>
					<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
						>Status</th
					>
					<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
						<span class="sr-only">Edit</span>
					</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200 bg-white">
				{#await getChecklists(1)}
					<!-- getProjects() is pending -->
					<p>Loading ...</p>
				{:then projects}
					{#if projects}
						{#each projects as project}
							<tr>
								<td
									class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6"
								>
									{project.locates}
									<!-- <dl class="font-normal lg:hidden">
										<dt class="sr-only">City</dt>
										<dd class="mt-1 truncate text-gray-700">{project.city}</dd>
										<dt class="sr-only sm:hidden">Zip</dt>
										<dd class="mt-1 truncate text-gray-500 sm:hidden">
											{project.zip}
										</dd>
									</dl> -->
								</td>
								<td class="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"
									>{project.locates}</td
								>
								<!-- <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{project.zip}</td>
								<td class="px-3 py-4 text-sm text-gray-500">{project.status}</td>
								<td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
									<a href="#" class="text-actionorange-600 hover:text-actionorange-900"
										>Edit<span class="sr-only">{project.address}</span></a
									>
								</td> -->
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
