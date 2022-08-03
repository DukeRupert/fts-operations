<script>
	import '../app.css';
	// import { user } from '$lib/stores/sessionStore';
	// import { supabase } from '$lib/supabaseClient';

	import { session } from '$app/stores';
	import { supabaseClient } from '$lib/supabaseClient';
	import { SupaAuthHelper } from '@supabase/auth-helpers-svelte';

	// user.set(supabase.auth.user());

	// supabase.auth.onAuthStateChange((_, session) => {
	// 	user.set(session.user);
	// });
</script>

<SupaAuthHelper {supabaseClient} {session}>
	<slot />
</SupaAuthHelper>
