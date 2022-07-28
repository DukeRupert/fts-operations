<script lang="ts">
	//Todo
	import { totalAllocatedPoints, abilityPoints, raceAbilityModifier } from '$lib/stores/character';
	import { AbilityOptions } from '$lib/constants';

	import ClassPicker from '$lib/components/ClassPicker.svelte';
	import SubClassPicker from '$lib/components/SubClassPicker.svelte';
	import RacePicker from '$lib/components/RacePicker.svelte';
	import BackgroundPicker from '$lib/components/BackgroundPicker.svelte';
	import AbilityPicker from '$lib/components/AbilityPicker.svelte';
</script>

<div class="w-screen h-full">
	<div class="flex flex-col gap-y-4 px-4 py-8">
		<ClassPicker />
		<SubClassPicker />
		<RacePicker />
		<BackgroundPicker />
	</div>
	<div class="flex flex-col gap-y-4 px-4 py-8">
		<h2>Ability Points {$totalAllocatedPoints} / {$abilityPoints}</h2>
		<div class="flex flex-col w-1/2 gap-y-6 border-opacity-50">
			{#each Object.values(AbilityOptions) as attribute}
				<AbilityPicker {attribute} />
			{/each}
		</div>
	</div>
</div>
