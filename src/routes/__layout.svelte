<script>
	import '../app.css';

	import { session } from '$app/stores';
	import { supabaseClient } from '$lib/supabaseClient';
	import { SupaAuthHelper } from '@supabase/auth-helpers-svelte';
</script>

<SupaAuthHelper {supabaseClient} {session}>
	<slot />
</SupaAuthHelper>
