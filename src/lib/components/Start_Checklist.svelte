<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient';
	import Toggle from './Toggle.svelte';

	export let id: number;
	let loading;
	let href: string;

	interface StartChecklist {
		id: number;
		locates_items: string[];
		customer_contact: string;
		approved_plans: boolean;
		signed_contract_url: string;
		scope_of_work: string;
		date: string;
		status: boolean;
	}

	let checklistData: StartChecklist;

	async function getChecklists(id: number) {
		try {
			let { data, error, status } = await supabaseClient!
				.from('start_checklists')
				.select(
					`id, locates_items, customer_contact, approved_plans, signed_contract_url, scope_of_work, status`
				)
				.eq('id', id);

			if (error && status !== 406) throw error;

			console.log(data);

			const checklist = data![0];
			checklistData = { ...checklist };
			return checklist as StartChecklist;
		} catch (error) {
			console.log(error.message);
		}
	}

	function addLocate() {
		checklistData.locates_items.push('');
		checklistData.locates_items = checklistData.locates_items;
	}

	function removeLocate() {
		checklistData.locates_items.pop();
		checklistData.locates_items = checklistData.locates_items;
	}

	let files: FileList | undefined;

	async function uploadSignedContract() {
		const contractFile = files![0];

		let uploadPath = `public/${checklistData.date}/${checklistData.id}/${contractFile.name}`;
		const { data, error } = await supabaseClient!.storage
			.from('signed-contracts')
			.upload(uploadPath, contractFile, {
				cacheControl: '3600',
				upsert: true
			});
		if (data) {
			console.log(data);
			const { Key } = data;
			checklistData.signed_contract_url = Key;
		}
		if (error) {
			console.log(error.message);
		}
	}

	async function getSignedContractUrl() {
		const { data, error } = await supabaseClient!.storage
			.from('')
			.download(checklistData.signed_contract_url);
		console.log(data);
		if (error) throw error;

		href = URL.createObjectURL(data);
	}

	async function updateChecklist() {
		try {
			// Set to trigger action modal
			loading = true;

			// Must upload new file to get url prior to record update
			if (files && files[0]) {
				await uploadSignedContract();
			}

			// Update the record
			const updates = {
				...checklistData,
				updated_at: new Date()
			};

			console.log(updates);

			let { error } = await supabaseClient!.from('start_checklists').upsert(updates, {
				returning: 'minimal' // Don't return the value after inserting
			});

			if (error) throw error;
		} catch (error) {
			alert(error.message);
		} finally {
			loading = false;
		}
	}

	$: console.log(checklistData);
</script>

<div class="px-4 sm:px-6 lg:px-8 mt-6 md:mt-8 lg:mt-10">
	<div class="flex flex-col w-full border-opacity-50">
		{#await getChecklists(id)}
			<!-- getProjects() is pending -->
			<p>Loading ...</p>
		{:then checklist}
			{#if checklist}
				<form class="space-y-8 divide-y divide-gray-200">
					<div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
						<div>
							<div>
								<h3 class="text-lg leading-6 font-medium text-gray-900">Start Checklist</h3>
								<p class="mt-1 max-w-2xl text-sm text-gray-500">
									{checklist.date}
								</p>
							</div>

							<div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
								<!-- Locates -->
								<div
									class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
								>
									<label
										for="locates"
										class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
									>
										Locates
									</label>
									<div class="mt-1 sm:mt-0 sm:col-span-2">
										{#each checklistData.locates_items as locate, i}
											<div class="mt-1 sm:mt-2 sm:col-span-2">
												<input
													bind:value={checklistData.locates_items[i]}
													placeholder={locate}
													type="text"
													name="locates"
													id="locates-{i}"
													class="max-w-lg block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
												/>
											</div>
											{#if checklistData.locates_items[i] === ''}
												<div class="mt-1 sm:mt-2 sm:col-span-2">
													<button
														on:click|preventDefault={removeLocate}
														class="max-w-lg block w-full py-2 px-3 text-white bg-secondary shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
														>Remove locate</button
													>
												</div>
											{/if}
										{/each}

										<div class="mt-1 sm:mt-2 sm:col-span-2">
											<button
												on:click|preventDefault={addLocate}
												class="max-w-lg block w-full py-2 px-3 text-white btn-primary shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
												>Add locate</button
											>
										</div>
									</div>
								</div>
								<!-- Customer Contact -->
								<div
									class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
								>
									<label
										for="customer-name"
										class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
									>
										Customer contact
									</label>
									<div class="mt-1 sm:mt-0 sm:col-span-2">
										<input
											bind:value={checklistData.customer_contact}
											type="text"
											name="customer-name"
											id="customer-name"
											class="max-w-lg block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
										/>
									</div>
								</div>
								<!-- Signed Contract -->
								<div
									class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5"
								>
									<label for="photo" class="block text-sm font-medium text-gray-700">
										Signed contract
									</label>
									{#if checklistData.signed_contract_url}
										<a use:getSignedContractUrl {href} class="flex btn btn-link max-w-lg py-2 px-3"
											><svg
												class="h-5 w-5 mr-2"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												stroke-width="2"
												stroke="currentColor"
												fill="none"
												stroke-linecap="round"
												stroke-linejoin="round"
											>
												<path stroke="none" d="M0 0h24v24H0z" />
												<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
												<polyline points="7 11 12 16 17 11" />
												<line x1="12" y1="4" x2="12" y2="16" /></svg
											>Download</a
										>
									{:else}
										<div class="mt-1 sm:mt-0 sm:col-span-2">
											<div
												class="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
											>
												<!-- Upload Prompt -->
												<div class="space-y-1 text-center">
													<svg
														class="mx-auto h-12 w-12 text-gray-400"
														stroke="currentColor"
														fill="none"
														viewBox="0 0 48 48"
														aria-hidden="true"
													>
														<path
															d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
															stroke-width="2"
															stroke-linecap="round"
															stroke-linejoin="round"
														/>
													</svg>
													<div class="flex text-sm text-gray-600">
														<label
															for="file-upload"
															class="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
														>
															{#if files && files[0]}
																<span>{files[0].name}</span>
																<input
																	bind:files
																	id="file-upload"
																	name="file-upload"
																	type="file"
																	class="sr-only"
																	accept="application/pdf,.pdf,.doc,.docx,image/*"
																/>
															{:else}
																<span>Upload a file</span>
																<input
																	bind:files
																	id="file-upload"
																	name="file-upload"
																	type="file"
																	class="sr-only"
																	accept="application/pdf,.pdf,.doc,.docx,image/*"
																/>
																<p class="pl-1">or drag and drop</p>

																<p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
															{/if}
														</label>
													</div>
												</div>
											</div>
										</div>
									{/if}
								</div>
								<!-- Scope of Work -->
								<div
									class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5"
								>
									<label
										for="about"
										class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
									>
										Scope of Work
									</label>
									<div class="mt-1 sm:mt-0 sm:col-span-2">
										<textarea
											bind:value={checklistData.scope_of_work}
											id="scope-of-work"
											name="scope-of-work"
											rows="4"
											class="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
										/>
										<!-- <p class="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p> -->
									</div>
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
