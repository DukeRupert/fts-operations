<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
	<!-- Sidebar component, swap this element with another sidebar if you like -->
	<div
		class="flex flex-col flex-grow border-r border-gray-200 dark:border-gray-800 pt-5 bg-white dark:bg-black overflow-y-auto"
	>
		<div class="flex items-center flex-shrink-0 px-4">
			<img
				class="h-16 w-auto bg-evergreen-500 dark:bg-evergreen-900"
				src="/icons/FtS_Logo-whiteorange-01-01.svg"
				alt="FtS Logo"
			/>
		</div>
		<div class="mt-5 flex-grow flex flex-col">
			<nav class="flex-1 px-2 pb-4 space-y-1">
				<a
					href="/"
					class="{$page.routeId == ''
						? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
						: 'text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-100'} group flex items-center px-2 py-2 text-sm font-medium rounded-md"
				>
					<!-- Heroicon name: outline/home -->
					<svg
						class="{$page.routeId == ''
							? 'text-gray-500 dark:text-gray-300'
							: 'text-gray-400 group-hover:text-gray-200 dark:text-gray-300'} mr-3 flex-shrink-0 h-6 w-6"
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
						? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
						: 'text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-100'} group flex items-center px-2 py-2 text-sm font-medium rounded-md"
				>
					<!-- Heroicon name: outline/users -->
					<svg
						class="{$page.routeId == 'team'
							? 'text-gray-500 dark:text-gray-300'
							: 'text-gray-400 group-hover:text-gray-200 dark:text-gray-300'} mr-3 flex-shrink-0 h-6 w-6"
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
					class="{$page.routeId == 'projects'
						? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
						: 'text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-100'} group flex items-center px-2 py-2 text-sm font-medium rounded-md"
				>
					<!-- Heroicon name: outline/folder -->
					<svg
						class="{$page.routeId == 'projects'
							? 'text-gray-500 dark:text-gray-300'
							: 'text-gray-400 group-hover:text-gray-200 dark:text-gray-300'} mr-3 flex-shrink-0 h-6 w-6"
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
</div>
