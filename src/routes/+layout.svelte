<script>
	import '../app.css';
	import { user } from '$lib/stores/app';
	import { supabaseClient } from '$lib/supabaseClient';

	$user = supabaseClient.auth.user() ?? false;

	supabaseClient.auth.onAuthStateChange((event, session) => {
		console.log(event, session);
		switch (event) {
			case 'SIGNED_IN':
				$user = session?.user;
			case 'SIGNED_OUT':
				$user = false;
			case 'USER_UPDATED':
				$user = session?.user;
			default:
				break;
		}
	});
</script>

<slot />
