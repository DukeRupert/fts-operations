<script lang="ts">
	import { showModal, refreshProjects } from '$lib/stores/app';
	import { supabaseClient } from '$lib/supabaseClient';

	let loading = false;
	let date: string;
	let projectName: string;
	let address: string;
	let city: string;
	let state: string;
	let zip: string;
	let representativeFirst: string;
	let representativeLast: string;
	let representativePhone: string;
	let representativeEmail: string;

	$: console.log(loading);

	async function handleSubmit() {
		try {
			loading = true;
			const user = supabaseClient.auth.user();

			// convert date string into Date
			const newDate = new Date(date);

			const updates = {
				name: projectName,
				address,
				city,
				state,
				zip,
				start_date: newDate,
				'representative-first': representativeFirst,
				'representative-last': representativeLast,
				'representative-phone': representativePhone,
				'representative-email': representativeEmail,
				updated_at: new Date()
			};

			console.log(updates);

			let { error } = await supabaseClient.from('projects').insert(updates);

			if (error) throw error;
		} catch (error) {
			alert(error.message);
		} finally {
			$refreshProjects = true;
			$showModal = false;
			loading = false;
		}
	}
</script>

<form class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
	<div class="flex-1">
		<!-- Header -->
		<div class="bg-gray-50 px-4 py-6 sm:px-6">
			<div class="flex items-start justify-between space-x-3">
				<div class="space-y-1">
					<h2 class="text-lg font-medium text-gray-900" id="slide-over-title">New project</h2>
					<p class="text-sm text-gray-500">
						Get started by filling in the information below to create your new project.
					</p>
				</div>
				<div class="flex h-7 items-center">
					<button
						on:click|preventDefault={() => ($showModal = false)}
						type="button"
						class="text-gray-400 hover:text-gray-500"
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
			<!-- Project name -->
			<div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
				<div>
					<label
						for="project-name"
						class="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
					>
						Project name
					</label>
				</div>
				<div class="sm:col-span-2">
					<input
						bind:value={projectName}
						type="text"
						name="project-name"
						id="project-name"
						class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					/>
				</div>
			</div>

			<!-- Location information -->
			<div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
				<label
					for="street-address"
					class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
				>
					Street address
				</label>
				<div class="mt-1 sm:mt-0 sm:col-span-2">
					<input
						bind:value={address}
						type="text"
						name="street-address"
						id="street-address"
						autocomplete="street-address"
						class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
					/>
				</div>
			</div>

			<div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
				<label for="city" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
					City
				</label>
				<div class="mt-1 sm:mt-0 sm:col-span-2">
					<input
						bind:value={city}
						type="text"
						name="city"
						id="city"
						autocomplete="address-level2"
						class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
					/>
				</div>
			</div>

			<div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
				<label for="region" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
					State
				</label>
				<div class="mt-1 sm:mt-0 sm:col-span-2">
					<input
						bind:value={state}
						type="text"
						name="region"
						id="region"
						autocomplete="address-level1"
						class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
					/>
				</div>
			</div>

			<div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
				<label for="postal-code" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
					ZIP
				</label>
				<div class="mt-1 sm:mt-0 sm:col-span-2">
					<input
						bind:value={zip}
						type="text"
						name="postal-code"
						id="postal-code"
						autocomplete="postal-code"
						class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
					/>
				</div>
			</div>

			<!-- Start Date -->
			<div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
				<label for="start-date" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
					Start Date
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

			<!-- Representative Info -->
			<div class="bg-gray-50 px-4 py-6 sm:px-6">
				<h3 class="text-lg leading-6 font-medium text-gray-900">Representative</h3>
				<p class="mt-1 text-sm text-gray-500">Contact information for customer representative.</p>
			</div>

			<div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
				<label
					for="representative-first"
					class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
				>
					First name
				</label>
				<div class="mt-1 sm:mt-0 sm:col-span-2">
					<input
						bind:value={representativeFirst}
						type="text"
						name="representative-first"
						id="representative-first"
						class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
					/>
				</div>
			</div>

			<div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
				<label
					for="representative-last"
					class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
				>
					Last name
				</label>
				<div class="mt-1 sm:mt-0 sm:col-span-2">
					<input
						bind:value={representativeLast}
						type="text"
						name="representative-last"
						id="representative-last"
						class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
					/>
				</div>
			</div>

			<div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
				<label
					for="represntative-phone"
					class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
				>
					Phone
				</label>
				<div class="mt-1 sm:mt-0 sm:col-span-2">
					<input
						bind:value={representativePhone}
						type="text"
						name="represntative-phone"
						id="represntative-phone"
						class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
					/>
				</div>
			</div>

			<div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
				<label
					for="represntative-email"
					class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
				>
					Email
				</label>
				<div class="mt-1 sm:mt-0 sm:col-span-2">
					<input
						bind:value={representativeEmail}
						type="text"
						name="represntative-email"
						id="represntative-email"
						class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
					/>
				</div>
			</div>

			<!-- Action buttons -->
			<div class="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
				<div class="flex justify-end space-x-3">
					<button
						on:click|preventDefault={() => ($showModal = false)}
						type="button"
						class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>Cancel</button
					>
					<button
						on:click|preventDefault={handleSubmit}
						type="submit"
						class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>Create</button
					>
				</div>
			</div>
		</div>
	</div>
</form>

<style>
	:root {
		--date-input-width: 100%;
	}
</style>
