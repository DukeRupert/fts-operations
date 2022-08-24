<script lang="ts">
	import { activeChecklist } from '$lib/stores/app';
	import DailyChecklist from './Daily_Checklist.svelte';
	import StartChecklist from './Start_Checklist.svelte';
	import EndChecklist from './End_Checklist.svelte';

	const options = [
		{ type: 'daily', component: DailyChecklist },
		{ type: 'start', component: StartChecklist },
		{ type: 'end', component: EndChecklist }
	];

	$: component = options.find((val) => val.type == $activeChecklist.type)?.component;
</script>

<svelte:component this={component} checklist={$activeChecklist} />
