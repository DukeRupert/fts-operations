<script lang="ts">
	//Todo
	import { allocatedPoints, abilityPoints } from '../lib/stores';

	import ClassPicker from '$lib/components/ClassPicker.svelte';
	import SubClassPicker from '$lib/components/SubClassPicker.svelte';
	import RacePicker from '$lib/components/RacePicker.svelte';
	import BackgroundPicker from '$lib/components/BackgroundPicker.svelte';

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
		<div class="flex flex-col w-full border-opacity-50">
			<div class="grid h-20 card card-side bg-base-300 rounded-box place-items-center">
				<div class="flex items-center gap-x-4">
					<div>Strength</div>
					<div>17</div>
					<button id="strength" on:click={handleClick} class="btn btn-circle text-lg"> + </button>
					<button id="strength" class="btn btn-circle btn-outline text-lg"> - </button>
				</div>
			</div>
			<div class="divider">OR</div>
			<div class="grid h-20 card bg-base-300 rounded-box place-items-center">content</div>
		</div>
	</div>
</div>
