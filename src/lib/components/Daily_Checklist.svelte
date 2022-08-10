<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient';
	import Toggle from '$lib/components/Toggle.svelte';

	export let id: number;
	let loading;
	let href: string;

	interface DailyChecklist {
		id: number;
		site_secure: boolean;
		machines_parked: boolean;
		tracks_shoveled: boolean;
		customer_satisfaction: string;
		soil_site_conditions: string;
		change_order: boolean;
		set_up_for_tomorrow: boolean;
	}

	let checklistData: DailyChecklist;

	async function getChecklist(id: number) {
		try {
			let { data, error, status } = await supabaseClient!
				.from('daily_checklists')
				.select(
					`id, site_secure, machines_parked, tracks_shoveled, customer_satisfaction, soil_site_conditions, change_order, set_up_for_tomorrow`
				)
				.eq('id', id);

			if (error && status !== 406) throw error;

			const checklist = data![0];
			checklistData = { ...checklist };
			return checklist as DailyChecklist;
		} catch (error) {
			console.log(error.message);
		}
	}

	async function updateChecklist() {
		try {
			// Set to trigger action modal
			loading = true;

			// Update the record
			const updates = {
				...checklistData,
				updated_at: new Date()
			};

			let { error } = await supabaseClient!.from('daily_checklists').upsert(updates, {
				returning: 'minimal' // Don't return the value after inserting
			});

			if (error) throw error;
		} catch (error) {
			alert(error.message);
		} finally {
			loading = false;
		}
	}

	function handleSiteSecure() {
		checklistData.site_secure = !checklistData.site_secure;
	}

	function handleMachinesParked() {
		checklistData.machines_parked = !checklistData.machines_parked;
	}

	function handleTracksShoveled() {
		checklistData.tracks_shoveled = !checklistData.tracks_shoveled;
	}

	function handleChangeOrder() {
		checklistData.change_order = !checklistData.change_order;
	}
	function handleSetUpForTomorrow() {
		checklistData.set_up_for_tomorrow = !checklistData.set_up_for_tomorrow;
	}

	$: console.log(checklistData);
	$: siteSecure = checklistData?.site_secure ?? false;
	$: machinesParked = checklistData?.machines_parked ?? false;
	$: tracksShoveled = checklistData?.tracks_shoveled ?? false;
	$: changeOrder = checklistData?.change_order ?? false;
	$: setUpForTomorrow = checklistData?.set_up_for_tomorrow ?? false;
</script>

<div class="px-4 sm:px-6 lg:px-8">
	<div class="flex flex-col w-full border-opacity-50">
		{#await getChecklist(id)}
			<!-- getProjects() is pending -->
			<p>Loading ...</p>
		{:then checklist}
			{#if checklist}
				<form class="space-y-8 divide-y divide-gray-200">
					<div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
						<div>
							<div>
								<h3 class="text-lg leading-6 font-medium text-gray-900">End of Day Checklist</h3>
								<!-- <p class="mt-1 max-w-2xl text-sm text-gray-500">
									{checklist.date}
								</p> -->
							</div>

							<div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
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
											bind:value={checklistData.customer_satisfaction}
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
											bind:value={checklistData.soil_site_conditions}
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
								on:click|preventDefault={updateChecklist}
								type="submit"
								class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md btn-secondary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
								>Save</button
							>
						</div>
					</div>
				</form>
			{/if}
		{:catch error}
			<!-- getProjects() was rejected -->
			<p class="text-red-500">Error</p>
		{/await}
	</div>
</div>
