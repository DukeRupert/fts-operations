<script lang="ts">
	import Proficiencies from '../components/Proficiencies.svelte';
	import Action from '../components/Action.svelte';
	import Subclass from './components/Subclass.svelte';
	import { BARBARIAN } from './constants';
	import type { Feature } from '$lib/types';
	import type { BarbarianClass } from './Barbarian';

	export let type: string;
	export let feature: Feature;
	export let primaryClass: BarbarianClass;

	const options = [
		{ type: 'proficiencies', component: Proficiencies },
		{ type: 'action', component: Action },
		{ type: 'subclass', component: Subclass }
	];

	let component = options.find((val) => val.type === type)?.component;
</script>

<svelte:component this={component} {feature} primaryClass={BARBARIAN} />
