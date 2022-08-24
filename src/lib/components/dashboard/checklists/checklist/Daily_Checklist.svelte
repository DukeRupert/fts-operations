<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient';
	import Toggle from '$lib/components/Toggle.svelte';
	import type { DailyChecklistRecord } from '$lib/supaTypes';
	import { fade } from 'svelte/transition';
	import { quintIn } from 'svelte/easing';
	import { FLY_DURATION } from '$lib/constants';
	import { refreshChecklists, activeChecklist } from '$lib/stores/app';

	export let checklist: DailyChecklistRecord;
	let loading;

	async function updateChecklist() {
		try {
			// Set to trigger action modal
			loading = true;

			// convert date string into Date
			const newDate = new Date(checklist.date);

			// Update the record
			const updates = {
				...checklist,
				date: newDate,
				updated_at: new Date()
			};

			let { error } = await supabaseClient!
				.from('daily_checklists')
				.upsert(updates, {
					returning: 'minimal' // Don't return the value after inserting
				})
				.match({ id: checklist.id });

			if (error) throw error;
			return;
		} catch (error) {
			alert(error.message);
		} finally {
			loading = false;
		}
	}

	async function deleteChecklist() {
		try {
			loading = true;

			let { error } = await supabaseClient
				.from('daily_checklists')
				.delete()
				.match({ id: checklist.id });

			if (error) throw error;
		} catch (error) {
			alert(error.message);
		} finally {
			$refreshChecklists = true;
			$activeChecklist = undefined;
			loading = false;
		}
	}

	function handleSiteSecure() {
		checklist.site_secure = !checklist.site_secure;
	}

	function handleMachinesParked() {
		checklist.machines_parked = !checklist.machines_parked;
	}

	function handleTracksShoveled() {
		checklist.tracks_shoveled = !checklist.tracks_shoveled;
	}

	function handleChangeOrder() {
		checklist.change_order = !checklist.change_order;
	}
	function handleSetUpForTomorrow() {
		checklist.set_up_for_tomorrow = !checklist.set_up_for_tomorrow;
	}

	$: siteSecure = checklist?.site_secure ?? false;
	$: machinesParked = checklist?.machines_parked ?? false;
	$: tracksShoveled = checklist?.tracks_shoveled ?? false;
	$: changeOrder = checklist?.change_order ?? false;
	$: setUpForTomorrow = checklist?.set_up_for_tomorrow ?? false;
</script>

<div
	in:fade={{ duration: FLY_DURATION, easing: quintIn }}
	class="px-4 sm:px-6 lg:px-8 mt-6 md:mt-8 lg:mt-10"
>
	<div class="flex flex-col w-full border-opacity-50">
		{#if checklist}
			<form class="space-y-8 divide-y divide-gray-200">
				<div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
					<div>
						<div>
							<h3 class="text-lg leading-6 font-medium text-gray-900">Daily Checklist</h3>
							<!-- <p class="mt-1 max-w-2xl text-sm text-gray-500">
									{checklist.date}
								</p> -->
						</div>

						<div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
							<!-- Date -->
							<div
								class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
							>
								<label for="date" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
									Date
								</label>
								<div class="mt-1 sm:mt-0 sm:col-span-2">
									<input
										bind:value={checklist.date}
										type="date"
										name="date"
										id="date"
										class="max-w-lg block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
									/>
								</div>
							</div>

							<div
								class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
							>
								<label
									for="site-secure"
									class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
								>
									Site secure?
								</label>
								<Toggle id="site-secure" enabled={siteSecure} on:toggle={handleSiteSecure} />
							</div>
							<div
								class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
							>
								<label
									for="machines-parked"
									class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
								>
									Machines parked?
								</label>
								<Toggle
									id="machines-parked"
									enabled={machinesParked}
									on:toggle={handleMachinesParked}
								/>
							</div>
							<div
								class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
							>
								<label
									for="tracks-shoveled"
									class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
								>
									Tracks shoveled?
								</label>
								<Toggle
									id="trakcs-shoveled"
									enabled={tracksShoveled}
									on:toggle={handleTracksShoveled}
								/>
							</div>
							<div
								class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5"
							>
								<label
									for="customer-satisfaction"
									class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
								>
									Customer satisfaction
								</label>
								<div class="mt-1 sm:mt-0 sm:col-span-2">
									<textarea
										bind:value={checklist.customer_satisfaction}
										id="scope-of-work"
										name="scope-of-work"
										rows="4"
										class="max-w-lg shadow-sm block w-full focus:ring-primary focus:border-primary sm:text-sm border border-gray-300 rounded-md"
									/>
									<!-- <p class="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p> -->
								</div>
							</div>
							<div
								class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5"
							>
								<label
									for="soil-site-conditions"
									class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
								>
									Soil / Site conditions
								</label>
								<div class="mt-1 sm:mt-0 sm:col-span-2">
									<textarea
										bind:value={checklist.soil_site_conditions}
										id="scope-of-work"
										name="scope-of-work"
										rows="4"
										class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
									/>
									<!-- <p class="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p> -->
								</div>
							</div>
							<div
								class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
							>
								<label
									for="change-order"
									class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
								>
									Change order?
								</label>
								<Toggle id="change-order" enabled={changeOrder} on:toggle={handleChangeOrder} />
							</div>
							<div
								class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
							>
								<label
									for="set-up-for-tomorrow"
									class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
								>
									Set up for tomorrow?
								</label>
								<Toggle
									id="set-up-for-tomorrow"
									enabled={setUpForTomorrow}
									on:toggle={handleSetUpForTomorrow}
								/>
							</div>
						</div>
					</div>
				</div>

				<div class="pt-5">
					<div class="flex justify-end">
						<button
							on:click|preventDefault={deleteChecklist}
							type="submit"
							class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md btn-warning hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
							>Delete</button
						>
						<button
							on:click|preventDefault={updateChecklist}
							type="submit"
							class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md btn-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
							>Save</button
						>
					</div>
				</div>
			</form>
		{/if}
	</div>
</div>
