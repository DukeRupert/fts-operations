<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient';
	import { activeProject } from '$lib/stores/app';
	import { showModal } from '$lib/stores/app';

	interface Customer {
		first_name: string;
		last_name: string;
		business: string;
		phone: string;
		email: string;
	}

	interface Project {
		id: number;
		name: string;
		start_date: string;
		address: string;
		city: string;
		zip: string;
		customer: Customer;
		status: string;
	}

	async function getProjects() {
		try {
			let { data, error, status } = await supabaseClient!
				.from('projects')
				.select(
					`id, name, start_date, address, city, zip, status, customer:customer_id (first_name, last_name, business, phone, email)`
				);

			if (error && status !== 406) throw error;
			console.log(data);
			return data as Project[];
		} catch (error) {
			console.log(error.message);
		}
	}

	function handleClick(event) {
		$activeProject = event.currentTarget.id;
	}
</script>

<div class="px-4 sm:px-6 lg:px-8 mt-6 md:mt-8 lg:mt-10">
	<div class="sm:flex sm:items-center">
		<div class="sm:flex-auto">
			<h1 class="text-xl font-semibold text-gray-900">Projects</h1>
			<p class="mt-2 text-sm text-gray-700">A list of all the projects.</p>
		</div>
		<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
			<button
				on:click|preventDefault={() => ($showModal = true)}
				type="button"
				class="btn btn-primary">Add Project</button
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
						class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th
					>
					<th
						scope="col"
						class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
						>Customer</th
					>
					<th
						scope="col"
						class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
						>Start Date</th
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
				{#await getProjects()}
					<!-- getProjects() is pending -->
					<p>Loading ...</p>
				{:then projects}
					{#if projects}
						{#each projects as project}
							<tr
								on:click|preventDefault={handleClick}
								id={project.id.toString()}
								class={$activeProject == project.id ? 'text-white bg-primary' : 'text-gray-900'}
							>
								<td
									class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium sm:w-auto sm:max-w-none sm:pl-6 cursor-pointer"
								>
									{project.name}
									<dl class="font-normal lg:hidden">
										<dt class="sr-only">Customer</dt>
										<dd class="mt-1 truncate ">
											{project.customer.first_name + ' ' + project.customer.last_name}
										</dd>
										<dt class="sr-only sm:hidden">Start Date</dt>
										<dd class="mt-1 truncate sm:hidden">
											{project.start_date}
										</dd>
									</dl>
								</td>
								<td class="hidden px-3 py-4 text-sm lg:table-cell"
									>{project.customer.first_name + ' ' + project.customer.last_name}</td
								>
								<td class="hidden px-3 py-4 text-sm  sm:table-cell">{project.start_date}</td>
								<td class="px-3 py-4 text-sm ">{project.status}</td>
								<td class="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
									<a href="#" class="text-primary"
										>Edit<span class="sr-only">{project.address}</span></a
									>
								</td>
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
