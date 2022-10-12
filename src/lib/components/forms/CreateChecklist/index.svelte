<script lang="ts">
	import { showSlideOver, refreshChecklists, activeProject } from '$lib/stores/app';
	import { supabaseClient } from '$lib/supabaseClient';

	let loading = false;
	let date: string;

	const values = [
		{ label: 'daily', value: 'daily' },
		{ label: 'start', value: 'start' },
		{ label: 'end', value: 'end' }
	];

	let selected = values[0];

	async function handleSubmit() {
		try {
			loading = true;

			// convert date string into Date
			const newDate = new Date(date);

			// convert selected to table type
			const table = selected + '_checklists';

			const updates = {
				project_id: $activeProject!.id,
				date: newDate,
				updated_at: new Date()
			};

			let { error } = await supabaseClient.from(table).insert(updates);

			if (error) throw error;
		} catch (error) {
			alert(error.message);
		} finally {
			$refreshChecklists = true;
			$showSlideOver = false;
			loading = false;
		}
	}
</script>

<form class="flex h-full flex-col overflow-y-scroll bg-white dark:bg-black shadow-xl">
	<div class="flex-1">
		<!-- Header -->
		<div class="bg-gray-50 px-4 py-6 sm:px-6">
			<div class="flex items-start justify-between space-x-3">
				<div class="space-y-1">
					<h2 class="text-lg font-medium text-gray-900 dark:text-gray-100" id="slide-over-title">
						New checklist
					</h2>
					<p class="text-sm text-gray-500 dark:text-gray-300">
						What kind of checklist do you want to create?
					</p>
				</div>
				<div class="flex h-7 items-center">
					<button
						on:click|preventDefault={() => ($showSlideOver = false)}
						type="button"
						class="text-gray-400 hover:text-gray-500 dark:text-gray-300"
					>
						<span class="sr-only">Close panel</span>
						<!-- Heroicon name: outline/x -->
						<svg
							class="h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			</div>
		</div>

		<!-- Divider container -->
		<div class="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
			<!-- Checklist Type -->
			<div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
				<label class="text-base font-medium text-gray-900 dark:text-gray-100">Type</label>
				<p class="text-sm leading-5 text-gray-500 dark:text-gray-300">
					Which kind of checklist is this?
				</p>
				<fieldset class="mt-4">
					<legend class="sr-only">Checklist type</legend>
					<div class="mt-4 space-y-8">
						{#each values as { label, value }}
							<div class="flex items-center">
								<input
									bind:group={selected}
									id={label}
									name={label}
									{value}
									type="radio"
									checked
									class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
								/>
								<label for={label} class="ml-3 block text-sm font-medium text-gray-700">
									{label}
								</label>
							</div>
						{/each}
					</div>
				</fieldset>
			</div>

			<!-- Start Date -->
			<div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
				<label
					for="date"
					class="block text-sm  capitalize font-medium text-gray-700 sm:mt-px sm:pt-2"
				>
					date
				</label>
				<div class="mt-1 sm:mt-0 sm:col-span-2">
					<div
						class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
					>
						<input
							bind:value={date}
							type="date"
							name="date"
							id="date"
							class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
						/>
					</div>
				</div>
			</div>

			<!-- Action buttons -->
			<div class="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
				<div class="flex justify-end space-x-3">
					<button
						on:click|preventDefault={() => ($showSlideOver = false)}
						type="button"
						class="rounded-md border border-gray-300 bg-white dark:bg-black py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>Cancel</button
					>
					<button
						on:click|preventDefault={handleSubmit}
						type="submit"
						class="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>Create</button
					>
				</div>
			</div>
		</div>
	</div>
</form>
