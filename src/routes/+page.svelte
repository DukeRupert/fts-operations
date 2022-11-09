<script>
	import Auth from '$lib/components/Auth.svelte';
	import Dashboard from '$lib/components/dashboard/index.svelte';
	import { page } from '$app/stores';
</script>

<!-- <div>
	{#if $user}
		<Dashboard />
	{:else}
		<Auth />
	{/if}
</div> -->

{#if !$page.data.session}
	<Auth />
{:else}
	<Dashboard />
{/if}
