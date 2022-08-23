<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { supabaseClient } from '$lib/supabaseClient';
	import type { CustomerRecord } from '$lib/supaTypes';

	const dispatch = createEventDispatcher();

	let loading = false;
	let first: string;
	let last: string;
	let business: string;
	let phone: string;
	let email: string;

	async function handleSubmit() {
		try {
			loading = true;
			const updates: CustomerRecord = {
				updated_at: new Date(),
				first_name: first,
				last_name: last,
				business,
				phone,
				email
			};

			let { data, error } = await supabaseClient.from('customers').insert(updates);
			if (data) {
				const customer = data[0];
				dispatch('activeCustomer', { customer });
			}
			if (error) throw error;
		} catch (error) {
			alert(error.message);
		} finally {
			loading = false;
		}
	}
</script>

<div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
	<label
		for="representative-first"
		class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
	>
		First name
	</label>
	<div class="mt-1 sm:mt-0 sm:col-span-2">
		<input
			bind:value={first}
			type="text"
			name="representative-first"
			id="representative-first"
			class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
		/>
	</div>
</div>

<div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
	<label for="representative-last" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
		Last name
	</label>
	<div class="mt-1 sm:mt-0 sm:col-span-2">
		<input
			bind:value={last}
			type="text"
			name="representative-last"
			id="representative-last"
			class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
		/>
	</div>
</div>

<div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
	<label
		for="representative-business"
		class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
	>
		Business Name
	</label>
	<div class="mt-1 sm:mt-0 sm:col-span-2">
		<input
			bind:value={business}
			type="text"
			name="representative-business"
			id="representative-business"
			class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
		/>
	</div>
</div>

<div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
	<label for="represntative-phone" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
		Phone
	</label>
	<div class="mt-1 sm:mt-0 sm:col-span-2">
		<input
			bind:value={phone}
			type="text"
			name="represntative-phone"
			id="represntative-phone"
			class="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
		/>
	</div>
</div>

<div class="space-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
	<label for="represntative-email" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
		Email
	</label>
	<div class="mt-1 sm:mt-0 sm:col-span-2">
		<input
			bind:value={email}
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
			on:click|preventDefault={() => dispatch('cancel')}
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
