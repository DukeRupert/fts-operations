<script>
	import { session } from '$app/stores';
	import Auth from '$lib/components/Auth.svelte';
	import Profile from '$lib/components/Profile.svelte';

	// user.set(supabase.auth.user());

	// supabase.auth.onAuthStateChange((_, session) => {
	// 	user.set(session.user);
	// });
</script>

<div>
	{#if !$session.user}
		<Auth />
	{:else}
		<Profile />
	{/if}
</div>
