<script lang="ts">
	import type { FighterClass, FightingStyles } from '../Fighter';
	import type { Feature } from '$lib/types';
	import { FIGHTER } from '../constants';

	export let feature: Feature;
	export let primaryClass: FighterClass;

	const FightingStyles = Object.values(FIGHTER.fightingStyleOptions);
	let choice = FightingStyles[0].name as FightingStyles;

	let description = FIGHTER.fightingStyleOptions[choice].description;

	function handleChange() {
		description = FIGHTER.fightingStyleOptions[choice].description;
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
			{#each FightingStyles as style}
				<option class="capitalize">{style.name}</option>
			{/each}
		</select>
		{#if description}
			<p class="mt-2">{description}</p>
		{/if}
	</div>
</div>
