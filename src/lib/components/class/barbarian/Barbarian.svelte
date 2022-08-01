<script lang="ts">
	import type { Feature } from '$lib/types';
	import { BARBARIAN } from './constants';
	import { level } from '$lib/stores/character';
	import Features from './Features.svelte';

	function updateFeatures(level: number): Feature[] {
		const array = BARBARIAN.features.filter((v) => v.level <= level);

		return array;
	}

	$: features = updateFeatures($level);

	const handleClick = () => {
		$level++;
	};
</script>

<div class="flex flex-col w-full max-w-md p-4 space-y-6">
	<h2 class="text-lg md:text-2xl pl-2">Class Features</h2>

	{#each features as feature}
		<Features type={feature.type} {feature} primaryClass={BARBARIAN} />
	{/each}

	<button on:click={handleClick} class="btn btn-primary">+</button>
</div>
