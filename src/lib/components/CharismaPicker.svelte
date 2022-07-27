<script lang="ts">
	import {
		charismaPointAllocation,
		charisma,
		allocatedPoints,
		abilityPoints,
		maxAbilityPointAllocation
	} from '$lib/stores/character';
	import { BASE_ABILITY_SCORE } from '$lib/constants';

	// @ts-ignore
	function handleAdd(e) {
		if ($charisma < $maxAbilityPointAllocation && $allocatedPoints < $abilityPoints) {
			charismaPointAllocation.update((v) => v + 1);
		}
	}

	// @ts-ignore
	function handleSubtract(e) {
		if ($charisma > BASE_ABILITY_SCORE) {
			charismaPointAllocation.update((v) => v - 1);
		}
	}
</script>

<div class="grid h-20 card card-side bg-base-300 rounded-box place-items-center">
	<div class="flex items-center gap-x-4">
		<h3>Charisma</h3>
		<p>{$charisma}</p>
		<button id="charisma" on:click={handleAdd} class="btn btn-circle text-lg"> + </button>
		<button id="charisma" on:click={handleSubtract} class="btn btn-circle btn-outline text-lg">
			-
		</button>
	</div>
</div>
