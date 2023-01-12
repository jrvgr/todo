<script lang="ts">
	import Icon from "@iconify/svelte";
	import { items } from "../lib/storage";
	import { done, archived, reverse, sortedItems } from "./writeables";

	$: done.set(selected);
	let selected: "done" | "not done" | "all" = "all";
	let oldSelected: "done" | "not done" | "all" = "all";

	let title: string;
	let description: string;

	function add(title: string, description: string) {
		if (!title.trim()) return;
		items.update(items.generateItem(title, description));
		items.flush();
		console.log($sortedItems);
	}
</script>

<nav>
	<button
		class:active={!$archived}
		on:click={() => {
			archived.set(false);
			selected = oldSelected;
		}}
		class="home"><Icon width="17.5px" icon="lucide:home" /></button
	>
	<button
		class:active={$archived}
		on:click={() => {
			oldSelected = selected;
			archived.set(true);
			selected = "all";
		}}
		class="home"><Icon width="17.5px" icon="lucide:archive" /></button
	>
	<button on:click={() => reverse.set(!$reverse)}>
		<Icon
			width="17.5px"
			icon={$reverse ? "lucide:arrow-down-circle" : "lucide:arrow-up-circle"}
		/>
	</button>
	<button
		on:click={() => document.body.classList.toggle("dark")}
		class="darkmode"
	>
		<Icon
			width="17.5px"
			icon={document.body.classList.contains("dark")
				? "lucide:sun"
				: "lucide:moon"}
		/>
	</button>
	<select bind:value={selected} name="done" id="done">
		{#if !$archived}
			<option selected={true} value="not done">Not done</option>
			<option value="done">Done</option>
		{/if}
		<option value="all">All</option>
	</select>
	<input bind:value={title} placeholder="Title" type="text" class="title" />
	<input
		bind:value={description}
		placeholder="Description"
		type="text"
		class="description"
	/>
	<button on:click={() => add(title, description)} class="add"
		><Icon width="17.5px" icon="lucide:plus" /></button
	>
</nav>

<style lang="scss">
	nav {
		display: flex;
		gap: 0.5em;
		background-color: var(--header-background);
		padding: 10px;
	}

	nav * {
		color: white;
		height: 40px;
		min-width: 40px;
		border-radius: 8px;
		box-sizing: border-box;
		padding: 5px;
	}

	.description {
		flex: 1;
	}

	button {
		
	}

	button,
	input,
	select {
		border: none;
		background-color: var(--button-background);
		color: var(--button-foreground);
		transition: all 0.2s ease-in-out;
	}

	.active {
		color: var(--accent-blue);
	}
</style>
