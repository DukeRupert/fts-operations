<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import { isAvatarMenuOpen } from '$lib/stores/app';

	export let avatar_url: string;
	let src: string;

	async function downloadImage() {
		try {
			const { data, error } = await supabaseClient.storage.from('avatars').download(avatar_url);
			if (error) throw error;

			src = URL.createObjectURL(data);
		} catch (error) {
			console.error('Error downloading image: ', error);
		}
	}

	async function handleSignOut() {
		const { error } = await supabaseClient.auth.signOut();
	}
</script>

<!-- Profile dropdown -->
<div class="ml-3 relative">
	<div>
		<button
			on:click={() => isAvatarMenuOpen.update((v) => (v = !v))}
			type="button"
			class="max-w-xs bg-white dark:bg-black flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			id="user-menu-button"
			aria-expanded="false"
			aria-haspopup="true"
		>
			<span class="sr-only">Open user menu</span>
			{#if avatar_url}
				<img class="h-8 w-8 rounded-full" use:downloadImage {src} alt="Avatar" />
			{:else}
				<svg
					class="h-8 w-8 text-gray-500 dark:text-gray-300"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					stroke-width="1"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" /> <circle cx="12" cy="7" r="4" />
					<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg
				>
			{/if}
		</button>
	</div>

	<div
		class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-900 ring-1 ring-black dark:ring-gray-600 ring-opacity-5 focus:outline-none transition {$isAvatarMenuOpen
			? 'opacity-100 scale-100 ease-out duration-100'
			: 'opacity-0 scale-95 duration-75 ease-in'}"
		role="menu"
		aria-orientation="vertical"
		aria-labelledby="user-menu-button"
		tabindex="-1"
	>
		<!-- Active: "bg-gray-100", Not Active: "" -->
		<a
			href="#"
			class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
			role="menuitem"
			tabindex="-1"
			id="user-menu-item-0">Your Profile</a
		>

		<a
			href="#"
			class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
			role="menuitem"
			tabindex="-1"
			id="user-menu-item-1">Settings</a
		>

		<a
			on:click={handleSignOut}
			on:keypress={handleSignOut}
			class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
			role="menuitem"
			tabindex="-1"
			id="user-menu-item-2">Sign out</a
		>
	</div>
</div>
