<script lang="ts">
	import { loading } from '$lib/components/loading';
	// import EmojiPicker from 'svelte-emoji-picker';
	import Loading from '$lib/components/Loading.svelte';
	import Modal from '$lib/components/chatbot.svelte';

	let messages: { bot: string; text: string; chat_color: string; message_id: string }[] = $state(
		[]
	);
	let input = $state('');
	let current_topic = '';
	let session_id = '';
	let debugging_log: boolean = false;
	let debug_msg: unknown = $state(null);
	let cite: boolean = $state(false);
	let emoji_text = $state('');
	let message_id = $state('');
	let showModal = $state(false);
	let emoji_button = $state('+');
	let showConversationList = $state(false);
	let conversationList: { id: string; Topic: string; name: string; bot1: string; bot2: string }[] =
		$state([]);

	async function alternateConversationList() {
		showConversationList = !showConversationList;
	}

	async function fetchAllConversations() {
		const options = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		};
		try {
			const res = await fetch('https://j-ai-3jvd.onrender.com/conversations', options);
			const data = await res.json();
			console.log(data.conversations);
			conversationList = data.conversations;
		} catch (error) {
			console.error('Failed to fetch conversations:', error);
		}
	}

	async function LoadConv(conv_id: string) {
		if (!conv_id) return;

		const body = JSON.stringify({ conv_id: conv_id });
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body
		};
		try {
			const res = await fetch('https://j-ai-3jvd.onrender.com/conversation', options);
			const data = await res.json();
			console.log('loaded chat');
			console.log(data['messages']);
			messages = [];
			let chat_color = '#D0F0FD';
			for (const msg of data['messages']) {
				messages = [
					...messages,
					{
						bot: msg.writer,
						text: msg.message,
						chat_color: chat_color,
						message_id: msg.id
					}
				];
				if (chat_color == '#D0F0FD') {
					chat_color = '#C1F0C1';
				} else {
					chat_color = '#D0F0FD';
				}
			}
		} catch (error) {
			console.error('Failed to fetch conversations:', error);
		}
	}

	async function comm(bodyData: {
		topic: string;
		session_id: string | null;
		cite: boolean | false;
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
			session_id = String(data.session_id);

			messages = [
				...messages,
				{
					bot: data.bot_name,
					text: data.response,
					chat_color: data.chat_color,
					message_id: data.response_id
				}
			];
		} catch (error) {
			console.error('Fetch error:', error);
			debug_msg = error;
			// Optionally, add an error message to the display
			messages = [
				...messages,
				{
					bot: 'System',
					text: `Error: ${error instanceof Error ? error.message : String(error)}`,
					chat_color: '#ff0000',
					message_id: 'Error'
				}
			];
		} finally {
			loading.setLoading(false);
			const messageDiv = document.getElementById('main_message_box');
			if (messageDiv) {
				// Use a slight delay to ensure content has rendered before scrolling
				setTimeout(() => {
					// messageDiv.scrollTop = messageDiv.scrollHeight;
					messageDiv.scrollTo(0, -2000);
				}, 100);
			}
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
			cite: cite
		});
		input = '';
	}

	async function continueConversation() {
		if (!session_id) return;

		await comm({
			topic: current_topic,
			session_id,
			cite: cite
		});
	}

	async function reactToEmojiChange(emoji: string, message_id: string) {
		if (!emoji) return;
		const body = JSON.stringify({ message_id: String(message_id), emoji: emoji });
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body
		};
		console.log('Request built and being sent,body:');
		console.log(body);
		try {
			const response = await fetch('https://j-ai-3jvd.onrender.com/react', options);
			const data = await response.json();
			console.log(data.message);
		} catch (error) {
			console.error('Fetch error:', error);
		}
	}

	$effect(() => {
		if (emoji_text) {
			reactToEmojiChange(emoji_text, message_id);
			emoji_text = '';
			message_id = '';
			showModal = false;
			emoji_button = '+';
		}
	});

	function openEmojiPicker(id: string) {
		if (!showModal) {
			message_id = id;
			showModal = true;
			emoji_button = '-';
		} else {
			message_id = '';
			showModal = false;
			emoji_button = '+';
		}
	}
</script>

