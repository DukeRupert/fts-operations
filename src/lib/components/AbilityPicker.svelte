<script lang="ts">
	import {
		totalAllocatedPoints,
		abilityPoints,
		abilityScores,
		raceAbilityModifier,
		maxAbilityPointAllocation,
		abilityPointAllocation
	} from '$lib/stores/character';
	import { BASE_ABILITY_SCORE, type Ability } from '$lib/constants';

	export let attribute: Ability = 'strength';

	// @ts-ignore
	function handleAdd() {
		if (
			$abilityPointAllocation[attribute] < $maxAbilityPointAllocation &&
			$totalAllocatedPoints < $abilityPoints
		) {
			$abilityPointAllocation[attribute]++;
		}
	}

	// @ts-ignore
	function handleSubtract() {
		if ($abilityScores[attribute] > BASE_ABILITY_SCORE + $raceAbilityModifier[attribute]) {
			$abilityPointAllocation[attribute]--;
		}
	}
</script>

<div class="grid h-20 card card-side bg-base-300 rounded-box place-items-center">
	<div class="flex items-center gap-x-4">
		<h3>{attribute}</h3>
		<p>{$abilityScores[attribute]}</p>
		<button id={attribute} on:click={handleAdd} class="btn btn-circle text-lg"> + </button>
		<button id={attribute} on:click={handleSubtract} class="btn btn-circle btn-outline text-lg">
			-
		</button>
	</div>
</div>
