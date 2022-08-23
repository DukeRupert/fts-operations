<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import { showModal } from '$lib/stores/app';
	import CreateProject from './forms/CreateProject/index.svelte';

	const duration = 500;
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
					<div on:click|stopPropagation={() => console.log('clicked')} class="w-screen max-w-2xl">
						<CreateProject />
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