<div class="chat-container">
	<div class="TopicList">
		<div class="column-combo">
			<div class="column-topic">
				<button
					class="topic-option"
					onclick={() => {
						input = 'The effects of the Internet on journalist jobs';
						startConversation();
					}}>Internet effect on jobs</button
				>
				<button
					class="topic-option"
					onclick={() => {
						input = 'The effects of AI and how it relates to the arrival of the internet';
						startConversation();
					}}>Arrival of AI vs Internet</button
				>
				<button
					class="topic-option"
					onclick={() => {
						input = 'Politics';
						startConversation();
					}}>Politics</button
				>
				<button
					class="topic-option"
					onclick={() => {
						input = 'Socio-Economical trends';
						startConversation();
					}}>Socio-Economical trends</button
				>
			</div>
			<div class="column-topic">
				<button
					class="topic-option"
					onclick={() => {
						input = 'Art';
						startConversation();
					}}>Art</button
				>
				<button
					class="topic-option"
					onclick={() => {
						input = 'jobs';
						startConversation();
					}}>Jobs</button
				>
				<button
					class="topic-option"
					onclick={() => {
						input = 'Education';
						startConversation();
					}}>Education</button
				>
				<button
					class="topic-option"
					onclick={() => {
						input = 'Technology';
						startConversation();
					}}>Technology</button
				>
			</div>
		</div>

		<div class="custom-input-div">
			<input
				class="custom-input-field"
				bind:value={input}
				placeholder="Write your own topic here"
			/>
			<button class="custom-input-button" onclick={startConversation}>→</button>
		</div>
		<label>
			<input
				type="checkbox"
				bind:checked={cite}
				style="width:20px;padding:10px;margin-right:10px"
			/>
			<h style="color:white">Citations</h>
		</label>
	</div>

	<div class="main-box">
		<div class="messages" id="main_message_box">
			<h3 style="color: white;">Messages:</h3>
			<div></div>
			{#each messages as msg}
				<div class="message" style="background-color: {msg.chat_color}">
					<strong>{msg.bot}:</strong>
					{msg.text}

					<button onclick={() => openEmojiPicker(msg.message_id)}> {@html emoji_button} </button>

					<!-- Emoji Picker only shows for the active message -->
					{#if showModal && message_id === msg.message_id}
						<div class="emoji-picker-modal">
							<!-- <EmojiPicker bind:value={emoji_text} /> -->
							<button
								class="emoji_button"
								onclick={() => {
									emoji_text = '😀';
								}}>😀</button
							>
							<button
								class="emoji_button"
								onclick={() => {
									emoji_text = '😂';
								}}>😂</button
							>
							<button
								class="emoji_button"
								onclick={() => {
									emoji_text = '🥰';
								}}>🥰</button
							>
							<button
								class="emoji_button"
								onclick={() => {
									emoji_text = '🤑';
								}}>🤑</button
							>
							<button
								class="emoji_button"
								onclick={() => {
									emoji_text = '😱';
								}}>😱</button
							>
							<button
								class="emoji_button"
								onclick={() => {
									emoji_text = '😭';
								}}>😭</button
							>
							<button
								class="emoji_button"
								onclick={() => {
									emoji_text = '🤖';
								}}>🤖</button
							>
							<button
								class="emoji_button"
								onclick={() => {
									emoji_text = '🤯';
								}}>🤯</button
							>
						</div>
					{/if}
				</div>
			{/each}
			<div class="message" style="background-color: transparent" id="loading_id">
				<Loading />
			</div>
		</div>
		<div class="continue-conv-button">
			<button class="clear-button" onclick={RestartConversation}>🗑️ Clear</button>
			<button onclick={continueConversation}>Continue Talking</button>
		</div>
	</div>

	<div class="conversations-box">
		{#if !showConversationList}
			<button
				class="showConversationButton"
				onclick={() => {
					alternateConversationList();
					fetchAllConversations();
				}}>Show</button
			>
		{:else}
			<button
				class="hideConversationButton"
				onclick={() => {
					alternateConversationList();
				}}>Hide</button
			>
			<div class="conversation-list">
				{#each conversationList as conv}
					<div class="conversation-preview">
						<strong>{conv.id} - {conv.name}</strong>
						<p>{conv.Topic}</p>
						<small>{conv.bot1} & {conv.bot2}</small>
						<button
							class="LoadConvButton"
							onclick={() => {
								LoadConv(String(conv.id));
							}}>Load</button
						>
					</div>
				{/each}
			</div>
		{/if}
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
		@media (max-width: 1000px) {
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
		@media (max-width: 800px) {
			display: flex;
			flex-direction: column;
		}
		max-height: 80%;
		grid:
			'TopicList main-box conversations-box' auto
			/ auto 1fr auto;
		gap: 1rem;
		background: #372f2f;
		border-radius: 1rem;
		padding: 1rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	.emoji-picker-modal {
		/* position: absolute; */
		z-index: 999;
		top: 100%;
		left: 0;
		margin-top: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		background: white;
		border-radius: 8px;
		padding: 8px;
	}

	.emoji_button {
		background-color: none;
	}

	.conversations-box {
		width: auto;
	}

	.conversation-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
		justify-content: space-between;
		background: #4e4848;
		border-radius: 1rem;
		padding: 1rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		@media (max-width: 800px) {
			gap: 8px;
		}
		overflow-y: scroll;
		height: 500px;
		max-height: 100%;
	}

	.conversation-preview {
		background-color: whitesmoke;
		border-radius: 1rem;
		padding: 1rem;
		max-width: 200px;
	}

	.TopicList {
		grid-area: TopicList;
		width: 100%;
		height: fit-content;
		display: flex;
		flex-direction: column;
		gap: 16px;
		justify-content: space-between;
		background: #4e4848;
		border-radius: 1rem;
		padding: 1rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		@media (max-width: 800px) {
			gap: 8px;
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
		@media (max-width: 800px) {
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
		padding-right: 10px;
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
		@media (max-width: 800px) {
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
