<script lang="ts">
	import {
		wisdomPointAllocation,
		wisdom,
		allocatedPoints,
		abilityPoints,
		maxAbilityPointAllocation
	} from '$lib/stores';
	import { BASE_ABILITY_SCORE } from '$lib/constants';

	// @ts-ignore
	function handleAdd(e) {
		if ($wisdom < $maxAbilityPointAllocation && $allocatedPoints < $abilityPoints) {
			wisdomPointAllocation.update((v) => v + 1);
		}
	}

	// @ts-ignore
	function handleSubtract(e) {
		if ($wisdom > BASE_ABILITY_SCORE) {
			wisdomPointAllocation.update((v) => v - 1);
		}
	}
</script>

<div class="grid h-20 card card-side bg-base-300 rounded-box place-items-center">
	<div class="flex items-center gap-x-4">
		<h3>Wisdom</h3>
		<p>{$wisdom}</p>
		<button id="wisdom" on:click={handleAdd} class="btn btn-circle text-lg"> + </button>
		<button id="wisdom" on:click={handleSubtract} class="btn btn-circle btn-outline text-lg">
			-
		</button>
	</div>
</div>
