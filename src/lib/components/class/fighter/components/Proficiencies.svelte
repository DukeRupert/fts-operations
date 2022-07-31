<script lang="ts">
	import type { Feature } from '../Fighter';
	import { FIGHTER } from '../constants';

	export let feature: Feature;
</script>

<div class="card w-full bg-base-100 shadow-md">
	<div class="card-body">
		<div tabindex="0" class="collapse collapse-arrow bg-base-100 rounded-box">
			<div class="tooltip tooltip-bottom" data-tip={feature.description}>
				<div class="collapse-title text-left text-xl font-medium capitalize">{feature.name}</div>
			</div>
			<div class="collapse-content">
				{#each FIGHTER.weaponProfs as item}
					<p>{item} weapons</p>
				{/each}
				{#each FIGHTER.armorProfs as item}
					<p>{item} armor</p>
				{/each}
			</div>
		</div>
	</div>
</div>
