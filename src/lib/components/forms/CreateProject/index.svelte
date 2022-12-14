<script lang="ts">
	import { showSlideOver, refreshProjects } from '$lib/stores/app';
	import { supabaseClient } from '$lib/db';
	import type { CustomerRecord } from '$lib/supaTypes';
	import CreateCustomer from '../CreateCustomer.svelte';

	let loading = false;
	let date: string;
	let projectName: string;
	let address: string;
	let city: string;
	let state: string;
	let zip: string;
	let newCustomer = false;
	let customers: CustomerRecord[];
	let selectedCustomerId: number;

	async function getCustomers() {
		try {
			loading = true;

			let { data, error } = await supabaseClient.from('customers').select();
			customers = data as CustomerRecord[];
			return;
		} catch (error) {
			alert(error);
		} finally {
			loading = false;
		}
	}

	function handleActiveCustomer(event: CustomEvent) {
		customers.push(event.detail.customer);
		customers = customers;
		selectedCustomerId = event.detail.customer.id;
		newCustomer = false;
	}

	async function handleSubmit() {
		try {
			loading = true;

			// convert date string into Date
			const newDate = new Date(date);

			const updates = {
				name: projectName,
				address,
				city,
				state,
				zip,
				start_date: newDate,
				customer_id: selectedCustomerId,
				updated_at: new Date()
			};

			console.log(updates);

			let { error } = await supabaseClient.from('projects').insert(updates);

			if (error) throw error;
		} catch (error) {
			alert(error);
		} finally {
			$refreshProjects = true;
			$showSlideOver = false;
			loading = false;
		}
	}
</script>

<form class="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-900 shadow-xl">
	<div class="flex-1">
		<!-- Header -->
		<div class="bg-gray-50 dark:bg-gray-800 px-4 py-6 sm:px-6">
			<div class="flex items-start justify-between space-x-3">
				<div class="space-y-1">
					<h2 class="text-lg font-medium text-gray-900 dark:text-gray-100" id="slide-over-title">
						New project
					</h2>
					<p class="text-sm text-gray-500 dark:text-gray-300">
						Get started by filling in the information below to create your new project.
					</p>
				</div>
				<div class="flex h-7 items-center">
					<button
						on:click|preventDefault={() => ($showSlideOver = false)}
						type="button"
						class="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
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
		<div
			class="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 dark:sm:divide-gray-800 sm:py-0"
		>
			<!-- Project name -->
			<div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
				<div>
					<label
						for="project-name"
						class="block text-sm font-medium text-gray-900 dark:text-gray-100 sm:mt-px sm:pt-2"
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
						class="input-text"
					/>
				</div>
			</div>

			<!-- Location information -->
			<div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
				<label
					for="street-address"
					class="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2"
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
						class="max-w-lg input-text"
					/>
				</div>
			</div>

			<div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
				<label
					for="city"
					class="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2"
				>
					City
				</label>
				<div class="mt-1 sm:mt-0 sm:col-span-2">
					<input
						bind:value={city}
						type="text"
						name="city"
						id="city"
						autocomplete="address-level2"
						class="max-w-lg input-text"
					/>
				</div>
			</div>

			<div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
				<label
					for="region"
					class="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2"
				>
					State
				</label>
				<div class="mt-1 sm:mt-0 sm:col-span-2">
					<input
						bind:value={state}
						type="text"
						name="region"
						id="region"
						autocomplete="address-level1"
						class="max-w-lg input-text"
					/>
				</div>
			</div>

			<div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
				<label
					for="postal-code"
					class="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2"
				>
					ZIP
				</label>
				<div class="mt-1 sm:mt-0 sm:col-span-2">
					<input
						bind:value={zip}
						type="text"
						name="postal-code"
						id="postal-code"
						autocomplete="postal-code"
						class="max-w-lg input-text"
					/>
				</div>
			</div>

			<!-- Start Date -->
			<div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
				<label
					for="start-date"
					class="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2"
				>
					Start Date
				</label>
				<div class="mt-1 sm:mt-0 sm:col-span-2">
					<div
						class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 dark:border-gray-700 rounded-md"
					>
						<input
							bind:value={date}
							type="date"
							name="date"
							id="date"
							class="max-w-lg input-date"
						/>
					</div>
				</div>
			</div>

			<!-- Customer Info -->
			<div class="flex justify-between bg-gray-50 dark:bg-gray-800 px-4 py-6 sm:px-6">
				<div>
					<h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Customer</h3>
					<p class="mt-1 text-sm text-gray-500 dark:text-gray-300">Who is this job for?</p>
				</div>
				<button
					on:click|preventDefault={() => (newCustomer = true)}
					type="button"
					class="btn-primary">New Customer</button
				>
			</div>

			<!-- Cutomer Information -->
			{#if newCustomer}
				<CreateCustomer
					on:cancel={() => (newCustomer = false)}
					on:activeCustomer={handleActiveCustomer}
				/>
			{:else}
				{#await getCustomers()}
					<p>Loading...</p>
				{:then}
					<div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
						<label
							for="customer-select"
							class="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2"
						>
							Customer
						</label>
						<div class="mt-1 sm:mt-0 sm:col-span-2">
							<select bind:value={selectedCustomerId} class="select w-full max-w-xs">
								<option disabled selected>Select an existing customer</option>
								{#each customers as customer}
									<option value={customer.id}
										>{customer.first_name} {customer.last_name}, {customer.business}</option
									>
								{/each}
							</select>
						</div>
					</div>
				{:catch error}
					<p class="text-warning">Error: {error}.</p>
				{/await}
			{/if}

			<!-- Action buttons -->
			<div class="flex-shrink-0 border-t border-gray-200 dark:border-gray-800 px-4 py-5 sm:px-6">
				<div class="flex justify-end space-x-3">
					<button
						on:click|preventDefault={() => ($showSlideOver = false)}
						type="button"
						class="btn-warning">Cancel</button
					>
					<button on:click|preventDefault={handleSubmit} type="submit" class="btn-primary"
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
