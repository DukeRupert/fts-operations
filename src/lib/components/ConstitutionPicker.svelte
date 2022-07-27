<script lang="ts">
	import {
		constitutionPointAllocation,
		constitution,
		maxAbilityPointAllocation,
		allocatedPoints,
		abilityPoints
	} from '$lib/stores/character';
	import { BASE_ABILITY_SCORE } from '$lib/constants';

	// @ts-ignore
	function handleAdd(e) {
		if ($constitution < $maxAbilityPointAllocation && $allocatedPoints < $abilityPoints) {
			constitutionPointAllocation.update((v) => v + 1);
		}
	}

	// @ts-ignore
	function handleSubtract(e) {
		if ($constitution > BASE_ABILITY_SCORE) {
			constitutionPointAllocation.update((v) => v - 1);
		}
	}
</script>

<div class="grid h-20 card card-side bg-base-300 rounded-box place-items-center">
	<div class="flex items-center gap-x-4">
		<h3>Constitution</h3>
		<p>{$constitution}</p>
		<button id="constitution" on:click={handleAdd} class="btn btn-circle text-lg"> + </button>
		<button id="constitution" on:click={handleSubtract} class="btn btn-circle btn-outline text-lg">
			-
		</button>
	</div>
</div>
