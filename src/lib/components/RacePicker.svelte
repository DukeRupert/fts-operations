<script lang="ts">
	import { race, raceAbilityModifier, abilityScores } from '$lib/stores/character';
	import type { Effect, Race } from '$lib/constants';
	import { RaceOptions } from '$lib/constants';

	// @ts-ignore
	function updateRace(e: MouseEvent<HTMLAnchorElement>) {
		const choice: Race = e.target.id;
		race.set(choice);
	}
</script>

<div class="dropdown">
	<label tabindex="0" class="btn m-1">{$race}</label>
	<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
		{#each RaceOptions as race}
			<li><a id={race} on:click={updateRace}>{race}</a></li>
		{/each}
	</ul>
</div>
