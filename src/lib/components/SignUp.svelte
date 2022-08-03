<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient';

	let email: string;
	let password: string;

	const handleSignUp = async () => {
		try {
			const { user, session, error } = await supabaseClient.auth.signUp({
				email: email,
				password: password
			});
			if (error) throw error;
			alert('Check your email for the login link!');
		} catch (error) {
			alert(error.error_description || error.message);
		}
	};
</script>

<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
	<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
		<form class="space-y-6" action="#" method="POST">
			<div>
				<label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
				<div class="mt-1">
					<input
						type="text"
						name="first-name"
						id="first-name"
						autocomplete="given-name"
						class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>
			</div>
			<div>
				<label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
				<div class="mt-1">
					<input
						type="text"
						name="last-name"
						id="last-name"
						autocomplete="family-name"
						class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>
			</div>
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
				<div class="mt-1">
					<input
						bind:value={email}
						id="email"
						name="email"
						type="email"
						autocomplete="email"
						required
						class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>
			</div>

			<div>
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
			</div>

			<div>
				<button
					type="submit"
					class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>Create Account</button
				>
			</div>
		</form>
	</div>
</div>
