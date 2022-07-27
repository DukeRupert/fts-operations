<script lang="ts">
	import { background } from '$lib/stores/character';
	import type { Background } from '$lib/constants';
	import { BackgroundOptions } from '$lib/constants';

	// @ts-ignore
	function updateBackground(e: MouseEvent<HTMLAnchorElement>) {
		const choice: Background = e.target.id;
		background.set(choice);
	}
</script>

<div class="dropdown">
	<label tabindex="0" class="btn m-1">{$background}</label>
	<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
		{#each BackgroundOptions as background}
			<li><a id={background} on:click={updateBackground}>{background}</a></li>
		{/each}
	</ul>
</div>
