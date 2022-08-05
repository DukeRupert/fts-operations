<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient';

	interface ProjectDate {
		id: number;
		date: string;
		start_checklist: number;
		end_checklist: number;
	}

	async function getChecklists(id: number) {
		try {
			let { data, error, status } = await supabaseClient
				.from('project_days')
				.select(`id,date, start_checklist, end_checklist`)
				.order('date', { ascending: false });

			if (error && status !== 406) throw error;

			console.log(data);

			return data as ProjectDate[];
		} catch (error) {
			console.log(error.message);
		}
	}
</script>

<div class="px-4 sm:px-6 lg:px-8">
	<div class="sm:flex sm:items-center">
		<div class="sm:flex-auto">
			<h1 class="text-xl font-semibold text-gray-900">Checklists</h1>
			<p class="mt-2 text-sm text-gray-700">All the checklists for FIXME project.</p>
		</div>
		<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
			<button
				type="button"
				class="inline-flex items-center justify-center rounded-md border border-transparent bg-actionorange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-actionorange-700 focus:outline-none focus:ring-2 focus:ring-actionorange-500 focus:ring-offset-2 sm:w-auto"
				>Add Checklist</button
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
						class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Date</th
					>
					<th
						scope="col"
						class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
						>Start</th
					>
					<th
						scope="col"
						class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
						>End</th
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
				{:then dates}
					{#if dates}
						{#each dates as date}
							<tr>
								<td
									class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6"
								>
									{date.date}
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
									><button class="btn btn-primary btn-outline" id={date.start_checklist.toString()}
										>View</button
									></td
								>
								<td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell"
									><button class="btn btn-primary btn-outline" id={date.end_checklist.toString()}
										>View</button
									></td
								>
								<!-- <td class="px-3 py-4 text-sm text-gray-500">{project.status}</td>
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
