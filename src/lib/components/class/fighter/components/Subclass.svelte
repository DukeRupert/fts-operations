<script lang="ts">
	import type { Feature, FightingStyles } from '../Fighter';
	import { FIGHTER } from '../constants';
	import type { SubClasses } from '$lib/types';

	export let feature: Feature;

	const SubClassOptions = Object.keys(FIGHTER.subClass) as SubClasses[];
	let choice: SubClasses = SubClassOptions[0];
	let description = FIGHTER.subClass[choice].description;

	function handleChange() {
		description = FIGHTER.subClass[choice].description;
	}
</script>

<div class="card w-full bg-base-100 shadow-md">
	<div class="card-body">
		<div class="tooltip tooltip-bottom z-30" data-tip={feature.description}>
			<h2 class="card-title capitalize">{feature.name}</h2>
		</div>
		<select
			bind:value={choice}
			on:change={handleChange}
			class="select select-primary w-full max-w-xs capitalize"
		>
			{#each SubClassOptions as item}
				<option class="capitalize">{item}</option>
			{/each}
		</select>
		{#if description}
			<p class="mt-2">{description}</p>
		{/if}
	</div>
</div>
