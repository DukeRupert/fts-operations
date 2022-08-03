<script lang="ts">
	import { isAvatarMenuOpen } from '$lib/stores/app';
</script>

<!-- Profile dropdown -->
<div class="ml-3 relative">
	<div>
		<button
			on:click={() => isAvatarMenuOpen.update((v) => (v = !v))}
			type="button"
			class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			id="user-menu-button"
			aria-expanded="false"
			aria-haspopup="true"
		>
			<span class="sr-only">Open user menu</span>
			<img
				class="h-8 w-8 rounded-full"
				src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
				alt=""
			/>
		</button>
	</div>

	<div
		class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition {$isAvatarMenuOpen
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
			class="block px-4 py-2 text-sm text-gray-700"
			role="menuitem"
			tabindex="-1"
			id="user-menu-item-0">Your Profile</a
		>

		<a
			href="#"
			class="block px-4 py-2 text-sm text-gray-700"
			role="menuitem"
			tabindex="-1"
			id="user-menu-item-1">Settings</a
		>

		<a
			href="#"
			class="block px-4 py-2 text-sm text-gray-700"
			role="menuitem"
			tabindex="-1"
			id="user-menu-item-2">Sign out</a
		>
	</div>
</div>
