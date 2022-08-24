<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import { showModal, modalComponent } from '$lib/stores/app';
	import CreateProject from './forms/CreateProject/index.svelte';
	import EditProject from '$lib/components/forms/EditProject/index.svelte';
	import CreateChecklist from '$lib/components/forms/CreateChecklist/index.svelte';

	const duration = 500;

	const options = [
		{ id: 'CreateProject', component: CreateProject },
		{ id: 'EditProject', component: EditProject },
		{ id: 'CreateChecklist', component: CreateChecklist }
	];

	$: component = options.find((val) => val.id == $modalComponent)?.component;

	function noop() {}
</script>

{#if $showModal}
	<div class="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
		<div transition:fade={{ duration: duration }} class="fixed inset-0 opacity-70 bg-gray-700" />

		<div class="fixed inset-0 overflow-hidden">
			<div class="absolute inset-0 overflow-hidden">
				<div
					on:click={() => ($showModal = false)}
					transition:fly={{
						duration: duration,
						x: 800,
						opacity: 0.5,
						easing: quintInOut
					}}
					class="fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16"
				>
					<div on:click|stopPropagation={noop} class="w-screen max-w-2xl">
						<svelte:component this={component} />
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
