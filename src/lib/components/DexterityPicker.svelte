<script lang="ts">
	import {
		dexterityPointAllocation,
		dexterity,
		allocatedPoints,
		abilityPoints,
		maxAbilityPointAllocation
	} from '$lib/stores/character';
	import { BASE_ABILITY_SCORE } from '$lib/constants';

	// @ts-ignore
	function handleAdd(e) {
		if ($dexterity < $maxAbilityPointAllocation && $allocatedPoints < $abilityPoints) {
			dexterityPointAllocation.update((v) => v + 1);
		}
	}

	// @ts-ignore
	function handleSubtract(e) {
		if ($dexterity > BASE_ABILITY_SCORE) {
			dexterityPointAllocation.update((v) => v - 1);
		}
	}
</script>

<div class="grid h-20 card card-side bg-base-300 rounded-box place-items-center">
	<div class="flex items-center gap-x-4">
		<h3>Dexterity</h3>
		<p>{$dexterity}</p>
		<button id="dexterity" on:click={handleAdd} class="btn btn-circle text-lg"> + </button>
		<button id="dexterity" on:click={handleSubtract} class="btn btn-circle btn-outline text-lg">
			-
		</button>
	</div>
</div>
