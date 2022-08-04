<script lang="ts">
	import Avatar from '$lib/components/Avatar.svelte';
	export let username: string;
	export let avatar_url: string;
</script>

<div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
	<button
		type="button"
		class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
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
			<h3>Welcome, {username}</h3>
		</div>
		<div class="ml-4 flex items-center md:ml-6">
			<button
				type="button"
				class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>
				<span class="sr-only">View notifications</span>
				<!-- Heroicon name: outline/bell -->
				<svg
					class="h-6 w-6"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
					/>
				</svg>
			</button>

			<!-- Profile dropdown -->
			<Avatar {avatar_url} />
		</div>
	</div>
</div>
