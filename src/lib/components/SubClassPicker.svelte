<script lang="ts">
	import { primaryClass, subClass } from '$lib/stores/character';
	import { SubClassOptions } from '$lib/constants';

	// @ts-ignore
	function updateSubClass(e: MouseEvent<HTMLAnchorElement>) {
		const choice = e.target.id;
		subClass.set(choice);
	}
</script>

<div class="dropdown">
	<label tabindex="0" class="btn m-1">{$subClass}</label>
	<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
		{#each SubClassOptions[$primaryClass] as subClass, i}
			<li><a id={subClass.title} on:click={updateSubClass}>{subClass.title}</a></li>
		{/each}
	</ul>
</div>
