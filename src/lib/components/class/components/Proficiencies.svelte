<script lang="ts">
	import type { Feature, playerClass } from '$lib/types';

	export let feature: Feature;
	export let primaryClass: playerClass;
	const { armorProfs, weaponProfs } = primaryClass;
</script>

<div class="card w-full bg-base-100 shadow-md">
	<div class="card-body">
		<div tabindex="0" class="collapse collapse-arrow bg-base-100 rounded-box">
			<div class="tooltip tooltip-bottom" data-tip={feature.description}>
				<div class="collapse-title text-left text-xl font-medium capitalize">{feature.name}</div>
			</div>
			<div class="collapse-content">
				{#each weaponProfs as item}
					<p>{item} weapons</p>
				{/each}
				{#each armorProfs as item}
					<p>{item} armor</p>
				{/each}
			</div>
		</div>
	</div>
</div>
