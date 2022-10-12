<script lang="ts">
	import { isMobileMenuOpen } from '$lib/stores/app';
	import Avatar from '$lib/components/Avatar.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	export let username: string;
	export let avatar_url: string;
</script>

<div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white dark:bg-black shadow">
	<button
		on:click={() => isMobileMenuOpen.update((v) => (v = !v))}
		type="button"
		class="px-4 border-r border-gray-200 text-gray-500 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
	>
		<span class="sr-only">Open sidebar</span>
		<!-- Heroicon name: outline/menu-alt-2 -->
		<svg
			class="h-6 w-6"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			aria-hidden="true"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
		</svg>
	</button>
	<div class="flex-1 px-4 flex items-center">
		<div class="flex-1 flex">
			<h3 class="text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-100">
				Welcome, {username}
			</h3>
		</div>
		<div class="ml-4 flex items-center md:ml-6">
			<!-- Dark/Light Mode Toggle	 -->
			<ThemeToggle />
			<!-- Profile dropdown -->
			<Avatar {avatar_url} />
		</div>
	</div>
</div>
