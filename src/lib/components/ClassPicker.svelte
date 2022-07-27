<script lang="ts">
	import { primaryClass, subClass } from '$lib/stores';
	import type { PrimaryClasses } from '$lib/constants';
	import { ClassOptions, SubClassOptions } from '$lib/constants';

	// @ts-ignore
	function updateClass(e: MouseEvent<HTMLAnchorElement>) {
		const choice: PrimaryClasses = e.target.id;
		primaryClass.set(choice);
		// default to first subclass listed
		subClass.set(SubClassOptions[choice][0].title);
	}
</script>

<div class="dropdown">
	<label tabindex="0" class="btn m-1">{$primaryClass}</label>
	<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
		{#each ClassOptions as primaryClass}
			<li><a id={primaryClass} on:click={updateClass}>{primaryClass}</a></li>
		{/each}
	</ul>
</div>
