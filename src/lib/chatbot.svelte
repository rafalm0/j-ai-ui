<script lang="ts">
	let messages: { bot: string; text: string; chat_color: string }[] = [];
	let input = '';
	let session_id = '';

	async function startConversation() {
		if (!input.trim()) return;

		messages = [];
		const body = JSON.stringify({
			topic: input,
			session_id: session_id || null,
			continue_conversation: false
		});
		input = '';

		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body
		};

		const response = await fetch('https://j-ai-3jvd.onrender.com/multi-agent-chat', options);
		const data = await response.json();

		session_id = data.session_id;
		messages = [
			...messages,
			{ bot: data.bot_name, text: data.response, chat_color: data.chat_color }
		];
	}

	async function continueConversation() {
		if (!session_id) return;

		const body = JSON.stringify({
			topic: '', // No need to resend topic
			session_id,
			continue_conversation: true
		});

		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body
		};

		const response = await fetch('https://j-ai-3jvd.onrender.com/multi-agent-chat', options);
		const data = await response.json();

		messages = [
			...messages,
			{ bot: data.bot_name, text: data.response, chat_color: data.chat_color }
		];
	}
</script>

<div class="chat-container">
	<div class="TopicList">
		<button
			on:click={() => {
				input = 'The effects of the Internet on journalist jobs';
				startConversation();
			}}>Internet effect on jobs</button
		>
		<button
			on:click={() => {
				input = 'Anything';
				startConversation();
			}}>To do...</button
		>
		<button
			on:click={() => {
				input = 'Anything';
				startConversation();
			}}>To do...</button
		>
		<button
			on:click={() => {
				input = 'Anything';
				startConversation();
			}}>To do...</button
		>
		<input
			bind:value={input}
			on:keydown={(e) => e.key === 'Enter' && startConversation()}
			placeholder="Custom Topic..."
		/>
		<div class="marginLeft"><button on:click={startConversation}>Start New Topic</button></div>
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
		</div>
		<div class="marginLeft"><button on:click={continueConversation}>Continue Talking</button></div>
	</div>
</div>

<style>
	.chat-container {
		width: 100%;
		min-height: 500px;
		display: grid;
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
	}

	.marginLeft {
		margin-left: auto;
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

	input {
		flex: 1;
		max-height: 100px;
		padding: 0.5rem;
		border-radius: 0.5rem;
		border: 1px solid #ccc;
	}

	button {
		padding: 0.5rem 1rem;
		border: none;
		background-color: #0077cc;
		color: white;
		border-radius: 0.5rem;
		cursor: pointer;
	}

	button:hover {
		background-color: #005fa3;
	}
</style>
