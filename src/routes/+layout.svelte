<script>
	import '../app.css';
	import Modal from '$lib/components/SlideOver.svelte';
	import LoadingModal from '$lib/components/LoadingModal.svelte';
	import { supabaseClient } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
	// $user = supabaseClient.auth.user() ?? false;

	// supabaseClient.auth.onAuthStateChange((event, session) => {
	// 	switch (event) {
	// 		case 'SIGNED_IN':
	// 			$user = session?.user;
	// 		case 'SIGNED_OUT':
	// 			$user = false;
	// 		case 'USER_UPDATED':
	// 			$user = session?.user;
	// 		default:
	// 			break;
	// 	}
	// });
</script>

<LoadingModal />
<slot />
<Modal />
