<script lang="ts">
	import {
		strengthPointAllocation,
		strength,
		allocatedPoints,
		abilityPoints,
		maxAbilityPointAllocation
	} from '$lib/stores';
	import { BASE_ABILITY_SCORE } from '$lib/constants';

	// @ts-ignore
	function handleAdd(e) {
		if ($strength < $maxAbilityPointAllocation && $allocatedPoints < $abilityPoints) {
			strengthPointAllocation.update((v) => v + 1);
		}
	}

	// @ts-ignore
	function handleSubtract(e) {
		if ($strength > BASE_ABILITY_SCORE) {
			strengthPointAllocation.update((v) => v - 1);
		}
	}
</script>

<div class="grid h-20 card card-side bg-base-300 rounded-box place-items-center">
	<div class="flex items-center gap-x-4">
		<h3>Strength</h3>
		<p>{$strength}</p>
		<button id="strength" on:click={handleAdd} class="btn btn-circle text-lg"> + </button>
		<button id="strength" on:click={handleSubtract} class="btn btn-circle btn-outline text-lg">
			-
		</button>
	</div>
</div>
