<script lang="ts">
	import { page } from '$app/stores';
	import { isMobileMenuOpen } from '$lib/stores/app';
</script>

<div
	class="relative transition-all ease-in-out duration-300 {$isMobileMenuOpen
		? 'z-40'
		: '-z-10'} md:hidden"
	role="dialog"
	aria-modal="true"
>
	<div
		class="fixed inset-0 bg-gray-600 dark:bg-gray-900 bg-opacity-75 transition-opacity ease-linear duration-300 {$isMobileMenuOpen
			? 'opacity-100'
			: 'opacity-0'}"
	/>

	<div class="fixed inset-0 flex z-40 }">
		<div
			class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white dark:bg-gray-800 transition ease-in-out duration-300 transform {$isMobileMenuOpen
				? 'translate-x-0'
				: '-translate-x-full'}"
		>
			<div
				class="absolute top-0 right-0 -mr-12 pt-2 ease-in-out duration-300 {$isMobileMenuOpen
					? 'opacity-100'
					: 'opacity-0'}"
			>
				<button
					type="button"
					class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					on:click|preventDefault={() => isMobileMenuOpen.update((v) => (v = !v))}
				>
					<span class="sr-only">Close sidebar</span>
					<!-- Heroicon name: outline/x -->
					<svg
						class="h-6 w-6 text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<div class="flex-shrink-0 flex items-center px-4">
				<img
					class="h-16 w-auto bg-evergreen-500 dark:bg-evergreen-900"
					src="/icons/FtS_Logo-whiteorange-01-01.svg"
					alt="FtS Logo"
				/>
			</div>
			<div class="mt-5 flex-1 h-0 overflow-y-auto">
				<nav class="px-2 space-y-1">
					<a
						href="/"
						class="{$page.routeId == ''
							? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
							: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-100'} group flex items-center px-2 py-2 text-base font-medium rounded-md"
					>
						<!--
                Heroicon name: outline/home

                Current: "text-gray-500 dark:text-gray-300", Default: "text-gray-400 group-hover:text-gray-500 dark:text-gray-300"
              -->
						<svg
							class="{$page.routeId == ''
								? 'text-gray-500 dark:text-gray-300'
								: 'text-gray-400 group-hover:text-gray-500 dark:text-gray-300'} mr-4 flex-shrink-0 h-6 w-6"
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
								d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
							/>
						</svg>
						Dashboard
					</a>

					<a
						href="/team"
						class="{$page.routeId == 'team'
							? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
							: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-100'} group flex items-center px-2 py-2 text-base font-medium rounded-md"
					>
						<!-- Heroicon name: outline/users -->
						<svg
							class="{$page.routeId == 'team'
								? 'text-gray-500 dark:text-gray-300'
								: 'text-gray-400 group-hover:text-gray-500 dark:text-gray-300'} mr-4 flex-shrink-0 h-6 w-6"
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
								d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
							/>
						</svg>
						Team
					</a>

					<a
						href="/projects"
						class="{$page.routeId == 'team'
							? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
							: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-100'} group flex items-center px-2 py-2 text-base font-medium rounded-md"
					>
						<!-- Heroicon name: outline/folder -->
						<svg
							class="{$page.routeId == 'team'
								? 'text-gray-500 dark:text-gray-300'
								: 'text-gray-400 group-hover:text-gray-500 dark:text-gray-300'} mr-4 flex-shrink-0 h-6 w-6"
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
								d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
							/>
						</svg>
						Projects
					</a>
				</nav>
			</div>
		</div>

		<div class="flex-shrink-0 w-14" aria-hidden="true">
			<!-- Dummy element to force sidebar to shrink to fit close icon -->
		</div>
	</div>
</div>
