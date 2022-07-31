<script lang="ts">
	import Proficiencies from './components/Proficiencies.svelte';
	import FightingStyle from './components/FightingStyle.svelte';
	import Action from './components/Action.svelte';
	import Subclass from './components/Subclass.svelte';

	export let type;
	export let feature;

	const options = [
		{ type: 'proficiencies', component: Proficiencies },
		{ type: 'fightingStyle', component: FightingStyle },
		{ type: 'action', component: Action },
		{ type: 'subclass', component: Subclass }
	];

	let component = options.find((val) => val.type === type)?.component;
</script>

<svelte:component this={component} {feature} />
