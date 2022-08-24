<script>
	import Auth from '$lib/components/Auth.svelte';
	import Dashboard from '$lib/components/dashboard/index.svelte';
	import { user } from '$lib/stores/app';
</script>

<div>
	{#if $user}
		<Dashboard />
	{:else}
		<Auth />
	{/if}
</div>
