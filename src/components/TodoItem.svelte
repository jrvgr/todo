<script lang="ts">
	import { items, type Item } from "../lib/storage";
	import Icon from "@iconify/svelte";
	import { slide } from "svelte/transition";

	export let item: Item;
	const update = () => {
		items.update(item);
		items.flush();
	};

	const remove = () => {
		items.remove(item);
		items.flush();
	};

	let activeConfirmText = false;

	function activateConfirmText() {
		activeConfirmText = true;
		setTimeout(() => {
			activeConfirmText = false;
		}, 10000);
	}
</script>

<div
	class:done={item.done}
	class:archived={item.archived}
	in:slide={{ duration: 1000 }}
	class="item"
>
	<div class="left">
		<p>{item.title}</p>
		<p>{item.description}</p>
	</div>
	<div class="right">
		<p>
			{new Intl.DateTimeFormat("nl-nl", {
				hour: "2-digit",
				minute: "2-digit",
				month: "2-digit",
				day: "2-digit",
			}).format(new Date(item.date))}
		</p>
	</div>
	<div in:slide class="actions">
		{#if activeConfirmText}
			<p class="confirmText">Sure?</p>
		{/if}
		<button
			class:activeConfirmText
			on:click={() => {
				if (activeConfirmText) remove();
				activateConfirmText();
			}}><Icon width="17.5px" icon="lucide:trash-2" /></button
		>
		{#if item.done}
			<button
				on:click={() => {
					item.archived = !item.archived;
					update();
				}}
				><Icon
					width="17.5px"
					icon={item.archived ? "lucide:archive-restore" : "lucide:archive"}
				/></button
			>
		{/if}
		{#if !item.archived}
			<button 
				on:click={() => {
					item.done = !item.done;
					update();
				}}
				><Icon
					width="17.5px"
					icon={item.done ? "lucide:x" : "lucide:check"}
				/></button
			>
		{/if}
	</div>
</div>

<style lang="scss">
	.item {
		background-color: var(--button-background);
		display: flex;
		margin: 10px;
		border-radius: 8px;
		color: var(--button-foreground);
		transition: background-color 0.2s ease-in-out;
		* {
			padding: 5px;
			color: var(--button-foreground);
		}
		.left {
			flex: 1;
		}
		.right {
			display: flex;
		}
		.actions {
			display: flex;
			justify-content: flex-end;
			transition: all 0.2s ease-in-out;
			gap: 5px;
			width: auto;
			overflow-x: hidden;
			padding: 10px;
			align-items: center;
		}
		.actions * {
			min-width: 40px;
			width: 40px;
			height: 40px;
			background-color: var(--body-background);
			border: none;
			border-radius: 8px;
			cursor: pointer;
			margin: 0;
		}
	}

	.done {
		background-color: var(--accent-green);
	}

	.archived {
		background-color: var(--accent-yellow);
	}

	p {
		margin: 0px;
	}

	.activeConfirmText {
		color: var(--accent-red);
	}
</style>
