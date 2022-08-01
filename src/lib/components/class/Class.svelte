<script lang="ts">
	import Fighter from './fighter/Fighter.svelte';
	import Barbarian from './barbarian/Barbarian.svelte';

	import { primaryClass } from '$lib/stores/character';
	const options = [
		{ class: 'fighter', component: Fighter },
		{ class: 'barbarian', component: Barbarian }
	];

	$: component = options.find((val) => val.class === $primaryClass)?.component;
</script>

<svelte:component this={component} />
