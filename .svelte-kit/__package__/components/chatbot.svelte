<script lang="ts">
	import { loading } from './loading';
	import Loading from './Loading.svelte';

	let messages: { bot: string; text: string; chat_color: string }[] = [];
	let input = '';
	let current_topic = '';
	let session_id = '';
	let debugging_log: boolean = false;
	let debug_msg: unknown = null;

	async function comm(bodyData: {
		topic: string;
		session_id: string | null;
		continue_conversation: boolean | false;
	}) {
		input = '';
		loading.setLoading(true, "I'm loading");
		current_topic = bodyData.topic;

		const body = JSON.stringify(bodyData);
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body
		};

		try {
			const response = await fetch('https://j-ai-3jvd.onrender.com/multi-agent-chat', options);
			const data = await response.json();
			session_id = data.session_id;

			messages = [
				...messages,
				{ bot: data.bot_name, text: data.response, chat_color: data.chat_color }
			];
		} catch (error) {
			console.error('Fetch error:', error);
			debug_msg = error;
		} finally {
			loading.setLoading(false);
		}
	}

	async function RestartConversation() {
		session_id = '';
		current_topic = '';

		messages = [];
		input = '';
		return;
	}

	async function startConversation() {
		if (!input.trim()) return;
		current_topic = input;

		await comm({
			topic: current_topic,
			session_id: session_id || null,
			continue_conversation: true
		});
		input = '';
	}

	async function continueConversation() {
		if (!session_id) return;

		await comm({
			topic: current_topic,
			session_id,
			continue_conversation: true
		});
	}
</script>

<div class="chat-container">
	<div class="TopicList">
		<div class="column-combo">
			<div class="column-topic">
				<button
					class="topic-option"
					on:click={() => {
						input = 'The effects of the Internet on journalist jobs';
						startConversation();
					}}>Internet effect on jobs</button
				>
				<button
					class="topic-option"
					on:click={() => {
						input = 'The effects of AI and how it relates to the arrival of the internet';
						startConversation();
					}}>Arrival of AI vs Internet</button
				>
			</div>
			<div class="column-topic">
				<button
					class="topic-option"
					on:click={() => {
						input = 'The possible increase in donuts sales with the arrival of AI';
						startConversation();
					}}>The increase in donuts sales since AI</button
				>
				<button
					class="topic-option"
					on:click={() => {
						input = 'Did people think toasters would rise up with the arrival of the internet? ';
						startConversation();
					}}>Did people think toasters would rise up?</button
				>
			</div>
		</div>

		<div class="custom-input-div">
			<input class="custom-input-field" bind:value={input} placeholder="Custom Topic..." />
			<button class="custom-input-button" on:click={startConversation}>→</button>
		</div>
	</div>

	<div class="main-box">
		<div class="messages">
			<h3 style="color: white;">Messages:</h3>
			<div></div>
			{#each messages as msg}
				<!-- <pre>{JSON.stringify(msg)}</pre> -->
				<div class="message" style="background-color: {msg.chat_color}">
					<strong>{msg.bot}:</strong>
					{msg.text}
				</div>
			{/each}
			<Loading />
		</div>
		<div class="continue-conv-button">
			<button class="clear-button" on:click={RestartConversation}>🗑️ Clear</button>
			<button on:click={continueConversation}>Continue Talking</button>
		</div>
	</div>

	{#if debugging_log}
		<div>
			<p>Error: {debug_msg}</p>
		</div>
	{/if}
</div>

<style>
	input {
		flex: 1;
		max-height: 100px;
		width: calc(79%);
		padding: 0.5rem;
		border-radius: 0.5rem;
		border: 1px solid #ccc;
		@media (max-width: 900px) {
			max-height: 50px;
		}
	}

	button {
		padding: 0.5rem 1rem;
		border: none;
		background-color: #0077cc;
		color: white;
		border-radius: 0.5rem;
		cursor: pointer;
	}

	.chat-container {
		width: 100%;
		min-height: 500px;
		display: grid;
		@media (max-width: 900px) {
			display: flex;
			flex-direction: column;
		}
		grid:
			'TopicList messages' 1fr
			/ 20% auto;
		gap: 1rem;
		background: #372f2f;
		border-radius: 1rem;
		padding: 1rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	.TopicList {
		grid-area: TopicList;
		width: 100%;
		min-height: 400px;
		max-height: 50vh;
		display: flex;
		flex-direction: column;
		gap: 16px;
		justify-content: space-between;
		background: #4e4848;
		border-radius: 1rem;
		padding: 1rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		@media (max-width: 900px) {
			gap: 8px;
			min-height: 200px;
			/* max-height: max-content; */
		}
	}

	.column-combo {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.column-topic {
		display: flex;
		flex-direction: column;
		@media (max-width: 900px) {
			flex-direction: row;
		}
		gap: 10px;
	}

	.main-box {
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		margin-bottom: 1rem;
		gap: 16px;
		width: 100%;
		justify-content: space-between;
	}

	.messages {
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		margin-bottom: 1rem;
		gap: 16px;
		width: 100%;
		justify-content: flex-start;
	}

	.message {
		padding: 0.5rem;
		margin: 0.5rem 0;
		border-radius: 0.5rem;
		background-color: var(--bg, white);
	}

	.topic-option {
		width: 100%;
		@media (max-width: 900px) {
			width: 50%;
		}
	}

	.custom-input-button {
		width: 20%;
		border-top-left-radius: 0rem;
		border-bottom-left-radius: 0rem;
	}

	.custom-input-div {
		display: flex;
		flex-direction: row;
	}

	.custom-input-field {
		border-top-right-radius: 0rem;
		border-bottom-right-radius: 0rem;
	}

	.continue-conv-button {
		display: flex;
		flex-direction: row;
		margin-left: auto;
	}
	.clear-button {
		margin-right: 20px;
	}

	button:hover {
		background-color: #005fa3;
	}
</style>
