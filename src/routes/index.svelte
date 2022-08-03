<script>
	import { user } from '$lib/stores/sessionStore';
	import { supabase } from '$lib/supabaseClient';
	import Auth from '$lib/components/Auth.svelte';
	import Profile from '$lib/components/Profile.svelte';

	user.set(supabase.auth.user());

	supabase.auth.onAuthStateChange((_, session) => {
		user.set(session.user);
	});
</script>

<div style="padding: 50px 0 100px 0;">
	{#if $user}
		<Profile />
	{:else}
		<Auth />
	{/if}
</div>
