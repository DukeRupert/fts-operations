<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import { createEventDispatcher } from 'svelte';

	let email: string;
	let password: string;

	const dispatch = createEventDispatcher();

	function signUp() {
		dispatch('signup');
	}

	// async function signInWithEmail() {
	// 	try {
	// 		const { user, session, error } = await supabase.auth.signIn({
	// 			email: email,
	// 			password: password
	// 		});
	// 	} catch (error) {
	// 		signInWithGoogle;
	// 	}
	// }

	const magicLink = async () => {
		try {
			const { error } = await supabaseClient.auth.signIn({ email });
			if (error) throw error;
			alert('Check your email for the login link!');
		} catch (error) {
			alert(error.error_description || error.message);
		}
	};

	async function signInWithGoogle() {
		const { data, error } = await supabaseClient.auth.signInWithOAuth({
			provider: 'google'
		});
	}
</script>

<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
	Sign in to your account
</h2>

<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
	<div class="bg-white dark:bg-black py-8 px-4 shadow sm:rounded-lg sm:px-10">
		<form class="space-y-6" action="#" method="POST">
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
					Email address
				</label>
				<div class="mt-1">
					<input
						bind:value={email}
						id="email"
						name="email"
						type="email"
						autocomplete="email"
						required
						class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>
			</div>

			<!-- <div>
				<label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
				<div class="mt-1">
					<input
						bind:value={password}
						id="password"
						name="password"
						type="password"
						autocomplete="current-password"
						required
						class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>
			</div> -->

			<!-- <div class="flex items-center justify-between">
				<div class="flex items-center">
					<input
						id="remember-me"
						name="remember-me"
						type="checkbox"
						class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
					/>
					<label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-gray-100"> Remember me </label>
				</div>

				<div class="text-sm">
					<a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
						Forgot your password?
					</a>
				</div>
			</div> -->

			<div class="flex flex-col gap-y-4">
				<button
					type="submit"
					class="w-full flex btn-primary justify-center"
					on:click|preventDefault={magicLink}>Sign in</button
				>
				<button
					type="submit"
					class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					on:click|preventDefault={signUp}>Create Account</button
				>
			</div>
		</form>

		<div class="mt-6">
			<div class="relative">
				<div class="absolute inset-0 flex items-center">
					<div class="w-full border-t border-gray-300" />
				</div>
				<div class="relative flex justify-center text-sm">
					<span class="px-2 bg-white dark:bg-black text-gray-500 dark:text-gray-300">
						Or continue with
					</span>
				</div>
			</div>

			<div class="mt-6 grid grid-cols-1 gap-3">
				<div class="w-full flex items-center justify-center">
					<button
						class="h-16 w-auto inline-flex justify-center"
						on:click|preventDefault={signInWithGoogle}
					>
						<span class="sr-only">Sign in with Google</span>
						<img
							class="h-full w-auto"
							src="/icons/btn_google_signin_light_normal_web@2x.png"
							alt="Google logo"
						/>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
