<script lang="ts">
	//Todo
	import { allocatedPoints, abilityPoints } from '../lib/stores';

	import ClassPicker from '$lib/components/ClassPicker.svelte';
	import SubClassPicker from '$lib/components/SubClassPicker.svelte';
	import RacePicker from '$lib/components/RacePicker.svelte';
	import BackgroundPicker from '$lib/components/BackgroundPicker.svelte';
	import StrengthPicker from '$lib/components/StrengthPicker.svelte';
	import DexterityPicker from '$lib/components/DexterityPicker.svelte';
	import ConstitutionPicker from '$lib/components/ConstitutionPicker.svelte';
	import IntelligencePicker from '$lib/components/IntelligencePicker.svelte';
	import WisdomPicker from '$lib/components/WisdomPicker.svelte';
	import CharismaPicker from '$lib/components/CharismaPicker.svelte';

	function handleClick(e: MouseEvent<HTMLButtonElement>) {
		console.log(e.srcElement.id);
	}
</script>

<div class="w-screen h-full">
	<div class="flex flex-col gap-y-4 px-4 py-8">
		<ClassPicker />
		<SubClassPicker />
		<RacePicker />
		<BackgroundPicker />
	</div>
	<div class="flex flex-col gap-y-4 px-4 py-8">
		<h2>Ability Points {$allocatedPoints} / {$abilityPoints}</h2>
		<div class="flex flex-col w-1/2 gap-y-6 border-opacity-50">
			<StrengthPicker />
			<DexterityPicker />
			<ConstitutionPicker />
			<IntelligencePicker />
			<WisdomPicker />
			<CharismaPicker />
		</div>
	</div>
</div>
