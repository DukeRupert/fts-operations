<script lang="ts">
	import {
		intelligencePointAllocation,
		intelligence,
		allocatedPoints,
		abilityPoints,
		maxAbilityPointAllocation
	} from '$lib/stores/character';
	import { BASE_ABILITY_SCORE } from '$lib/constants';

	// @ts-ignore
	function handleAdd(e) {
		if ($intelligence < $maxAbilityPointAllocation && $allocatedPoints < $abilityPoints) {
			intelligencePointAllocation.update((v) => v + 1);
		}
	}

	// @ts-ignore
	function handleSubtract(e) {
		if ($intelligence > BASE_ABILITY_SCORE) {
			intelligencePointAllocation.update((v) => v - 1);
		}
	}
</script>

<div class="grid h-20 card card-side bg-base-300 rounded-box place-items-center">
	<div class="flex items-center gap-x-4">
		<h3>Intelligence</h3>
		<p>{$intelligence}</p>
		<button id="intelligence" on:click={handleAdd} class="btn btn-circle text-lg"> + </button>
		<button id="intelligence" on:click={handleSubtract} class="btn btn-circle btn-outline text-lg">
			-
		</button>
	</div>
</div>
