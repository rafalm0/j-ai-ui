<script lang="ts">
	import Chatbot from '$lib/components/chatbot.svelte';
	import Header from '$lib/components/header.svelte';
</script>

<div class="Page">
	<Header />
	<Chatbot />
</div>

<style>
	.Page {
		position: absolute;
		display: flex;
		height: calc(100%);
		width: calc(100%);
		min-height: 100vh;
		flex-direction: column;
		overflow: auto;
		border: 5px solid #340a5e;
		border-radius: 2px;
		z-index: 99999;
		background: radial-gradient(#2d0042 0%, #040024 100%);
	}
</style>
