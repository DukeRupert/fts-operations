<script lang="ts">
	import type { Feature } from '$lib/types';

	export let feature: Feature;
	export let primaryClass;
</script>

<div class="card w-full bg-base-100 shadow-md">
	<div class="card-body">
		<div tabindex="0" class="collapse collapse-arrow bg-base-100 rounded-box">
			<div class="collapse-title text-xl font-medium capitalize">{feature.name}</div>
			<div class="collapse-content">
				<p>{feature.description}</p>
			</div>
		</div>
	</div>
</div>
