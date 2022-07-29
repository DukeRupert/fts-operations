<script lang="ts">
	import FIGHTER from '$lib/data/class/fighter';
	import {
		FightingStyles,
		FightingStyleOptions,
		type FightingStyle
	} from '$lib/data/class/fighter';

	let choice: FightingStyle = 'archery';
	let description: string;

	function handleChange() {
		description = FightingStyles[choice].description;
	}
</script>

<div class="flex flex-col  w-full max-w-sm space-y-6">
	<div class="card w-full bg-base-200 shadow-md">
		<div class="card-body">
			<h2 class="card-title">Proficiencies</h2>
			{#each FIGHTER.weaponProfs as item}
				<p>{item} weapons</p>
			{/each}
			{#each FIGHTER.armorProfs as item}
				<p>{item} armor</p>
			{/each}
		</div>
	</div>

	<div class="card w-full bg-base-200 shadow-md">
		<div class="card-body">
			<h2 class="card-title">Fighting Style</h2>
			<select
				bind:value={choice}
				on:change={handleChange}
				class="select select-primary w-full max-w-xs capitalize"
			>
				{#each FightingStyleOptions as style}
					<option class="capitalize">{style.name}</option>
				{/each}
			</select>
			{#if description}
				<p class="mt-2">{description}</p>
			{/if}
		</div>
	</div>
</div>
