<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import SignIn from './SignIn.svelte';
	import SignUp from './SignUp.svelte';

	let loading = false;
	let email: string;
	let signUp = false;
</script>

<div
	class="h-screen w-screen bg-white dark:bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8"
>
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<img
			class="mx-auto h-24 w-auto bg-evergreen-500 rounded-md"
			src="/icons/FtS_Logo-whiteorange-01-01.svg"
			alt="Workflow"
		/>
	</div>

	{#if signUp}
		<SignUp />
	{:else}
		<SignIn on:signup={() => (signUp = true)} />
	{/if}
</div>
