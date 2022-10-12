<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient';
	import { activeProject, modalComponent, activeChecklist } from '$lib/stores/app';
	import { showSlideOver, refreshProjects } from '$lib/stores/app';
	import type { ProjectRecord } from '$lib/supaTypes';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	let projects: ProjectRecord[];
	let activeId: number;

	async function getProjects() {
		try {
			let { data, error, status } = await supabaseClient!
				.from('projects')
				.select(
					`id, name, start_date, address, city, zip,state, status, representative-first, representative-last, representative-phone, representative-email, customer:customer_id (id, first_name, last_name, business, phone, email)`
				);

			if (error && status !== 406) throw error;
			projects = data as ProjectRecord[];
			return;
		} catch (error) {
			console.log(error.message);
		}
	}

	$: if ($refreshProjects) {
		$refreshProjects = false;
		getProjects();
	}

	function handleClick(event) {
		const targetId = event.currentTarget?.id ?? 1;
		$activeProject = projects.find((val) => val.id == targetId);
		$activeChecklist = undefined;
		activeId = $activeProject?.id ?? 0;
	}

	function addProject() {
		$modalComponent = 'CreateProject';
		$showSlideOver = true;
	}

	function editProject(event) {
		const id = event.currentTarget?.id ?? activeId;
		$activeProject = projects.find((val) => val.id == id);
		$modalComponent = 'EditProject';
		$showSlideOver = true;
	}
</script>

<div class="px-4 sm:px-6 lg:px-8 mt-6 md:mt-8 lg:mt-10">
	<div class="sm:flex sm:items-center">
		<div class="sm:flex-auto">
			<h1 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Projects</h1>
			<p class="mt-2 text-sm text-gray-700 dark:text-gray-300">A list of all the projects.</p>
		</div>
		<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
			<button on:click|preventDefault={addProject} type="button" class="btn-primary"
				>Add Project</button
			>
		</div>
	</div>
	<div
		class="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg"
	>
		<table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
			{#await getProjects()}
				<!-- getProjects() is pending -->
				<div class="w-full flex items-center">
					<LoadingSpinner size="10" />
				</div>
			{:then}
				{#if projects}
					<thead class="bg-gray-50 dark:bg-gray-900">
						<tr>
							<th
								scope="col"
								class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 sm:pl-6"
								>Name</th
							>
							<th
								scope="col"
								class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 lg:table-cell"
								>Customer</th
							>
							<th
								scope="col"
								class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200 sm:table-cell"
								>Start Date</th
							>
							<th
								scope="col"
								class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200"
								>Status</th
							>
							<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
								<span class="sr-only">Edit</span>
							</th>
						</tr>
					</thead>
					<tbody
						class="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-black text-gray-800 dark:text-gray-200"
					>
						{#each projects as project, i (project.id)}
							<tr
								on:click|preventDefault={handleClick}
								id={project.id.toString()}
								class="{project.id == activeId
									? 'bg-gray-200 dark:bg-gray-800 text-white dark:text-gray-100'
									: ''} group"
							>
								<td
									class="w-full max-w-0 text-black dark:text-gray-50 py-4 pl-4 pr-3 text-lg font-medium sm:w-auto sm:max-w-none sm:pl-6 cursor-pointer"
								>
									{project.name}
									<dl class="font-normal lg:hidden">
										<dt class="sr-only">Customer</dt>
										<dd class="mt-1 truncate text-sm text-gray-700 dark:text-gray-300">
											{project.customer.first_name + ' ' + project.customer.last_name}
										</dd>
										<dt class="sr-only sm:hidden">Start Date</dt>
										<dd class="mt-1 truncate text-sm text-gray-600 dark:text-gray-400 sm:hidden">
											{project.start_date}
										</dd>
									</dl>
								</td>
								<td class="hidden px-3 py-4 text-sm lg:table-cell"
									>{project.customer.first_name + ' ' + project.customer.last_name}</td
								>
								<td class="hidden px-3 py-4 text-sm sm:table-cell">{project.start_date}</td>
								<td class="px-3 py-4 text-sm ">{project.status}</td>
								<td class="py-4 pl-3 pr-4 text-gray-900 dark:text-gray-100 text-right sm:pr-6">
									<button
										id={project.id.toString()}
										type="button"
										on:click|preventDefault={editProject}
										>Edit<span class="sr-only">{project.address}</span></button
									>
								</td>
							</tr>
						{/each}
					</tbody>
				{/if}
			{:catch error}
				<!-- getProjects() was rejected -->
				<p class="text-red-500 dark:text-red-700">Error</p>
			{/await}
		</table>
	</div>
</div>
