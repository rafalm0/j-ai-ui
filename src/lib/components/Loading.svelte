<script lang="ts">
	import { loading } from '$lib/components/loading';

	$: if ($loading.status === 'NAVIGATING') {
		setTimeout(() => {
			if ($loading.status === 'NAVIGATING') {
				$loading.status = 'LOADING';
			}
		}, 400);
	}
</script>

<!-- {$loading.status} -->

{#if $loading.status === 'LOADING'}
	<div />
{/if}

<style>
	div {
		--size: 25px;
		/* position: fixed; */
		/* top: 0;
		left: 0; */
		margin-left: calc(50%);
		padding-left: calc(10%);
		inset: calc(75% - calc(var(--size) / 2));
		background: purple;
		border-radius: var(--size);
		height: var(--size);
		width: var(--size);
		animation: moveLoader 1s infinite alternate;
	}

	@keyframes moveLoader {
		from {
			transform: translate3d(100px, 0, 0);
		}
		to {
			transform: translate3d(-100px, 0, 0);
		}
	}
</style>
